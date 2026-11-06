import {test,expect}from'@playwright/test';
test.beforeEach(async({page,baseURL})=>{
  const origin=new URL(baseURL).origin;const external=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{const url=new URL(route.request().url());if(url.origin===origin||['data:','blob:'].includes(url.protocol))return route.continue();external.push(url.origin);return route.abort();});
  page.__marketBoundary={external,errors};
  await page.goto('./');await expect(page).toHaveTitle('БумагаZ · UI-демо магазина');
});
test.afterEach(async({page},info)=>{
  await info.attach('network-and-errors',{body:JSON.stringify(page.__marketBoundary),contentType:'application/json'});
  expect(page.__marketBoundary.external).toEqual([]);expect(page.__marketBoundary.errors).toEqual([]);
});
test('catalogue search/category/sort and local images retain their behavior',async({page},info)=>{
  await expect(page.getByRole('article')).toHaveCount(12);
  await page.getByRole('button',{name:'Бумага',exact:true}).first().click();await expect(page.getByRole('article')).toHaveCount(2);
  await page.getByRole('button',{name:'Все категории',exact:true}).click();
  const search=page.getByRole('searchbox',{name:'Поиск товаров'}).filter({visible:true});await search.fill('калькулятор');await search.press('Enter');
  await expect(page.getByRole('article')).toHaveCount(1);await expect(page.getByRole('article')).toContainText('Калькулятор');
  await search.fill('ничего-не-найдётся');await expect(page.getByText('Товары не найдены',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Показать все товары'}).click();
  await page.getByRole('combobox').click();await page.getByRole('option',{name:'Цена: по возрастанию'}).click();
  await expect(page.getByRole('article').first()).toContainText('Клей-карандаш');
  await page.getByRole('combobox').click();await page.getByRole('option',{name:'По умолчанию'}).click();
  await page.evaluate(()=>window.scrollTo(0,0));
  await expect(page.locator('img')).toHaveCount(16);
  await expect.poll(()=>page.locator('img').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0))).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath('catalogue-desktop.png'),animations:'disabled'});
});
test('wishlist, quantity, removal and documented memory-only cart work',async({page})=>{
  const card=page.getByRole('article').first();await card.getByRole('button',{name:/В избранное:/}).click();
  await page.getByRole('button',{name:'Избранное',exact:true}).click();const wish=page.getByRole('dialog');
  await expect(wish).toContainText('Бумага офисная');await wish.getByRole('button',{name:'В корзину',exact:true}).click();
  await page.keyboard.press('Escape');await page.getByRole('button',{name:'Корзина',exact:true}).click();const cart=page.getByRole('dialog');
  await cart.getByRole('button',{name:/Увеличить количество:/}).click();await expect(cart).toContainText('900 ₽');
  await cart.getByRole('button',{name:/Уменьшить количество:/}).click();await expect(cart).toContainText('450 ₽');
  await cart.getByRole('button',{name:/Удалить из корзины:/}).click();await expect(cart).toContainText('Корзина пуста');
  await page.keyboard.press('Escape');await card.getByRole('button',{name:'В корзину',exact:true}).click();
  await page.reload();await page.getByRole('button',{name:'Корзина',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('Корзина пуста');
});
test('mobile checkout has no contact fields, requests or false order success and resets on reopen',async({page},info)=>{
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Открыть меню'}).click();
  await page.getByRole('dialog',{name:'Меню'}).getByRole('button',{name:'Школьные товары',exact:true}).click();
  await expect(page.getByRole('article')).toHaveCount(4);
  await page.getByRole('button',{name:'БумагаZ',exact:true}).click();await expect(page.getByRole('article')).toHaveCount(12);
  const logs=[],mutations=[];page.on('console',message=>logs.push(message.text()));page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))mutations.push(r.method());});
  await page.getByRole('article').first().getByRole('button',{name:'В корзину',exact:true}).click();
  await page.getByRole('button',{name:'Корзина',exact:true}).click();await page.getByRole('button',{name:'Посмотреть демо-оформление'}).click();
  let dialog=page.getByRole('dialog',{name:'Демонстрация оформления'});
  await expect(dialog).toBeVisible();await expect(dialog.locator('input,textarea,form')).toHaveCount(0);
  await expect(dialog).toContainText('@example.invalid');const firstEmail=await dialog.locator('dd').nth(1).innerText();
  await dialog.getByRole('button',{name:'Показать демо-сводку'}).click();await expect(dialog.getByRole('status')).toContainText('Ничего не отправлено');
  await expect(dialog.getByRole('status')).toContainText('Это не подтверждение заказа');
  expect(mutations).toEqual([]);expect(logs.some(log=>log.includes('@example.invalid')||log.includes('Order submitted')||log.includes('Cart items'))).toBe(false);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const name of ['Показать демо-сводку','Вернуться в магазин']){
    const bounds=await dialog.getByRole('button',{name,exact:true}).boundingBox();
    expect(bounds.height).toBeGreaterThanOrEqual(44);expect(bounds.y+bounds.height).toBeLessThanOrEqual(844);
  }
  const body=dialog.getByLabel('Прокручиваемая демо-сводка');
  await body.evaluate(node=>{node.scrollTop=node.scrollHeight;});await expect(dialog.getByRole('status')).toBeInViewport();
  await page.getByText('Товар добавлен в корзину',{exact:true}).waitFor({state:'hidden'});
  await page.screenshot({path:info.outputPath('checkout-mobile.png'),animations:'disabled'});
  await page.keyboard.press('Escape');await page.getByRole('button',{name:'Корзина',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('450 ₽');
  await page.getByRole('button',{name:'Посмотреть демо-оформление'}).click();dialog=page.getByRole('dialog',{name:'Демонстрация оформления'});
  await expect(dialog.getByRole('status')).toHaveCount(0);await expect.poll(()=>dialog.locator('dd').nth(1).innerText()).not.toBe(firstEmail);
  await dialog.getByRole('button',{name:'Вернуться в магазин'}).focus();await page.keyboard.press('Tab');expect(await dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');await page.setViewportSize({width:390,height:600});
  for(const card of (await page.getByRole('article').all()).slice(1,6))await card.getByRole('button',{name:'В корзину',exact:true}).click();
  await page.getByRole('button',{name:'Корзина',exact:true}).click();await page.getByRole('button',{name:'Посмотреть демо-оформление'}).click();
  dialog=page.getByRole('dialog',{name:'Демонстрация оформления'});
  const longBody=dialog.getByLabel('Прокручиваемая демо-сводка');expect(await longBody.evaluate(node=>node.scrollHeight>node.clientHeight)).toBe(true);
  const dimensions=[];
  for(const name of ['Показать демо-сводку','Вернуться в магазин']){
    const bounds=await dialog.getByRole('button',{name,exact:true}).boundingBox();dimensions.push({name,...bounds});
    expect(bounds.height).toBeGreaterThanOrEqual(44);expect(bounds.y+bounds.height).toBeLessThanOrEqual(600);
  }
  await dialog.getByRole('button',{name:'Показать демо-сводку'}).click();await longBody.evaluate(node=>{node.scrollTop=node.scrollHeight;});
  await expect(dialog.getByRole('status')).toBeInViewport();
  await info.attach('long-cart-button-dimensions',{body:JSON.stringify(dimensions),contentType:'application/json'});
  await dialog.getByRole('button',{name:'Вернуться в магазин'}).click();await expect(dialog).not.toBeVisible();
});
