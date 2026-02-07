import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  colors: { name: string; image: string }[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export function SizeSelector({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: SizeSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Color Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Cor</span>
          <span className="text-sm text-muted-foreground">{selectedColor}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorChange(color.name)}
              className={cn(
                "w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors",
                selectedColor === color.name
                  ? "border-primary"
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <img
                src={color.image}
                alt={color.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Tamanho</span>
          <button className="text-sm text-primary hover:underline">
            Guia de tamanhos
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={cn(
                "min-w-[48px] h-10 px-4 rounded-lg border text-sm font-medium transition-colors",
                selectedSize === size
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-foreground hover:border-muted-foreground/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
