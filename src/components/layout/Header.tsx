import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showCart?: boolean;
  cartCount?: number;
}

export function Header({ showCart = false, cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0727 39.7913C15.2009 39.7913 12.0897 36.5913 12.0897 32.6956C12.0897 28.8869 15.1145 25.7739 18.8128 25.6C18.8128 25.6 18.8999 25.6 18.9436 25.6V17.3913C10.6369 17.5652 4 24.3478 4 32.6956C4 41.1304 10.8128 48 19.1599 48C27.507 48 34.3198 41.0434 34.3198 32.6956V15.6521C37.3446 17.913 41.1292 19.3043 45.2618 19.3913V11.1826C38.9706 10.9217 34.1451 6.06956 34.1451 0Z"
                fill="hsl(var(--primary))"
              />
            </svg>
            <span className="ml-1 text-lg font-bold text-foreground">
              TikTok <span className="text-primary">Shop</span>
            </span>
          </div>
        </Link>

        {showCart && (
          <Link to="/checkout" className="relative p-2">
            <ShoppingBag className="w-6 h-6 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
