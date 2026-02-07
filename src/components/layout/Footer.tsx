import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Ambiente seguro</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Formas de pagamento:</span>
            <div className="flex items-center gap-2">
              <div className="bg-success/10 text-success px-2 py-1 rounded text-xs font-semibold">
                PIX
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2026 TikTok Shop. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
