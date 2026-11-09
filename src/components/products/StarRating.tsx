import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  showValue?: boolean;
}

const StarRating = ({
  rating,
  showValue = true,
}: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={13}
            strokeWidth={1.5}
            className={
              index < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>

      {showValue && (
        <span className="text-xs text-gray-500">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default StarRating;