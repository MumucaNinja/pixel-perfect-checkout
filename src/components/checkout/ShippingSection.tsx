import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Truck } from 'lucide-react';

function maskCEP(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
  if (!match) return value;
  
  let result = '';
  if (match[1]) result = match[1];
  if (match[2]) result += `-${match[2]}`;
  return result;
}

export function ShippingSection() {
  const [cep, setCep] = useState('');
  const [showOtherPerson, setShowOtherPerson] = useState(false);

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCEP(e.target.value);
    setCep(masked);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">Entrega</h2>
      
      <button
        type="button"
        onClick={() => setShowOtherPerson(!showOtherPerson)}
        className="text-sm text-primary hover:underline"
      >
        Outra pessoa irá receber o pedido? Clique aqui
      </button>

      {showOtherPerson && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="receiverName">Nome do destinatário</Label>
            <Input id="receiverName" placeholder="Nome de quem vai receber" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="receiverPhone">Telefone do destinatário</Label>
            <Input id="receiverPhone" placeholder="(11) 99999-9999" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <div className="flex gap-2">
          <Input
            id="cep"
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={handleCEPChange}
            maxLength={9}
            className="max-w-[180px]"
          />
          <button
            type="button"
            className="text-sm text-primary hover:underline whitespace-nowrap"
          >
            Não sei meu CEP
          </button>
        </div>
      </div>

      {/* CEP Info Box */}
      <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
        <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm text-foreground">
            Preencha seu CEP para encontrar o melhor frete
          </p>
          <p className="text-xs text-muted-foreground">
            Calcularemos as opções de entrega disponíveis para sua região
          </p>
        </div>
      </div>

      {/* Delivery Estimate */}
      <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
        <Truck className="w-5 h-5 text-success" />
        <div>
          <p className="text-sm font-medium text-foreground">Frete Grátis</p>
          <p className="text-xs text-muted-foreground">
            Previsão de entrega: 3-7 dias úteis
          </p>
        </div>
      </div>
    </div>
  );
}
