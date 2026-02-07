import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentSectionProps {
  pixDiscount: number;
}

export function PaymentSection({ pixDiscount }: PaymentSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">Pagamento</h2>
      
      {/* PIX Selected Card */}
      <div className="border-2 border-success rounded-lg p-4 bg-success/5 relative">
        {/* Badge */}
        <div className="absolute -top-2.5 left-4 bg-success text-success-foreground text-xs font-bold px-2 py-0.5 rounded">
          3% OFF
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-success-foreground" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">PIX</span>
              <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                APROVAÇÃO IMEDIATA
              </span>
            </div>
            
            <p className="text-sm text-success font-medium">
              Garanta R$ {pixDiscount.toFixed(2).replace('.', ',')} de desconto pagando via Pix
            </p>
            
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-success mt-1">•</span>
                O código PIX tem validade de 30 minutos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-1">•</span>
                O pagamento é confirmado em segundos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-1">•</span>
                Use o app do seu banco para pagar
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Other Payment Methods (disabled/dimmed) */}
      <div className="space-y-2 opacity-50">
        <div className="border border-border rounded-lg p-4 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Cartão de Crédito</span>
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-4 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Boleto Bancário</span>
          </div>
        </div>
      </div>
    </div>
  );
}
