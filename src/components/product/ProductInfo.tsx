import { Star, Truck, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProductInfoProps {
  name: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  deliveryEstimate: string;
}

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatNumber(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.0', '')} mil`;
  }
  return value.toString();
}

export function ProductInfo({
  name,
  originalPrice,
  salePrice,
  discountPercentage,
  rating,
  reviewCount,
  soldCount,
  deliveryEstimate,
}: ProductInfoProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          return { hours: 2, minutes: 45, seconds: 30 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Flash Sale Badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded">
          <Zap className="w-4 h-4 fill-primary" />
          <span className="text-xs font-semibold">Oferta Relâmpago</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Termina em</span>
          <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(salePrice)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(originalPrice)}
          </span>
        </div>
      </div>

      {/* Product Name */}
      <h1 className="text-lg font-semibold text-foreground leading-snug">
        {name}
      </h1>

      {/* Rating & Sales */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-foreground">{rating}</span>
          <span className="text-muted-foreground">({formatNumber(reviewCount)})</span>
        </div>
        <div className="text-muted-foreground">
          {formatNumber(soldCount)} vendidos
        </div>
      </div>

      {/* Delivery Estimate */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Truck className="w-4 h-4" />
        <span>{deliveryEstimate}</span>
      </div>
    </div>
  );
}
