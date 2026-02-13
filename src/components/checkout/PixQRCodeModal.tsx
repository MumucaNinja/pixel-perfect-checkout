import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PixQRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrcode: string;
  qrCodeImageUrl: string;
  idTransaction: string;
  total: number;
}

export function PixQRCodeModal({
  open,
  onOpenChange,
  qrcode,
  qrCodeImageUrl,
  idTransaction,
  total,
}: PixQRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrcode);
      setCopied(true);
      toast.success('Código PIX copiado!');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Erro ao copiar o código');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Pagamento PIX</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-2xl font-bold text-success">
            R$ {total.toFixed(2).replace('.', ',')}
          </p>

          {qrCodeImageUrl && (
            <div className="bg-white p-4 rounded-lg border">
              <img
                src={qrCodeImageUrl}
                alt="QR Code PIX"
                className="w-48 h-48 object-contain"
              />
            </div>
          )}

          <p className="text-sm text-muted-foreground text-center">
            Escaneie o QR Code ou copie o código abaixo
          </p>

          <div className="w-full">
            <div className="bg-muted rounded-lg p-3 text-xs break-all font-mono max-h-24 overflow-y-auto">
              {qrcode}
            </div>
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full mt-2 gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar código PIX'}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            ID da transação: {idTransaction}
          </p>

          <div className="text-xs text-muted-foreground space-y-1 text-center">
            <p>⏰ O código PIX expira em 30 minutos</p>
            <p>✅ O pagamento é confirmado automaticamente</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
