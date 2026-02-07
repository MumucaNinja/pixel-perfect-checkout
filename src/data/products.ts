export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  images: string[];
  sizes: string[];
  colors: { name: string; image: string }[];
  deliveryEstimate: string;
  specifications: {
    title: string;
    items: string[];
  }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  date: string;
  rating: number;
  comment: string;
  images?: string[];
  variant?: string;
}

export interface OrderBump {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  tag?: string;
}

export const product: Product = {
  id: "capacete-ls2-thunder",
  name: "Capacete LS2 Thunder Carbon Racing",
  description: "Capacete LS2 Thunder Carbon - O mais leve e seguro da categoria. Design aerodinâmico com fibra de carbono premium.",
  originalPrice: 249.90,
  salePrice: 69.90,
  discountPercentage: 72,
  rating: 4.9,
  reviewCount: 2800,
  soldCount: 6500,
  images: [
    "https://tkktopshp.lovable.app/assets/capacete-1-C2i6gVmE.webp",
    "https://tkktopshp.lovable.app/assets/capacete-2-DpMXANCY.webp",
    "https://tkktopshp.lovable.app/assets/capacete-3-DxpHwcgU.webp",
    "https://tkktopshp.lovable.app/assets/capacete-4-BWFHToxT.webp",
    "https://tkktopshp.lovable.app/assets/capacete-5-DutSWMMA.webp",
    "https://tkktopshp.lovable.app/assets/capacete-6-DGzjYAmB.webp",
  ],
  sizes: ["54", "56", "58", "60", "62"],
  colors: [
    { name: "Preto Fosco", image: "https://tkktopshp.lovable.app/assets/capacete-1-C2i6gVmE.webp" },
    { name: "Branco Perolado", image: "https://tkktopshp.lovable.app/assets/capacete-3-DxpHwcgU.webp" },
    { name: "Vermelho Racing", image: "https://tkktopshp.lovable.app/assets/capacete-2-DpMXANCY.webp" },
    { name: "Azul Metálico", image: "https://tkktopshp.lovable.app/assets/capacete-4-BWFHToxT.webp" },
    { name: "Rosa e Preto", image: "https://tkktopshp.lovable.app/assets/capacete-6-DGzjYAmB.webp"},
  ],
  deliveryEstimate: "Entrega entre 3-7 dias úteis",
  specifications: [
    {
      title: "Características Técnicas",
      items: [
        "Casco em fibra de carbono premium",
        "EPS de múltipla densidade para absorção de impacto",
        "Sistema de ventilação com 8 entradas de ar",
        "Viseira antirrisco com tratamento UV",
        "Forro removível e lavável",
        "Fecho micrométrico em aço inox",
      ],
    },
    {
      title: "Certificações",
      items: [
        "Certificação INMETRO",
        "Homologação DOT e ECE 22.05",
        "Aprovado para competições",
      ],
    },
  ],
};

export const reviews: Review[] = [
  {
    id: "1",
    userName: "Ca**** M.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
    date: "15/01/2026",
    rating: 5,
    comment: "Excelente capacete! Muito leve e confortável. A ventilação é incrível, uso todos os dias pro trabalho. Recomendo demais!",
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_906576-MLB79889230881_102024-O-capacete-ls2-ff358-preto-fosco-black-viseira-dourada-gold.webp",
    ],
    variant: "Preto Fosco - Tam. 58",
  },
  {
    id: "2",
    userName: "Am**** L.",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    date: "12/01/2026",
    rating: 5,
    comment: "Chegou super rápido! Qualidade impressionante pelo preço. A viseira tem ótima visibilidade.",
    variant: "Branco Perolado - Tam. 56",
  },
  {
    id: "3",
    userName: "Ro**** S.",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    date: "10/01/2026",
    rating: 4,
    comment: "Ótimo custo-benefício. O forro é muito macio e confortável para longas viagens.",
    images: [
      "https://img.olx.com.br/images/61/611516352422379.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMSYBwJWnfPvI_In_IjUJdxPjgh8xAQql4Q&s",
    ],
    variant: "Vermelho Racing - Tam. 60",
  },
];

export const orderBumps: OrderBump[] = [
  {
    id: "viseira-vision",
    name: "Viseira Vision HD Pro",
    description: "Viseira antiembaçante com tratamento UV400 e película espelhada",
    originalPrice: 89.90,
    salePrice: 29.90,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRcrHvl0FxgIrU21nO5vJ1RpXoFG2og_Y7DXMDZ4Nahkq4rlDO6b7t9Uw5_W3ENXpstuKq-OBAbSoXDaGOo6pJ47rC9DyH_6WZFooYxbSsK9rU7KBa_ghY",
  },
  {
    id: "narigueira-comfort",
    name: "Narigueira Comfort Fit",
    description: "Protetor de nariz em silicone hipoalergênico - ajuste universal",
    originalPrice: 49.90,
    salePrice: 19.90,
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_634840-MLB103856835344_012026-F.webp",
    tag: "ÚLTIMAS UNIDADES",
  },
];

export const PIX_DISCOUNT_PERCENTAGE = 0.03; // 3% de desconto
