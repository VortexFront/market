import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import type { CartItem } from './Cart';
import { createDemoCustomer } from '../demoCheckout';

interface CheckoutProps { isOpen: boolean; onClose: () => void; items: CartItem[]; total: number; }

export function Checkout({ isOpen, onClose, items, total }: CheckoutProps) {
  const [customer, setCustomer] = useState(() => createDemoCustomer('preview'));
  const [showSummary, setShowSummary] = useState(false);
  useEffect(() => {
    if (isOpen) { setCustomer(createDemoCustomer(crypto.randomUUID())); setShowSummary(false); }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>Демонстрация оформления</DialogTitle>
          <DialogDescription>
            Это UI-демо. Заказ не создаётся и никуда не отправляется. Контакты вводить не нужно:
            ниже автоматически сгенерированы вымышленные данные. Оплаты и доставки нет.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto space-y-6 pr-1" aria-label="Прокручиваемая демо-сводка" tabIndex={0}>
        <section className="border rounded-lg p-4 bg-gray-50" aria-label="Состав демо-покупки">
          <h3 className="mb-3">Демо-корзина</h3>
          <ul className="space-y-2 mb-4">
            {items.map(item => <li key={item.id} className="flex justify-between gap-4 text-sm">
              <span className="text-gray-600">{item.name} × {item.quantity}</span>
              <span className="shrink-0">{item.price * item.quantity} ₽</span>
            </li>)}
          </ul>
          <div className="border-t pt-3 flex justify-between"><span>Итого:</span><strong className="text-xl text-blue-600">{total} ₽</strong></div>
        </section>
        <section aria-labelledby="synthetic-customer-title" className="space-y-3">
          <h3 id="synthetic-customer-title">Сгенерированный пример</h3>
          <dl className="grid gap-2 text-sm break-words">
            <div><dt className="text-gray-500">Тестовое имя</dt><dd>{customer.name}</dd></div>
            <div><dt className="text-gray-500">Тестовый email</dt><dd>{customer.email}</dd></div>
            <div><dt className="text-gray-500">Тестовый адрес</dt><dd>{customer.address}</dd></div>
          </dl>
        </section>
        {showSummary && <p role="status" className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-blue-900">
          Демо-сводка {customer.reference}: {items.reduce((sum, item) => sum + item.quantity, 0)} шт. на {total} ₽.
          Ничего не отправлено. Это не подтверждение заказа. Корзина сохранена до перезагрузки страницы.
        </p>}
        </div>
        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <Button type="button" className="w-full min-h-11 shrink-0 sm:flex-1" size="lg" disabled={!items.length} onClick={() => setShowSummary(true)}>Показать демо-сводку</Button>
          <Button type="button" className="min-h-11 shrink-0" variant="outline" onClick={onClose}>Вернуться в магазин</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
