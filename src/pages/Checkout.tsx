import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IdentificationForm } from '@/components/checkout/IdentificationForm';
import { ShippingSection } from '@/components/checkout/ShippingSection';
import { PaymentSection } from '@/components/checkout/PaymentSection';
import { OrderBumps } from '@/components/checkout/OrderBumps';
import { CartSummary } from '@/components/checkout/CartSummary';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useState } from 'react'; // Import necessário para o toggle mobile
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'; // Ícones para UX

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

  // Estado para controlar se o resumo está aberto no mobile
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pedido realizado com sucesso!', {
      description: 'Você será redirecionado para o pagamento PIX.',
    });
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
                <IdentificationForm />
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
                  className="w-full h-14 text-lg font-bold mt-4 bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white shadow-lg"
                >
                  FINALIZAR COMPRA
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
              className="w-full h-14 text-lg font-bold bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white shadow-lg"
            >
              FINALIZAR COMPRA - R$ {total.toFixed(2)}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}