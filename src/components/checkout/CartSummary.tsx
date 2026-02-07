import { Minus, Plus, Shield, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/hooks/useCart';
import { orderBumps } from '@/data/products';

interface CartSummaryProps {
  items: CartItem[];
  selectedBumps: string[];
  subtotal: number;
  shippingCost: number;
  pixDiscount: number;
  total: number;
  itemCount: number;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveBump: (bumpId: string) => void;
}

export function CartSummary({
  items,
  selectedBumps,
  subtotal,
  shippingCost,
  pixDiscount,
  total,
  itemCount,
  onUpdateQuantity,
  onRemoveBump,
}: CartSummaryProps) {
  const selectedBumpItems = orderBumps.filter((b) => selectedBumps.includes(b.id));

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-20">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Seu carrinho</h2>
        <span className="bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      </div>
      
      {/* Items */}
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground line-clamp-2">
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.productId, -1)}
                    className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.productId, 1)}
                    className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Selected Bumps */}
        {selectedBumpItems.map((bump) => (
          <div key={bump.id} className="flex gap-3 pt-3 border-t border-border">
            <img
              src={bump.image}
              alt={bump.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-medium text-foreground line-clamp-1">
                {bump.name}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => onRemoveBump(bump.id)}
                  className="text-xs text-destructive hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Remover
                </button>
                <span className="text-xs font-semibold text-foreground">
                  R$ {bump.salePrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">
            R$ {subtotal.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete</span>
          <span className="text-success font-medium">
            {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
          </span>
        </div>
        {pixDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Desconto Pix (3%)</span>
            <span className="text-success font-medium">
              -R$ {pixDiscount.toFixed(2).replace('.', ',')}
            </span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-border">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-lg font-bold text-success">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Ambiente seguro</span>
        </div>
      </div>
    </div>
  );
}
