import { useState, useMemo } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { ProductCard } from './components/ProductCard';
import { Cart, CartItem } from './components/Cart';
import { Wishlist, WishlistItem } from './components/Wishlist';
import { MobileMenu } from './components/MobileMenu';
import { Footer } from './components/Footer';
import { Checkout } from './components/Checkout';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  category: string;
}

const categories = [
  {
    title: 'Бумага и бумажная продукция',
    image: `${import.meta.env.BASE_URL}illustrations/paper.svg`,
  },
  {
    title: 'Канцелярские товары',
    image: `${import.meta.env.BASE_URL}illustrations/notebook.svg`,
  },
  {
    title: 'Ручки и карандаши',
    image: `${import.meta.env.BASE_URL}illustrations/pens.svg`,
  },
  {
    title: 'Школьные принадлежности',
    image: `${import.meta.env.BASE_URL}illustrations/school.svg`,
  },
];

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Бумага офисная A4, 80г/м², 500 листов',
    price: 450,
    oldPrice: 550,
    image: `${import.meta.env.BASE_URL}illustrations/paper.svg`,
    inStock: true,
    discount: 18,
    category: 'Бумага и бумажная продукция',
  },
  {
    id: 2,
    name: 'Набор шариковых ручек, синие, 10 шт',
    price: 250,
    image: `${import.meta.env.BASE_URL}illustrations/pens.svg`,
    inStock: true,
    isNew: true,
    category: 'Канцелярские товары',
  },
  {
    id: 3,
    name: 'Блокнот А5, 96 листов, клетка',
    price: 180,
    image: `${import.meta.env.BASE_URL}illustrations/notebook.svg`,
    inStock: true,
    category: 'Канцелярские товары',
  },
  {
    id: 4,
    name: 'Папка-скоросшиватель пластиковая, А4',
    price: 95,
    image: `${import.meta.env.BASE_URL}illustrations/school.svg`,
    inStock: true,
    category: 'Школьные принадлежности',
  },
  {
    id: 5,
    name: 'Маркеры перманентные, набор 4 цвета',
    price: 320,
    oldPrice: 400,
    image: `${import.meta.env.BASE_URL}illustrations/pens.svg`,
    inStock: true,
    discount: 20,
    category: 'Канцелярские товары',
  },
  {
    id: 6,
    name: 'Степлер металлический №24/6',
    price: 590,
    image: `${import.meta.env.BASE_URL}illustrations/notebook.svg`,
    inStock: true,
    isNew: true,
    category: 'Офисная техника',
  },
  {
    id: 7,
    name: 'Корректор ленточный, 5мм х 8м',
    price: 130,
    image: `${import.meta.env.BASE_URL}illustrations/school.svg`,
    inStock: true,
    category: 'Школьные принадлежности',
  },
  {
    id: 8,
    name: 'Набор цветной бумаги А4, 16 листов',
    price: 85,
    image: `${import.meta.env.BASE_URL}illustrations/paper.svg`,
    inStock: true,
    category: 'Бумага и бумажная продукция',
  },
  {
    id: 9,
    name: 'Ножницы офисные 21 см',
    price: 280,
    oldPrice: 350,
    image: `${import.meta.env.BASE_URL}illustrations/notebook.svg`,
    inStock: true,
    discount: 20,
    category: 'Канцелярские товары',
  },
  {
    id: 10,
    name: 'Калькулятор настольный 12 разрядов',
    price: 1200,
    image: `${import.meta.env.BASE_URL}illustrations/school.svg`,
    inStock: true,
    isNew: true,
    category: 'Офисная техника',
  },
  {
    id: 11,
    name: 'Клей-карандаш 15г',
    price: 45,
    image: `${import.meta.env.BASE_URL}illustrations/pens.svg`,
    inStock: true,
    category: 'Школьные принадлежности',
  },
  {
    id: 12,
    name: 'Тетрадь общая 96 листов',
    price: 120,
    oldPrice: 150,
    image: `${import.meta.env.BASE_URL}illustrations/notebook.svg`,
    inStock: true,
    discount: 20,
    category: 'Школьные принадлежности',
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'sales') {
        filtered = filtered.filter(p => p.discount);
      } else {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    let sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  // Get wishlist items
  const wishlistItems: WishlistItem[] = useMemo(() => {
    return wishlistIds
      .map(id => {
        const product = allProducts.find(p => p.id === id);
        if (!product) return null;
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          inStock: product.inStock,
        } as WishlistItem;
      })
      .filter((item): item is WishlistItem => item !== null);
  }, [wishlistIds, allProducts]);

  const handleAddToCart = (productId: number) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        toast.success('Количество товара увеличено');
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success('Товар добавлен в корзину');
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info('Товар удален из корзины');
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        toast.info('Товар удален из избранного');
        return prev.filter(id => id !== productId);
      } else {
        toast.success('Товар добавлен в избранное');
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistIds(prev => prev.filter(wId => wId !== id));
    toast.info('Товар удален из избранного');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSelectedCategory('all');
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    } else {
      toast.error('Корзина пуста');
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCategoryTitle = () => {
    if (selectedCategory === 'all') return 'Все товары';
    if (selectedCategory === 'sales') return 'Специальные предложения';
    return selectedCategory;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <p id="demo-info" className="bg-blue-950 text-blue-50 px-4 py-2 text-center text-sm">
        UI-демо вымышленного магазина · заказы, оплата и доставка не выполняются · контакты не собираются
      </p>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onCategoryClick={handleCategoryClick}
      />

      <main className="flex-1">
        {/* Hero Banner - только на главной */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h2 className="mb-4">Канцелярские товары с доставкой</h2>
                <p className="mb-8 text-blue-100">
                  Широкий ассортимент офисных и школьных принадлежностей по выгодным ценам
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => {
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Смотреть каталог
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Categories - только на главной */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8">Популярные категории</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category) => (
                  <CategoryCard 
                    key={category.title} 
                    {...category} 
                    productCount={allProducts.filter(product => product.category === category.title).length}
                    onClick={() => handleCategoryClick(category.title)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section id="products-section" className="py-12 md:py-16 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="mb-2">{getCategoryTitle()}</h2>
                <p className="text-gray-600">
                  {searchQuery ? `Результаты поиска: "${searchQuery}"` : `Найдено товаров: ${filteredAndSortedProducts.length}`}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Сортировка:</span>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="По умолчанию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">По умолчанию</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">Товары не найдены</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}>
                  Показать все товары
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    isInWishlist={wishlistIds.includes(product.id)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Benefits - только на главной */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2">Быстрая доставка</h3>
                  <p className="text-gray-600">
                    Доставка по Москве в день заказа
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2">Выгодные цены</h3>
                  <p className="text-gray-600">
                    Скидки для постоянных клиентов
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2">Гарантия качества</h3>
                  <p className="text-gray-600">
                    Только проверенные производители
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer onCategoryClick={handleCategoryClick} />

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Wishlist
        items={wishlistItems}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveItem={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onCategoryClick={handleCategoryClick}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
      />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
