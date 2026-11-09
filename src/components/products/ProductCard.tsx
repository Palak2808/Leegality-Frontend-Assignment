import { Link, useLocation } from "react-router-dom";
import type { Product } from "../../types/product";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const location = useLocation();

  const image = product.thumbnail || product.images?.[0];

  return (
    <Link
      to={`/product/${product.id}${location.search}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-3 transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex h-[165px] items-center justify-center overflow-hidden rounded-md bg-white p-2">
        <img
          src={image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-gray-800">
          {product.title}
        </h3>

        <p className="mt-1 text-base font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-2">
          <StarRating rating={product.rating} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;