import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { CartItem } from './Cart';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSubmit: (orderData: OrderData) => void;
}

export interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}

export function Checkout({ isOpen, onClose, items, total, onSubmit }: CheckoutProps) {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      comment: '',
    });
  };

  const handleChange = (field: keyof OrderData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
          <DialogDescription>
            Заполните форму для оформления заказа. Все поля обязательны.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="mb-3">Ваш заказ</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span>Итого:</span>
              <span className="text-xl text-blue-600">{total} ₽</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3>Контактные данные</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Иван Иванов"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3>Доставка</h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">Адрес доставки *</Label>
              <Textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Город, улица, дом, квартира"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                placeholder="Дополнительная информация для курьера"
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1" size="lg">
              Оформить заказ на {total} ₽
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
