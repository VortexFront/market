import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createDemoCustomer } from '../src/app/demoCheckout.ts';

test('generated customer is explicitly synthetic and has a non-deliverable email',()=>{
  const first=createDemoCustomer('A1b2-C3d4');
  assert.equal(first.reference,'DEMO-a1b2c3d4');
  assert.match(first.name,/^Тестовый покупатель /);
  assert.equal(first.email,'demo-a1b2c3d4@example.invalid');
  assert.match(first.address,/вымышленный адрес/);
  assert.notDeepEqual(first,createDemoCustomer('different-reference'));
});
test('checkout cannot collect contacts, send an order or claim success',()=>{
  const checkout=readFileSync(new URL('../src/app/components/Checkout.tsx',import.meta.url),'utf8');
  const app=readFileSync(new URL('../src/app/App.tsx',import.meta.url),'utf8');
  assert.doesNotMatch(checkout,/<(?:input|textarea|form)\b|\bfetch\(|XMLHttpRequest|console\./i);
  assert.doesNotMatch(app,/console\.|Заказ успешно оформлен|Мы свяжемся с вами/);
  assert.match(checkout,/Это не подтверждение заказа/);
  assert.match(checkout,/Ничего не отправлено/);
});
