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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pedido realizado com sucesso!', {
      description: 'Você será redirecionado para o pagamento PIX.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Identification */}
              <div className="bg-card rounded-lg p-6">
                <IdentificationForm />
              </div>

              <Separator />

              {/* Shipping */}
              <div className="bg-card rounded-lg p-6">
                <ShippingSection />
              </div>

              <Separator />

              {/* Payment */}
              <div className="bg-card rounded-lg p-6">
                <PaymentSection pixDiscount={pixDiscount} />
              </div>

              <Separator />

              {/* Order Bumps */}
              <div className="bg-card rounded-lg p-6">
                <OrderBumps
                  selectedBumps={cart.selectedBumps}
                  onToggle={toggleBump}
                />
              </div>

              {/* CTA Button - Mobile */}
              <div className="lg:hidden">
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  FINALIZAR COMPRA
                </Button>
              </div>
            </div>

            {/* Right Column - Cart Summary */}
            <div className="hidden lg:block">
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
              
              {/* CTA Button - Desktop */}
              <Button
                type="submit"
                className="w-full h-14 text-base font-bold mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                FINALIZAR COMPRA
              </Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
