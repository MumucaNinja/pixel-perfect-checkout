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
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=600&fit=crop",
  ],
  sizes: ["54", "56", "58", "60", "62"],
  colors: [
    { name: "Preto Fosco", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop" },
    { name: "Branco Perolado", image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=100&h=100&fit=crop" },
    { name: "Vermelho Racing", image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=100&h=100&fit=crop" },
    { name: "Azul Metálico", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop" },
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
    userName: "Carlos M.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
    date: "15/01/2026",
    rating: 5,
    comment: "Excelente capacete! Muito leve e confortável. A ventilação é incrível, uso todos os dias pro trabalho. Recomendo demais!",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    ],
    variant: "Preto Fosco - Tam. 58",
  },
  {
    id: "2",
    userName: "Amanda L.",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    date: "12/01/2026",
    rating: 5,
    comment: "Chegou super rápido! Qualidade impressionante pelo preço. A viseira tem ótima visibilidade.",
    variant: "Branco Perolado - Tam. 56",
  },
  {
    id: "3",
    userName: "Roberto S.",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    date: "10/01/2026",
    rating: 4,
    comment: "Ótimo custo-benefício. O forro é muito macio e confortável para longas viagens.",
    images: [
      "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=100&h=100&fit=crop",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop",
  },
  {
    id: "narigueira-comfort",
    name: "Narigueira Comfort Fit",
    description: "Protetor de nariz em silicone hipoalergênico - ajuste universal",
    originalPrice: 49.90,
    salePrice: 19.90,
    image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=150&h=150&fit=crop",
    tag: "ÚLTIMAS UNIDADES",
  },
];

export const PIX_DISCOUNT_PERCENTAGE = 0.03; // 3% de desconto
