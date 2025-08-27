import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
}

export function ProductCard({ name, price, originalPrice, image, rating, reviews }: ProductCardProps) {
  return (
    <Card className="neumorphic-card group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 neumorphic-button bg-card/80 hover:bg-card"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {originalPrice && (
          <div className="absolute top-2 left-2 bg-orange-accent text-orange-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-space-grotesk font-semibold text-foreground mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-space-grotesk font-bold text-lg text-foreground">{price.toLocaleString()} ETB</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{originalPrice.toLocaleString()} ETB</span>
            )}
          </div>
          <Button size="sm" className="neumorphic-button bg-accent hover:bg-accent/90 text-accent-foreground">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
