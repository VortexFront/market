import { X, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
}

interface WishlistProps {
  items: WishlistItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onAddToCart: (id: number) => void;
}

export function Wishlist({ items, isOpen, onClose, onRemoveItem, onAddToCart }: WishlistProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Избранное</SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? 'Добавьте товары в избранное, чтобы не потерять их'
              : `Товаров в избранном: ${items.length}`
            }
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Список избранного пуст</p>
              <Button onClick={onClose}>Продолжить покупки</Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border rounded-lg p-4 bg-white">
                <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-50">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <h4 className="mb-2 line-clamp-2">{item.name}</h4>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-blue-600">{item.price} ₽</span>
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">{item.oldPrice} ₽</span>
                    )}
                  </div>

                  <div className="mt-auto flex gap-2">
                    {item.inStock ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          onAddToCart(item.id);
                          onRemoveItem(item.id);
                        }}
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        В корзину
                      </Button>
                    ) : (
                      <Button disabled size="sm" className="flex-1">
                        Нет в наличии
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
