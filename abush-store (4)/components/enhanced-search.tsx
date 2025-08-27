"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp, Clock, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data for search suggestions and products
const popularSearches = [
  "Ethiopian Coffee",
  "Traditional Clothing",
  "Spices & Seasonings",
  "Handmade Crafts",
  "Jewelry",
]

const recentSearches = ["Berbere Spice", "Coffee Beans", "Traditional Scarf"]

const productSuggestions = [
  {
    id: 1,
    name: "Premium Ethiopian Coffee Beans",
    price: "ETB 450",
    image: "/ethiopian-coffee-beans-premium-quality.png",
    category: "Coffee",
  },
  {
    id: 2,
    name: "Traditional Handwoven Scarf",
    price: "ETB 320",
    image: "/ethiopian-traditional-handwoven-scarf-colorful.png",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Authentic Berbere Spice Mix",
    price: "ETB 180",
    image: "/ethiopian-berbere-spice-mix-authentic.png",
    category: "Spices",
  },
]

interface EnhancedSearchProps {
  onSearch?: (query: string) => void
}

export function EnhancedSearch({ onSearch }: EnhancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(productSuggestions)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.length > 0) {
      const suggestions = popularSearches.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredSuggestions(suggestions)

      const products = productSuggestions.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(products)
      setIsOpen(true)
    } else {
      setFilteredSuggestions([])
      setFilteredProducts(productSuggestions.slice(0, 3))
      setIsOpen(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsOpen(false)
    if (onSearch) {
      onSearch(query)
    }
    console.log("[v0] Searching for:", query)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsOpen(false)
    if (onSearch) {
      onSearch("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch(searchQuery)
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-purple-600" />
        </div>

        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, brands, and more..."
          className="w-full pl-12 pr-12 py-3 text-base bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg transition-all duration-300 focus:border-purple-400 focus:shadow-xl focus:bg-white hover:shadow-md hover:border-gray-300"
        />

        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="p-4">
            {searchQuery.length === 0 && (
              <>
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Recent Searches</span>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Popular Searches</span>
                  </div>
                  <div className="space-y-1">
                    {popularSearches.slice(0, 5).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {searchQuery.length > 0 && filteredSuggestions.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Search Suggestions</span>
                </div>
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <Search className="h-3 w-3 text-muted-foreground" />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: suggestion.replace(
                            new RegExp(searchQuery, "gi"),
                            `<strong class="text-purple-600">$&</strong>`,
                          ),
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {searchQuery ? "Matching Products" : "Featured Products"}
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredProducts.slice(0, 3).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearch(product.name)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-3"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-purple-600">{product.price}</span>
                          <span className="text-xs text-muted-foreground">{product.category}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
