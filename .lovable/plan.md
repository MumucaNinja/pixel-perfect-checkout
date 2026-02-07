

# Clone TikTok Shop - Página de Produto e Checkout

Vou criar um clone pixel-perfect das duas telas do TikTok Shop com foco em conversão, usando React, Tailwind e Shadcn UI.

---

## 🎨 Design e Identidade Visual

**Paleta de cores:**
- Fundo geral: `#f8f9fc` (cinza azulado claro)
- Cor de ação (Brand): `#fe2c55` (rosa TikTok)
- Cor de sucesso: `#25bb88` (verde PIX/desconto)
- Fonte: Inter (sans-serif limpa)

---

## 📄 Página 1: Produto (Capacete LS2)

**Header:**
- Logo TikTok Shop

**Galeria de Imagens:**
- Carrossel principal com foto do capacete
- Thumbnails das variações de cor
- Indicador de posição (1/6)

**Informações do Produto:**
- Badge de desconto (-72%)
- Preço promocional: R$ 69,90 / Preço original riscado: R$ 249,90
- Tag "Oferta Relâmpago" com timer
- Avaliação: 4.9 ★ (2,8 mil) + 6,5k vendidos
- Estimativa de entrega com ícone

**Seleção de Modelo e Tamanho:**
- Thumbnails dos modelos de cor
- Botões de tamanho (54, 56, 58, 60, 62)

**Seção de Avaliações:**
- Nota média com estrelas
- Cards de avaliações com foto do usuário, data, imagens e texto
- Link "Ver mais"

**Descrição do Produto:**
- Especificações técnicas detalhadas
- Características (EPS, ventilação, viseira)

**Footer Fixo:**
- Botões "Comprar com cupom" e "Adicionar ao carrinho"
- Ícones de chat e loja

---

## 📄 Página 2: Checkout (Foco Conversão)

**Layout Desktop:** Grid 65% (formulário) / 35% (resumo sticky)

### Coluna Esquerda - Formulário

**Seção Identificação:**
- Grid 2 colunas: E-mail + Telefone
- Checkbox "Não tenho e-mail"
- Grid 2 colunas: Nome completo + CPF
- Validação de campos (formato email, CPF, telefone)

**Seção Entrega:**
- Link "Outra pessoa irá receber o pedido? Clique aqui"
- Campo CEP com máscara
- Box informativo: "Preencha seu CEP para encontrar o melhor frete"
- Texto de previsão de entrega

**Seção Pagamento:**
- Card PIX selecionado com borda verde e badge "3% OFF"
- Badge "APROVAÇÃO IMEDIATA" (verde)
- Destaque do desconto: "Garanta R$ 2,10 de desconto pagando via Pix"
- Lista de lembretes sobre pagamento PIX

**Seção Order Bumps (Interativos):**
- Título: "Temos 2 ofertas disponíveis para você:"
- **Card Viseira Vision:** fundo rosa claro, borda pontilhada, imagem, preço de/por, botão "PEGAR OFERTA" com checkbox
- **Card Narigueira:** mesmo estilo, tag "ÚLTIMAS UNIDADES"
- Ao clicar, atualiza o total do carrinho

**Botão CTA:**
- "FINALIZAR COMPRA" - full width, 56px altura, cor #fe2c55

### Coluna Direita - Resumo do Pedido (Sticky)

**Card Carrinho:**
- Header "Seu carrinho" com badge vermelho "1"
- Produto com miniatura, título, descrição
- Contador de quantidade (- 1 +) com atualização de preço

**Resumo de Preços:**
- Subtotal: R$ 69,90
- Frete: R$ 0,00
- Desconto automático (Pix): -R$ 2,10 (verde)
- **Total: R$ 67,80** (verde, destaque)

**Badge Segurança:**
- Ícone + "Ambiente seguro"

**Footer:**
- "Formas de pagamento" + ícone PIX
- © 2026 TikTok Shop

---

## ⚡ Funcionalidades Interativas

1. **Validação de Formulário:**
   - Email (formato válido)
   - CPF (máscara e validação)
   - Telefone (máscara DDD + número)
   - CEP (máscara e formato)

2. **Order Bumps Dinâmicos:**
   - Checkbox seleciona/deseleciona oferta
   - Total do carrinho atualiza automaticamente
   - Animação suave ao adicionar

3. **Contador de Quantidade:**
   - Incremento/decremento
   - Recalcula subtotal e total

4. **Galeria de Produto:**
   - Navegação por thumbnails
   - Transição suave entre imagens

5. **Navegação:**
   - Página de produto → botão leva ao checkout
   - Checkout → botão simula finalização

---

## 📁 Estrutura de Arquivos

```
src/
├── pages/
│   ├── Product.tsx          # Página do produto
│   └── Checkout.tsx         # Página do checkout
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Logo TikTok Shop
│   │   └── Footer.tsx       # Footer com pagamentos
│   ├── product/
│   │   ├── ImageGallery.tsx # Carrossel de imagens
│   │   ├── ProductInfo.tsx  # Preço, avaliação, badges
│   │   ├── SizeSelector.tsx # Seletor de tamanho
│   │   └── Reviews.tsx      # Seção de avaliações
│   └── checkout/
│       ├── IdentificationForm.tsx  # Formulário de dados
│       ├── ShippingSection.tsx     # CEP e entrega
│       ├── PaymentSection.tsx      # Seleção PIX
│       ├── OrderBumps.tsx          # Ofertas adicionais
│       ├── CartSummary.tsx         # Resumo do carrinho
│       └── ProductCard.tsx         # Card do produto
├── hooks/
│   └── useCart.ts           # Estado do carrinho
└── data/
    └── products.ts          # Dados mockados
```

---

## 🚀 Preparado para Futuro

- Estrutura de componentes pronta para integração com gateway de pagamento
- Hooks de estado prontos para conectar com API
- Formulário validado com Zod, pronto para enviar dados
- Arquitetura escalável para adicionar mais produtos

