import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IdentificationForm, type IdentificationFormData } from '@/components/checkout/IdentificationForm';
import { ShippingSection } from '@/components/checkout/ShippingSection';
import { PaymentSection } from '@/components/checkout/PaymentSection';
import { OrderBumps } from '@/components/checkout/OrderBumps';
import { CartSummary } from '@/components/checkout/CartSummary';
import { PixQRCodeModal } from '@/components/checkout/PixQRCodeModal';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Checkout() {
  const {
    cart,
    updateQuantity,
    toggleBump,
    subtotal,
    shippingCost,
    pixDiscount,
    total,
    itemCount,
  } = useCart();

  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixModal, setPixModal] = useState<{
    open: boolean;
    qrcode: string;
    qrCodeImageUrl: string;
    idTransaction: string;
  }>({ open: false, qrcode: '', qrCodeImageUrl: '', idTransaction: '' });

  const formDataRef = useRef<IdentificationFormData | null>(null);

  const handleFormValidChange = (isValid: boolean, data: IdentificationFormData | null) => {
    formDataRef.current = data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = formDataRef.current;

    if (!formData || !formData.name || !formData.cpf || !formData.phone) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: {
          amount: total,
          debtor_name: formData.name,
          email: formData.email || '',
          debtor_document_number: formData.cpf,
          phone: formData.phone,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setPixModal({
        open: true,
        qrcode: data.qrcode,
        qrCodeImageUrl: data.qr_code_image_url,
        idTransaction: data.idTransaction,
      });
    } catch (err: any) {
      toast.error('Erro ao gerar pagamento PIX', {
        description: err.message || 'Tente novamente',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0"> {/* Padding bottom extra no mobile */}
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          
          {/* ⚡ CORREÇÃO: Resumo Mobile (Accordion Style) */}
          <div className="lg:hidden mb-6 bg-card rounded-lg border shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
              className="w-full p-4 flex items-center justify-between bg-muted/50"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShoppingBag className="w-4 h-4" />
                {isMobileSummaryOpen ? 'Ocultar resumo do pedido' : 'Mostrar resumo do pedido'}
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileSummaryOpen ? 'rotate-180' : ''}`} />
              </div>
              <span className="font-bold text-primary">R$ {total.toFixed(2)}</span>
            </button>

            {/* O conteúdo do carrinho só aparece se o estado for true */}
            {isMobileSummaryOpen && (
              <div className="p-4 border-t">
                 <CartSummary
                  items={cart.items}
                  selectedBumps={cart.selectedBumps}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  pixDiscount={pixDiscount}
                  total={total}
                  itemCount={itemCount}
                  onUpdateQuantity={updateQuantity}
                  onRemoveBump={toggleBump}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Identification */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <IdentificationForm onValidChange={handleFormValidChange} />
              </div>

              {/* Shipping */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <ShippingSection />
              </div>

              {/* Payment */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <PaymentSection pixDiscount={pixDiscount} />
              </div>

              {/* Order Bumps */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <OrderBumps
                  selectedBumps={cart.selectedBumps}
                  onToggle={toggleBump}
                />
              </div>
            </div>

            {/* Right Column - Cart Summary (Desktop Only) */}
            {/* Mantivemos o 'hidden lg:block' aqui para não duplicar na tela grande */}
            <div className="hidden lg:block space-y-4">
              <div className="sticky top-4">
                <CartSummary
                  items={cart.items}
                  selectedBumps={cart.selectedBumps}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  pixDiscount={pixDiscount}
                  total={total}
                  itemCount={itemCount}
                  onUpdateQuantity={updateQuantity}
                  onRemoveBump={toggleBump}
                />
                
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 text-lg font-bold mt-4 bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white shadow-lg"
                >
                  {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> PROCESSANDO...</> : 'FINALIZAR COMPRA'}
                </Button>
                
                <div className="text-center mt-4 text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  Ambiente Seguro
                </div>
              </div>
            </div>
          </div>

          {/* ⚡ CORREÇÃO: Botão Flutuante (Sticky) Mobile */}
          {/* Isso garante que o botão de compra esteja sempre visível no celular */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t lg:hidden z-50">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 text-lg font-bold bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white shadow-lg"
            >
              {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> PROCESSANDO...</> : `FINALIZAR COMPRA - R$ ${total.toFixed(2)}`}
            </Button>
          </div>

          <PixQRCodeModal
            open={pixModal.open}
            onOpenChange={(open) => setPixModal((prev) => ({ ...prev, open }))}
            qrcode={pixModal.qrcode}
            qrCodeImageUrl={pixModal.qrCodeImageUrl}
            idTransaction={pixModal.idTransaction}
            total={total}
          />
        </form>
      </main>

      <Footer />
    </div>
  );
}