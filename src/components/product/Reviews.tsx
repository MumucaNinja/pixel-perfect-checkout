import { Star, ChevronRight } from 'lucide-react';
import type { Review } from '@/data/products';

interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function Reviews({ reviews, averageRating, totalReviews }: ReviewsProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-foreground">Avaliações</h2>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{averageRating}</span>
            <span className="text-sm text-muted-foreground">
              ({totalReviews.toLocaleString('pt-BR')})
            </span>
          </div>
        </div>
        <button className="flex items-center text-sm text-primary hover:underline">
          Ver todas
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card rounded-lg p-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {review.userName}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>

            {/* Variant */}
            {review.variant && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {review.variant}
              </span>
            )}

            {/* Comment */}
            <p className="text-sm text-foreground leading-relaxed">
              {review.comment}
            </p>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Foto da avaliação ${index + 1}`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
