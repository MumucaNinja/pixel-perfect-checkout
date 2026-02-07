import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { SizeSelector } from '@/components/product/SizeSelector';
import { Reviews } from '@/components/product/Reviews';
import { ProductDescription } from '@/components/product/ProductDescription';
import { ProductFooter } from '@/components/product/ProductFooter';
import { product, reviews } from '@/data/products';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function Product() {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default: 58
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  const handleAddToCart = () => {
    toast.success('Produto adicionado ao carrinho!', {
      description: `${product.name} - ${selectedColor} - Tam. ${selectedSize}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showCart cartCount={1} />
      
      <main className="container mx-auto px-4 py-4 space-y-6">
        {/* Image Gallery */}
        <ImageGallery images={product.images} productName={product.name} />
        
        {/* Product Info */}
        <div className="bg-card rounded-lg p-4">
          <ProductInfo
            name={product.name}
            originalPrice={product.originalPrice}
            salePrice={product.salePrice}
            discountPercentage={product.discountPercentage}
            rating={product.rating}
            reviewCount={product.reviewCount}
            soldCount={product.soldCount}
            deliveryEstimate={product.deliveryEstimate}
          />
        </div>

        {/* Size & Color Selector */}
        <div className="bg-card rounded-lg p-4">
          <SizeSelector
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />
        </div>

        <Separator />

        {/* Reviews */}
        <div className="bg-card rounded-lg p-4">
          <Reviews
            reviews={reviews}
            averageRating={product.rating}
            totalReviews={product.reviewCount}
          />
        </div>

        <Separator />

        {/* Product Description */}
        <div className="bg-card rounded-lg p-4">
          <ProductDescription specifications={product.specifications} />
        </div>
      </main>

      {/* Fixed Footer */}
      <ProductFooter onAddToCart={handleAddToCart} />
    </div>
  );
}
