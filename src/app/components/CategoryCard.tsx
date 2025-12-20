import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  title: string;
  image: string;
  productCount: number;
  onClick: () => void;
}

export function CategoryCard({ title, image, productCount, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border bg-white hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1">{title}</h3>
        <p className="text-gray-500">{productCount} товаров</p>
      </div>
    </button>
  );
}