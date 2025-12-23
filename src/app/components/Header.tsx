import { Search, ShoppingCart, Phone, User, Menu, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onMenuClick: () => void;
  onCategoryClick: (category: string) => void;
}

export function Header({ 
  cartCount, 
  wishlistCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onCartClick, 
  onWishlistClick,
  onMenuClick,
  onCategoryClick,
}: HeaderProps) {
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
   
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => onCategoryClick('all')}>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
                БумагаZ
              </h1>
            </button>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Поиск товаров..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              <Button 
                size="icon" 
                className="absolute right-0 top-0 h-full"
                variant="ghost"
                onClick={onSearchSubmit}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onWishlistClick}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Поиск товаров..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <Button 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              variant="ghost"
              onClick={onSearchSubmit}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3">
            <li>
              <button 
                className="hover:text-blue-600 transition-colors"
                onClick={() => onCategoryClick('all')}
              >
                Все категории
              </button>
            </li>
            <li>
              <button 
                className="hover:text-blue-600 transition-colors"
                onClick={() => onCategoryClick('Бумага и бумажная продукция')}
              >
                Бумага
              </button>
            </li>
            <li>
              <button 
                className="hover:text-blue-600 transition-colors"
                onClick={() => onCategoryClick('Канцелярские товары')}
              >
                Канцтовары
              </button>
            </li>
            <li>
              <button 
                className="hover:text-blue-600 transition-colors"
                onClick={() => onCategoryClick('Офисная техника')}
              >
                Офисная техника
              </button>
            </li>
            <li>
              <button 
                className="hover:text-blue-600 transition-colors"
                onClick={() => onCategoryClick('Школьные принадлежности')}
              >
                Школьные товары
              </button>
            </li>
            <li>
              <button 
                className="hover:text-blue-600 transition-colors text-red-600"
                onClick={() => onCategoryClick('sales')}
              >
                Акции
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}