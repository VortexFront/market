import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  isInWishlist?: boolean;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  inStock,
  isNew,
  discount,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-green-500 hover:bg-green-600">Новинка</Badge>
        )}
        {discount && (
          <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
        )}
      </div>

      {/* Wishlist button */}
      <button
        className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all ${
          isInWishlist ? 'bg-red-500 opacity-100' : 'bg-white hover:bg-gray-100'
        }`}
        onClick={() => onToggleWishlist(id)}
      >
        <Heart
          className={`w-5 h-5 ${
            isInWishlist ? 'text-white fill-white' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem]">{name}</h3>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-blue-600">{price} ₽</span>
            {oldPrice && (
              <span className="text-gray-400 line-through">{oldPrice} ₽</span>
            )}
          </div>

          {/* Add to cart button */}
          {inStock ? (
            <Button
              onClick={() => onAddToCart(id)}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              В корзину
            </Button>
          ) : (
            <Button disabled className="w-full" size="sm">
              Нет в наличии
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}