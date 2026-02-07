import { MessageCircle, Store, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProductFooterProps {
  onAddToCart?: () => void;
}

export function ProductFooter({ onAddToCart }: ProductFooterProps) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
      <div className="container mx-auto flex items-center gap-3">
        {/* Action Icons */}
        <div className="flex gap-4">
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
            <Store className="w-5 h-5" />
            <span className="text-[10px]">Loja</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px]">Chat</span>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex-1 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 h-12 border-primary text-primary hover:bg-primary/5"
            onClick={onAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho
          </Button>
          <Button
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={handleBuyNow}
          >
            Comprar agora
          </Button>
        </div>
      </div>
    </div>
  );
}
