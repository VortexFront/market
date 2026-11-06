import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer({onCategoryClick}: {onCategoryClick: (category: string) => void}) {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="mb-4">О демо</h3>
            <p className="text-gray-400 mb-4">
              БумагаZ — вымышленный магазин для демонстрации интерфейса. Заказы и платежи не принимаются.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4">Категории</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => onCategoryClick('Бумага и бумажная продукция')} className="hover:text-white transition-colors">
                  Бумага
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Канцелярские товары')} className="hover:text-white transition-colors">
                  Канцтовары
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Офисная техника')} className="hover:text-white transition-colors">
                  Офисная техника
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Школьные принадлежности')} className="hover:text-white transition-colors">
                  Школьные товары
                </button>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4">Информация</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#demo-info" className="hover:text-white transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#demo-info" className="hover:text-white transition-colors">
                  Возврат товара
                </a>
              </li>
              <li>
                <a href="#demo-info" className="hover:text-white transition-colors">
                  Оптовым покупателям
                </a>
              </li>
              <li>
                <a href="#demo-info" className="hover:text-white transition-colors">
                  Акции
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-4">Контакты</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Телефон не используется в демо</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>demo@example.invalid · вымышленный email</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Демо-город · вымышленный адрес</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Максим Асатуров · Демонстрационный проект</p>
        </div>
      </div>
    </footer>
  );
}
