import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="mb-4">О компании</h3>
            <p className="text-gray-400 mb-4">
              БумагаZ - ваш надежный поставщик канцелярских товаров и офисных принадлежностей.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4">Категории</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Бумага
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Канцтовары
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Офисная техника
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Школьные товары
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4">Информация</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Возврат товара
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Оптовым покупателям
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
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
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>info@bumagaz.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Москва, ул. Примерная, д. 123</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 БумагаZ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
