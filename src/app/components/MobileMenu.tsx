import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryClick: (category: string) => void;
}

export function MobileMenu({ isOpen, onClose, onCategoryClick }: MobileMenuProps) {
  const categories = [
    { label: 'Все категории', value: 'all' },
    { label: 'Бумага', value: 'Бумага и бумажная продукция' },
    { label: 'Канцтовары', value: 'Канцелярские товары' },
    { label: 'Офисная техника', value: 'Офисная техника' },
    { label: 'Школьные товары', value: 'Школьные принадлежности' },
    { label: 'Акции', value: 'sales' },
  ];

  const handleCategoryClick = (category: string) => {
    onCategoryClick(category);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Меню</SheetTitle>
          <SheetDescription>
            Навигация по категориям и разделам сайта
          </SheetDescription>
        </SheetHeader>

        <nav className="mt-6">
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category.value}>
                <button
                  className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleCategoryClick(category.value)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 pt-8 border-t space-y-4">
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Доставка
          </button>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Оплата
          </button>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Контакты
          </button>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded transition-colors">
            Личный кабинет
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}