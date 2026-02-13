import { Check, Zap } from 'lucide-react';

interface PaymentSectionProps {
  pixDiscount: number;
}

export function PaymentSection({ pixDiscount }: PaymentSectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4 w-full">
      <h2 className="text-base sm:text-lg font-semibold text-foreground">Pagamento</h2>
      
      {/* PIX Selected Card */}
      <div className="border-2 border-success rounded-lg p-3 sm:p-4 bg-success/5 relative w-full transition-all">
        {/* Badge */}
        <div className="absolute -top-2.5 left-3 sm:left-4 bg-success text-success-foreground text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-sm">
          3% OFF
        </div>
        
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success-foreground" />
          </div>
          
          <div className="flex-1 space-y-1.5 sm:space-y-2">
            {/* Título e Tag de Aprovação - Com flex-wrap para telas muito pequenas */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-semibold text-foreground text-sm sm:text-base">PIX</span>
              <span className="text-[10px] sm:text-xs bg-success/20 text-success px-1.5 sm:px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                APROVAÇÃO IMEDIATA
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-success font-medium leading-snug">
              Garanta R$ {pixDiscount.toFixed(2).replace('.', ',')} de desconto pagando via Pix
            </p>
            
            {/* Lista de Vantagens */}
            <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-muted-foreground mt-2">
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">•</span>
                <span className="leading-tight">O código PIX tem validade de 30 minutos</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">•</span>
                <span className="leading-tight">O pagamento é confirmado em segundos</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-success mt-0.5">•</span>
                <span className="leading-tight">Use o app do seu banco para pagar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}