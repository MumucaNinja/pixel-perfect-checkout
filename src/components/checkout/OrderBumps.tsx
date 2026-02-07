import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { orderBumps, type OrderBump } from '@/data/products';

interface OrderBumpsProps {
  selectedBumps: string[];
  onToggle: (bumpId: string) => void;
}

export function OrderBumps({ selectedBumps, onToggle }: OrderBumpsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">
        Temos {orderBumps.length} ofertas disponíveis para você:
      </h2>
      
      <div className="space-y-3">
        {orderBumps.map((bump) => {
          const isSelected = selectedBumps.includes(bump.id);
          
          return (
            <button
              key={bump.id}
              type="button"
              onClick={() => onToggle(bump.id)}
              className={cn(
                "w-full text-left border-2 border-dashed rounded-lg p-4 transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-primary/40 bg-primary/5 hover:border-primary"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div
                  className={cn(
                    "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                    isSelected
                      ? "bg-primary"
                      : "border-2 border-primary/50"
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                
                {/* Image */}
                <img
                  src={bump.image}
                  alt={bump.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {bump.name}
                      </h3>
                      {bump.tag && (
                        <span className="inline-block mt-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-semibold">
                          {bump.tag}
                        </span>
                      )}
                    </div>
                    
                    {/* Prices */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground line-through">
                        R$ {bump.originalPrice.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        R$ {bump.salePrice.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {bump.description}
                  </p>
                  
                  <div className="mt-2">
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isSelected ? "text-success" : "text-primary"
                      )}
                    >
                      {isSelected ? "✓ ADICIONADO" : "PEGAR OFERTA"}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
