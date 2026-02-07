import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/products';

interface ProductDescriptionProps {
  specifications: Product['specifications'];
}

export function ProductDescription({ specifications }: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">
        Descrição do Produto
      </h2>
      
      <div className={`space-y-4 ${!isExpanded && 'max-h-40 overflow-hidden relative'}`}>
        {specifications.map((spec, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">{spec.title}</h3>
            <ul className="space-y-1">
              {spec.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full gap-1 text-sm text-primary hover:underline py-2"
      >
        {isExpanded ? (
          <>
            Ver menos <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Ver mais <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
