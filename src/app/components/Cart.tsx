import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? 'Добавьте товары в корзину для оформления заказа'
              : `Всего товаров в корзине: ${items.length}`
            }
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Корзина пуста</p>
              <Button onClick={onClose}>Продолжить покупки</Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-50">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="mb-2 line-clamp-2">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-blue-600">{item.price * item.quantity} ₽</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart footer */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span>Итого:</span>
                <span className="text-2xl text-blue-600">{total} ₽</span>
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Оформить заказ
              </Button>

              <Button variant="outline" className="w-full" onClick={onClose}>
                Продолжить покупки
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}