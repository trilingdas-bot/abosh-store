"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { PaymentMethods } from "@/components/payment-methods"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Grid3X3, ChevronDown, Zap, TrendingUp, ChevronRight, Star, Heart } from "lucide-react"
import { IntroVideo } from "@/components/intro-video"
import { Truck, Shield, Headphones, Sparkles, Clock, ShoppingCart, ChevronLeft } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    name: "Traditional Ethiopian Coffee Beans - Premium Sidamo",
    price: 450,
    originalPrice: 600,
    image: "/ethiopian-coffee-beans-premium-quality.png",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    badgeColor: "bg-orange-500",
    category: "Groceries",
  },
  {
    id: "2",
    name: "Handwoven Ethiopian Scarf - Traditional Design",
    price: 850,
    image: "/ethiopian-traditional-handwoven-scarf-colorful.png",
    rating: 4.6,
    reviews: 89,
    badge: "Limited Edition",
    badgeColor: "bg-purple-600",
    category: "Fashion",
  },
  {
    id: "3",
    name: "Berbere Spice Mix - Authentic Ethiopian Blend",
    price: 180,
    originalPrice: 220,
    image: "/ethiopian-berbere-spice-mix-authentic.png",
    rating: 4.9,
    reviews: 156,
    badge: "Organic",
    badgeColor: "bg-green-600",
    category: "Groceries",
  },
  {
    id: "4",
    name: "Ethiopian Honey - Wild Forest Honey",
    price: 320,
    image: "/ethiopian-wild-forest-honey-natural.png",
    rating: 4.7,
    reviews: 98,
    badge: "Natural",
    badgeColor: "bg-amber-600",
    category: "Groceries",
  },
  {
    id: "5",
    name: "Traditional Ethiopian Injera Plate Set",
    price: 680,
    image: "/ethiopian-injera-plate-set-traditional.png",
    rating: 4.5,
    reviews: 67,
    badge: "Handmade",
    badgeColor: "bg-blue-600",
    category: "Home & Furniture",
  },
  {
    id: "6",
    name: "Ethiopian Traditional Dress - Habesha Kemis",
    price: 1200,
    originalPrice: 1500,
    image: "/ethiopian-traditional-dress-habesha-kemis.png",
    rating: 4.8,
    reviews: 89,
    badge: "Cultural",
    badgeColor: "bg-purple-600",
    category: "Fashion",
  },
]

const trendingProducts = [
  {
    id: "7",
    name: "Premium Samsung Galaxy S24",
    price: 25000,
    originalPrice: 28000,
    image: "/samsung-galaxy-s24-smartphone.png",
    rating: 4.8,
    reviews: 234,
    discount: 11,
    category: "Electronics",
  },
  {
    id: "8",
    name: "MacBook Air M3 - 13 inch",
    price: 45000,
    image: "/macbook-air-laptop-silver.png",
    rating: 4.9,
    reviews: 156,
    category: "Electronics",
  },
  {
    id: "9",
    name: "Nike Air Max Running Shoes",
    price: 3500,
    originalPrice: 4200,
    image: "/nike-air-max-running-shoes.png",
    rating: 4.6,
    reviews: 189,
    discount: 17,
    category: "Sports & Outdoors",
  },
  {
    id: "10",
    name: "Modern Living Room Sofa Set",
    price: 15000,
    image: "/modern-grey-sofa-living-room.png",
    rating: 4.7,
    reviews: 78,
    category: "Home & Furniture",
  },
  {
    id: "11",
    name: "Skincare Beauty Set - Premium Collection",
    price: 2800,
    originalPrice: 3500,
    image: "/skincare-beauty-products-set.png",
    rating: 4.5,
    reviews: 145,
    discount: 20,
    category: "Beauty & Health",
  },
  {
    id: "12",
    name: "Professional Football - FIFA Approved",
    price: 850,
    image: "/fifa-approved-football-soccer-ball.png",
    rating: 4.8,
    reviews: 267,
    category: "Sports & Outdoors",
  },
]

const categories = [
  {
    name: "Electronics",
    icon: "📱",
    count: 245,
    color: "bg-gradient-to-br from-blue-50 to-indigo-100 text-indigo-800 border-indigo-200",
    hoverColor: "hover:from-blue-100 hover:to-indigo-200 hover:text-indigo-900",
    subcategories: ["Mobile Phones", "Laptops", "Audio Devices", "Cameras"],
    trending: true,
  },
  {
    name: "Fashion",
    icon: "👗",
    count: 189,
    color: "bg-gradient-to-br from-pink-50 to-rose-100 text-rose-800 border-rose-200",
    hoverColor: "hover:from-pink-100 hover:to-rose-200 hover:text-rose-900",
    subcategories: ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories"],
    trending: false,
  },
  {
    name: "Home & Furniture",
    icon: "🏠",
    count: 156,
    color: "bg-gradient-to-br from-amber-50 to-orange-100 text-orange-800 border-orange-200",
    hoverColor: "hover:from-amber-100 hover:to-orange-200 hover:text-orange-900",
    subcategories: ["Furniture", "Home Decor", "Kitchen & Dining", "Lighting"],
    trending: false,
  },
  {
    name: "Beauty & Health",
    icon: "💄",
    count: 98,
    color: "bg-gradient-to-br from-purple-50 to-violet-100 text-violet-800 border-violet-200",
    hoverColor: "hover:from-purple-100 hover:to-violet-200 hover:text-violet-900",
    subcategories: ["Skincare", "Makeup", "Haircare", "Healthcare"],
    trending: true,
  },
  {
    name: "Sports & Outdoors",
    icon: "⚽",
    count: 87,
    color: "bg-gradient-to-br from-green-50 to-emerald-100 text-emerald-800 border-emerald-200",
    hoverColor: "hover:from-green-100 hover:to-emerald-200 hover:text-emerald-900",
    subcategories: ["Fitness Equipment", "Sports Gear", "Outdoor Gear"],
    trending: false,
  },
  {
    name: "Groceries",
    icon: "🛒",
    count: 234,
    color: "bg-gradient-to-br from-lime-50 to-green-100 text-green-800 border-green-200",
    hoverColor: "hover:from-lime-100 hover:to-green-200 hover:text-green-900",
    subcategories: ["Fresh Produce", "Dairy & Eggs", "Beverages", "Snacks"],
    trending: false,
  },
  {
    name: "Books & Media",
    icon: "📚",
    count: 67,
    color: "bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800 border-gray-200",
    hoverColor: "hover:from-slate-100 hover:to-gray-200 hover:text-gray-900",
    subcategories: ["Books", "Music", "Movies"],
    trending: false,
  },
  {
    name: "Automotive",
    icon: "🚗",
    count: 45,
    color: "bg-gradient-to-br from-red-50 to-pink-100 text-pink-800 border-pink-200",
    hoverColor: "hover:from-red-100 hover:to-pink-200 hover:text-pink-900",
    subcategories: ["Car Accessories", "Bike Accessories", "Car Parts"],
    trending: false,
  },
  {
    name: "Toys & Baby",
    icon: "🧸",
    count: 78,
    color: "bg-gradient-to-br from-yellow-50 to-amber-100 text-amber-800 border-amber-200",
    hoverColor: "hover:from-yellow-100 hover:to-amber-200 hover:text-amber-900",
    subcategories: ["Toys", "Baby Gear", "Baby Essentials"],
    trending: false,
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free delivery within Addis Ababa",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Safe & secure local payments",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Customer support in Amharic & English",
  },
]

const dealProducts = [
  {
    id: "d1",
    name: "Premium Ethiopian Coffee Bundle",
    price: 899,
    originalPrice: 1299,
    image: "/ethiopian-coffee-beans-premium-quality.png",
    rating: 4.8,
    reviews: 1234,
    badge: "31% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "d2",
    name: "Traditional Spice Collection",
    price: 650,
    originalPrice: 950,
    image: "/ethiopian-berbere-spice-mix-authentic.png",
    rating: 4.7,
    reviews: 856,
    badge: "32% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "d3",
    name: "Handwoven Textile Bundle",
    price: 1200,
    originalPrice: 1800,
    image: "/ethiopian-traditional-handwoven-scarf-colorful.png",
    rating: 4.9,
    reviews: 432,
    badge: "33% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "d4",
    name: "Ethiopian Honey Collection",
    price: 580,
    originalPrice: 850,
    image: "/ethiopian-wildflower-honey-jar-pure.png",
    rating: 4.6,
    reviews: 298,
    badge: "32% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "d5",
    name: "Traditional Jewelry Set",
    price: 2100,
    originalPrice: 3200,
    image: "/ethiopian-traditional-silver-cross-jewelry.png",
    rating: 4.8,
    reviews: 167,
    badge: "34% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "d6",
    name: "Organic Teff Flour Pack",
    price: 420,
    originalPrice: 650,
    image: "/ethiopian-teff-flour-organic-bag.png",
    rating: 4.5,
    reviews: 543,
    badge: "35% OFF",
    badgeColor: "bg-red-500",
  },
]

const allFeaturedProducts = [
  ...featuredProducts,
  {
    id: "f7",
    name: "Ethiopian Frankincense Premium",
    price: 280,
    image: "/ethiopian-frankincense-incense-sticks.png",
    rating: 4.8,
    reviews: 156,
    badge: "Premium",
    badgeColor: "bg-purple-600",
  },
  {
    id: "f8",
    name: "Traditional Woven Basket Large",
    price: 850,
    image: "/ethiopian-traditional-handwoven-basket.png",
    rating: 4.7,
    reviews: 89,
    badge: "Handmade",
    badgeColor: "bg-green-600",
  },
  {
    id: "f9",
    name: "Black Seed Oil Organic",
    price: 520,
    originalPrice: 680,
    image: "/ethiopian-black-seed-oil-bottle.png",
    rating: 4.6,
    reviews: 234,
    badge: "Organic",
    badgeColor: "bg-green-600",
  },
  {
    id: "f10",
    name: "Ethiopian Coffee Ceremony Set",
    price: 1450,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 78,
    badge: "Cultural",
    badgeColor: "bg-orange-500",
  },
  {
    id: "f11",
    name: "Traditional Ethiopian Dress",
    price: 2200,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 145,
    badge: "Traditional",
    badgeColor: "bg-purple-600",
  },
  {
    id: "f12",
    name: "Ethiopian Berbere Spice Premium",
    price: 320,
    originalPrice: 420,
    image: "/ethiopian-berbere-spice-mix-authentic.png",
    rating: 4.7,
    reviews: 367,
    badge: "Authentic",
    badgeColor: "bg-red-600",
  },
]

const personalizedRecommendations = [
  {
    id: "p1",
    name: "Ethiopian Coffee Subscription Box",
    price: 1200,
    originalPrice: 1500,
    image: "/ethiopian-coffee-beans-premium-quality.png",
    rating: 4.9,
    reviews: 234,
    badge: "Recommended for You",
    badgeColor: "bg-purple-600",
    category: "Groceries",
    reason: "Based on your coffee purchases",
  },
  {
    id: "p2",
    name: "Premium Berbere Spice Collection",
    price: 680,
    image: "/ethiopian-berbere-spice-mix-authentic.png",
    rating: 4.8,
    reviews: 156,
    badge: "Perfect Match",
    badgeColor: "bg-green-600",
    category: "Groceries",
    reason: "Complements your spice collection",
  },
  {
    id: "p3",
    name: "Traditional Ethiopian Cookware Set",
    price: 2400,
    originalPrice: 3000,
    image: "/ethiopian-injera-plate-set-traditional.png",
    rating: 4.7,
    reviews: 89,
    badge: "Trending",
    badgeColor: "bg-orange-500",
    category: "Home & Furniture",
    reason: "Popular with customers like you",
  },
  {
    id: "p4",
    name: "Handcrafted Ethiopian Jewelry",
    price: 950,
    image: "/ethiopian-traditional-handwoven-scarf-colorful.png",
    rating: 4.6,
    reviews: 67,
    badge: "Artisan Made",
    badgeColor: "bg-blue-600",
    category: "Fashion",
    reason: "Matches your style preferences",
  },
]

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showDealsModal, setShowDealsModal] = useState(false)
  const [showFeaturedModal, setShowFeaturedModal] = useState(false)
  const [showTrendingModal, setShowTrendingModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [modalType, setModalType] = useState<"deals" | "featured" | "trending">("deals")

  const [category, setCategory] = useState<string | null>(null)
  const [showProducts, setShowProducts] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("popular")
  const [priceRange, setPriceRange] = useState<string>("all")

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number; image: string }>>(
    [],
  )
  const [showCart, setShowCart] = useState(false)

  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const allProducts = [...featuredProducts, ...trendingProducts, ...allFeaturedProducts]

  useEffect(() => {
    const handleSearchEvent = (event: CustomEvent) => {
      handleSearch(event.detail)
    }

    const handleToggleCartEvent = () => {
      setShowCart(true)
    }

    window.addEventListener("search", handleSearchEvent as EventListener)
    window.addEventListener("toggleCart", handleToggleCartEvent)

    const savedUser = localStorage.getItem("abush-store-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("abush-store-user")
      }
    }

    return () => {
      window.removeEventListener("search", handleSearchEvent as EventListener)
      window.removeEventListener("toggleCart", handleToggleCartEvent)
    }
  }, [])

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
    localStorage.setItem("abush-store-user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("abush-store-user")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setShowProducts(true)
      setCategory(null) // Clear category when searching
      setSelectedSubcategory(null)
      setShowCategoryDropdown(false)
      // Scroll to search results
      setTimeout(() => {
        const searchSection = document.querySelector("[data-search-results]")
        if (searchSection) {
          searchSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    } else {
      setShowProducts(false)
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    console.log("[v0] Category clicked:", categoryName)
    setCategory(categoryName)
    setSelectedSubcategory(null)
    setShowProducts(true)
    setShowCategoryDropdown(false)
    setSearchQuery("") // Clear search when selecting category
  }

  const handleAllCategoriesClick = () => {
    console.log("[v0] All Categories clicked - showing all products")
    setCategory(null)
    setSelectedSubcategory(null)
    setShowProducts(true)
    setShowCategoryDropdown(false)
    setSearchQuery("") // Clear search when showing all categories
  }

  const handleViewAllCategoriesDropdown = () => {
    console.log("[v0] View All dropdown clicked")
    setShowCategoryDropdown(!showCategoryDropdown)
    setActiveDropdown(null)
  }

  const handleSubcategoryClick = (categoryName: string, subcategory: string) => {
    console.log("[v0] Subcategory clicked:", categoryName, subcategory)
    setCategory(categoryName)
    setSelectedSubcategory(subcategory)
    setShowProducts(true)
    setActiveDropdown(null)
    setShowCategoryDropdown(false)
  }

  const handleQuickFilterClick = (filterType: string) => {
    console.log("[v0] Quick filter clicked:", filterType)
    setCategory(filterType)
    setSelectedSubcategory(null)
    setShowProducts(true)
  }

  const getFilteredProducts = () => {
    let filtered = allProducts

    // Apply search filter first
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase() ||
          product.subcategory?.toLowerCase() === category.toLowerCase(),
      )
    }

    // Apply subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter((product) => product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase())
    }

    // Apply price range filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter((product) => {
        if (max) {
          return product.price >= min && product.price <= max
        } else {
          return product.price >= min
        }
      })
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price)
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      case "rating":
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return filtered
    }
  }

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        const newCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cartUpdated"))
        }
        return newCart
      } else {
        const newCart = [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ]
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cartUpdated"))
        }
        return newCart
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cartUpdated"))
      }
      return newCart
    })
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cartUpdated"))
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const productsPerPage = 12

  const handleShowAllDeals = () => {
    setModalType("deals")
    setCurrentPage(1)
    setShowDealsModal(true)
  }

  const handleShowAllFeatured = () => {
    setModalType("featured")
    setCurrentPage(1)
    setShowFeaturedModal(true)
  }

  const handleShowAllTrending = () => {
    setModalType("trending")
    setCurrentPage(1)
    setShowTrendingModal(true)
  }

  const closeModal = () => {
    setShowDealsModal(false)
    setShowFeaturedModal(false)
    setShowTrendingModal(false)
  }

  const handleIntroEnd = () => {
    setShowIntro(false)
  }

  const extendedDealProducts = [
    ...dealProducts,
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `d${i + 7}`,
      name: `Deal Product ${i + 7}`,
      price: Math.floor(Math.random() * 1000) + 200,
      originalPrice: Math.floor(Math.random() * 1500) + 500,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5 + Math.random() * 0.4,
      reviews: Math.floor(Math.random() * 500) + 50,
      badge: `${Math.floor(Math.random() * 40) + 20}% OFF`,
      badgeColor: "bg-red-500",
    })),
  ]

  const extendedFeaturedProducts = [
    ...allFeaturedProducts,
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `f${i + 13}`,
      name: `Featured Product ${i + 13}`,
      price: Math.floor(Math.random() * 2000) + 300,
      originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 2500) + 600 : undefined,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3 + Math.random() * 0.6,
      reviews: Math.floor(Math.random() * 300) + 30,
      badge: ["Premium", "Choice", "Best Seller"][Math.floor(Math.random() * 3)],
      badgeColor: ["bg-purple-600", "bg-blue-600", "bg-orange-500"][Math.floor(Math.random() * 3)],
    })),
  ]

  const extendedTrendingProducts = [
    ...trendingProducts,
    ...Array.from({ length: 21 }, (_, i) => ({
      id: `t${i + 4}`,
      name: `Trending Product ${i + 4}`,
      price: Math.floor(Math.random() * 1500) + 150,
      originalPrice: Math.random() > 0.6 ? Math.floor(Math.random() * 2000) + 400 : undefined,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.2 + Math.random() * 0.7,
      reviews: Math.floor(Math.random() * 400) + 20,
    })),
  ]

  const getCurrentProducts = () => {
    let products = []
    if (modalType === "deals") products = extendedDealProducts
    else if (modalType === "featured") products = extendedFeaturedProducts
    else products = extendedTrendingProducts

    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return products.slice(startIndex, endIndex)
  }

  const getTotalPages = () => {
    let totalProducts = 0
    if (modalType === "deals") totalProducts = extendedDealProducts.length
    else if (modalType === "featured") totalProducts = extendedFeaturedProducts.length
    else totalProducts = extendedTrendingProducts.length

    return Math.ceil(totalProducts / productsPerPage)
  }

  const ProductModal = ({ isOpen, onClose, title, products, totalPages }: any) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl my-8 animate-in slide-in-from-top-4 duration-500">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                  {modalType === "deals"
                    ? extendedDealProducts.length
                    : modalType === "featured"
                      ? extendedFeaturedProducts.length
                      : extendedTrendingProducts.length}{" "}
                  items
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-10 h-10 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {products.map((product: any, index: number) => (
                <Card
                  key={product.id}
                  className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group product-card neumorphic-card animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {product.badge && (
                      <Badge
                        className={`absolute top-2 left-2 ${product.badgeColor || "bg-red-500"} text-white text-xs px-2 py-1 font-bold`}
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 neumorphic-button"
                    >
                      <Heart className="w-4 h-4 icon-hover" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-blue-600 font-medium">({product.reviews})</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">ETB {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">ETB {product.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-xs text-green-600 font-medium">FREE delivery</p>
                      <Button
                        size="sm"
                        className="w-full bg-orange-accent hover:bg-orange-accent/90 text-white text-xs py-2 font-medium ripple-button neumorphic-button"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="neumorphic-button"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 p-0 neumorphic-button ${
                          currentPage === pageNum ? "bg-purple-600 text-white" : ""
                        }`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="neumorphic-button"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="text-center mt-4 text-sm text-gray-600">
              Showing {(currentPage - 1) * productsPerPage + 1} -{" "}
              {Math.min(
                currentPage * productsPerPage,
                modalType === "deals"
                  ? extendedDealProducts.length
                  : modalType === "featured"
                    ? extendedFeaturedProducts.length
                    : extendedTrendingProducts.length,
              )}{" "}
              of{" "}
              {modalType === "deals"
                ? extendedDealProducts.length
                : modalType === "featured"
                  ? extendedFeaturedProducts.length
                  : extendedTrendingProducts.length}{" "}
              products
            </div>
          </div>
        </div>
      </div>
    )
  }

  const products = [...featuredProducts, ...trendingProducts]

  const ProductsModal = ({ isOpen, onClose, category, products }: any) => {
    if (!isOpen) return null

    const filteredProducts = getFilteredProducts()

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl my-8 animate-in slide-in-from-top-4 duration-500">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedSubcategory ? `${category} - ${selectedSubcategory}` : category}
                </h2>
                <Badge className="bg-purple-100 text-purple-800 px-3 py-1">{filteredProducts.length} items</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-10 h-10 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Price:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="over-200">Over $200</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or browse other categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {filteredProducts.map((product: any, index: number) => (
                  <Card
                    key={product.id}
                    className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group product-card neumorphic-card animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {product.badge && (
                        <Badge
                          className={`absolute top-2 left-2 ${product.badgeColor || "bg-red-500"} text-white text-xs px-2 py-1 font-bold`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 neumorphic-button"
                      >
                        <Heart className="w-4 h-4 icon-hover" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-blue-600 font-medium">({product.reviews})</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">ETB {product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">ETB {product.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 font-medium">FREE delivery</p>
                        <Button
                          size="sm"
                          className="w-full bg-orange-accent hover:bg-orange-accent/90 text-white text-xs py-2 font-medium ripple-button neumorphic-button"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Enhanced category buttons with dropdown functionality

  return (
    <>
      {showIntro && <IntroVideo onVideoEnd={handleIntroEnd} />}

      <div
        className={`min-h-screen bg-background transition-opacity duration-500 ${showIntro ? "opacity-0" : "opacity-100"}`}
      >
        <Header
          handleSearch={handleSearch}
          getTotalItems={getTotalItems}
          setShowCart={setShowCart}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        <main className="pt-24 pb-12">
          {user && (
            <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-4 px-4 border-b">
              <div className="container mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-purple-900">Welcome back, {user.name}!</h2>
                    <p className="text-sm text-purple-700">Discover products curated just for you</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white py-3 px-4">
            <div className="container mx-auto">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 font-medium">
                    <Sparkles className="w-4 h-4 icon-hover" />
                    <strong>FREE delivery</strong> on your first order over 500 ETB
                  </span>
                  <span className="hidden md:flex items-center gap-2">
                    <Clock className="w-4 h-4 icon-hover" />
                    Same-day delivery available in Addis Ababa
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline">Call: +251-11-123-4567</span>
                  <span className="text-yellow-300 font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </section>

          {searchQuery && (
            <section className="py-8 px-4 bg-gray-50" data-search-results>
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Search Results for "{searchQuery}"</h2>
                    <p className="text-gray-600 mt-1">{getFilteredProducts().length} products found</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setShowProducts(false)
                      }}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear Search
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCart(true)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      View Cart ({getTotalItems()})
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProducts().map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-all duration-300 neumorphic-card"
                    >
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {product.originalPrice && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">ETB {product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">ETB {product.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 font-medium">FREE delivery tomorrow</p>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="w-full bg-orange-accent hover:bg-orange-accent/90 text-white font-medium ripple-button neumorphic-button"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bg-gradient-to-r from-white via-purple-50/30 to-white border-b border-purple-100 py-4 px-4 shadow-sm">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                  <h2 className="text-lg font-bold text-gray-900">Shop by Category</h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {categories.length} categories
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 bg-transparent"
                  onClick={handleAllCategoriesClick}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 relative">
                {/* All Categories Button with Dropdown */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-fit ${
                      showCategoryDropdown ? "from-purple-700 to-indigo-700" : ""
                    }`}
                    onClick={handleAllCategoriesClick}
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    All Categories
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                        showCategoryDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {showCategoryDropdown && (
                    // Increased z-index to ensure dropdown appears above other content
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[60] min-w-80 max-w-96 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      <div className="p-4">
                        <div className="px-2 py-2 text-sm font-semibold text-gray-700 border-b border-gray-100 mb-3">
                          Select a Category
                        </div>
                        <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                          {categories.map((cat) => (
                            <div key={cat.name} className="group">
                              <button
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 flex items-center justify-between hover:shadow-md ${cat.color} ${cat.hoverColor} border`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{cat.icon}</span>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{cat.name}</span>
                                    <span className="text-xs opacity-75">{cat.count} items</span>
                                  </div>
                                </div>
                                {cat.trending && (
                                  <Badge className="bg-red-500 text-white text-xs px-2 py-1">Trending</Badge>
                                )}
                              </button>

                              {/* Subcategories */}
                              <div className="ml-6 mt-2 space-y-1">
                                {cat.subcategories.map((subcategory) => (
                                  <button
                                    key={subcategory}
                                    onClick={() => handleSubcategoryClick(cat.name, subcategory)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors duration-200 flex items-center justify-between group/sub"
                                  >
                                    {subcategory}
                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Filters */}
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="whitespace-nowrap text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium border border-orange-200 hover:border-orange-300 transition-all duration-300"
                    onClick={() => handleQuickFilterClick("Flash Sale")}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Flash Sale
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="whitespace-nowrap text-green-600 hover:text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg font-medium border border-green-200 hover:border-green-300 transition-all duration-300"
                    onClick={() => handleQuickFilterClick("Trending")}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="whitespace-nowrap text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium border border-blue-200 hover:border-blue-300 transition-all duration-300"
                    onClick={() => handleQuickFilterClick("Top Rated")}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Top Rated
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-6 px-4 bg-gray-50">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-2 bg-white border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 neumorphic-card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold animated-badge">
                          Deal of the Day
                        </Badge>
                        <span className="text-sm text-gray-600 font-medium">Ends in 12h 34m</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-700 interactive-link"
                        onClick={handleShowAllDeals}
                      >
                        See all deals
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <img
                          src="/ethiopian-coffee-beans-premium-quality.png"
                          alt="Deal Product"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                          31% OFF
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-xl text-gray-900">Premium Ethiopian Coffee Bundle</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-blue-600 font-medium">(1,234 reviews)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-red-600">ETB 899</span>
                            <span className="text-lg text-gray-500 line-through">ETB 1,299</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-green-600 font-bold">Save ETB 400 (31%)</span>
                            <span className="text-xs text-gray-600">Typical price: ETB 1,299</span>
                          </div>
                          <p className="text-sm text-gray-600">FREE delivery by tomorrow</p>
                        </div>
                        <div className="space-y-2">
                          <Button className="w-full bg-orange-accent hover:bg-orange-accent/90 text-white font-medium py-2 ripple-button neumorphic-button">
                            <ShoppingCart className="w-4 h-4 mr-2 icon-hover" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent neumorphic-button">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  {categories.slice(0, 4).map((category) => (
                    <Card
                      key={category.name}
                      className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group category-card neumorphic-card"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-3 category-icon group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">Up to 50% off</p>
                        <p className="text-xs text-gray-500">{category.count}+ items</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-3 text-purple-600 hover:text-purple-700 font-medium interactive-link neumorphic-button group-hover:bg-purple-50 transition-all duration-300"
                        >
                          Shop now
                          <ChevronRight className="w-4 h-4 ml-1 icon-hover group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 px-4">
            <div className="container mx-auto space-y-12">
              {user && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                      <Badge className="bg-purple-100 text-purple-800 px-2 py-1 text-xs">Personalized</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-purple-600 hover:text-purple-700 font-medium interactive-link"
                    >
                      View all recommendations
                      <ChevronRight className="w-4 h-4 ml-1 icon-hover" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {personalizedRecommendations.map((product) => (
                      <Card
                        key={product.id}
                        className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group product-card neumorphic-card"
                      >
                        <div className="relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {product.originalPrice && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 font-bold">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                          <Badge
                            className={`absolute top-2 right-2 ${product.badgeColor} text-white text-xs px-2 py-1`}
                          >
                            {product.badge}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 hover:text-purple-600 p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToCart(product)
                            }}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-purple-600 mb-2">{product.reason}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-sm text-gray-900">{product.price} ETB</span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">{product.originalPrice} ETB</span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-xs rounded-full transition-all duration-200 hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation()
                                addToCart(product)
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                    <Badge className="bg-purple-100 text-purple-800 px-2 py-1 text-xs">Curated for you</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 font-medium interactive-link"
                    onClick={handleShowAllFeatured}
                  >
                    See all featured
                    <ChevronRight className="w-4 h-4 ml-1 icon-hover" />
                  </Button>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  data-featured-products
                >
                  {featuredProducts.map((product, index) => (
                    <Card
                      key={product.id}
                      className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group product-card neumorphic-card"
                    >
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {product.originalPrice && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 font-bold">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                        {product.badge && (
                          <Badge
                            className={`absolute top-2 right-2 ${product.badgeColor} text-white text-xs px-2 py-1`}
                          >
                            {product.badge}
                          </Badge>
                        )}
                        {product.freeShipping && (
                          <Badge className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1">
                            FREE Shipping
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 neumorphic-button"
                        >
                          <Heart className="w-4 h-4 icon-hover" />
                        </Button>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-blue-600 font-medium">({product.reviews})</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">ETB {product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">ETB {product.originalPrice}</span>
                            )}
                          </div>
                          {product.freeShipping && <p className="text-xs text-green-600 font-medium">FREE delivery</p>}
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="w-full bg-orange-accent hover:bg-orange-accent/90 text-white text-xs py-2 font-medium ripple-button neumorphic-button"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                    <Badge className="bg-orange-500 text-white px-2 py-1 text-xs animate-pulse">Hot</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 font-medium interactive-link"
                    onClick={handleShowAllTrending}
                  >
                    See all trending
                    <ChevronRight className="w-4 h-4 ml-1 icon-hover" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {trendingProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group product-card neumorphic-card"
                    >
                      <div className="flex gap-4 p-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform"
                          />
                          {product.originalPrice && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 font-bold">
                              Sale
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-blue-600 font-medium">({product.reviews})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">ETB {product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">ETB {product.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-xs text-green-600 font-medium">FREE delivery tomorrow</p>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="bg-orange-accent hover:bg-orange-accent/90 text-white font-medium ripple-button neumorphic-button"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 px-4 bg-gray-50">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 neumorphic-card"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {feature.icon && <feature.icon className="h-6 w-6 text-purple-600 icon-hover" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {showProducts && (
            <section className="py-8 px-4">
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category === null
                        ? "All Products"
                        : category === "Flash Sale"
                          ? "Flash Sale Products"
                          : category === "Trending"
                            ? "Trending Products"
                            : category === "Top Rated"
                              ? "Top Rated Products"
                              : `${category} Products`}
                    </h2>
                    <Badge className="bg-blue-500 text-white px-2 py-1 text-xs">
                      {getFilteredProducts().length} items
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                    onClick={() => setShowProducts(false)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Close
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProducts().map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group product-card neumorphic-card"
                    >
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                        />
                        {product.badge && (
                          <Badge
                            className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs px-2 py-1 font-bold`}
                          >
                            {product.badge}
                          </Badge>
                        )}
                        {product.discount && (
                          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 font-bold">
                            -{product.discount}%
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-blue-600 font-medium">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">ETB {product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">ETB {product.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 font-medium">FREE delivery tomorrow</p>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="w-full bg-orange-accent hover:bg-orange-accent/90 text-white font-medium ripple-button neumorphic-button"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="py-8 px-4">
            <div className="container mx-auto">
              <PaymentMethods />
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold mb-4 text-white">Get to Know Us</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      About Abush Store
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Press Releases
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Investor Relations
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-white">Make Money with Us</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Sell on Abush Store
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Become an Affiliate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Advertise Your Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Host a Store
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-white">Payment Products</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      TeleBirr
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      CBE Birr
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Amole
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      HelloCash
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-white">Let Us Help You</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Your Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Your Orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Shipping Rates & Policies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors interactive-link">
                      Help
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/images/logo.png" alt="Abush Store" className="h-8 w-8 rounded-full" />
                <span className="text-xl font-bold">Abush Store</span>
              </div>
              <p className="text-sm text-gray-400">© 2025 Abush Store. All rights reserved. Made with ❤️ in Ethiopia.</p>
            </div>
          </div>
        </footer>

        <ProductModal
          isOpen={showDealsModal}
          onClose={closeModal}
          title="All Deals"
          products={getCurrentProducts()}
          totalPages={getTotalPages()}
        />

        <ProductModal
          isOpen={showFeaturedModal}
          onClose={closeModal}
          title="Featured Products"
          products={getCurrentProducts()}
          totalPages={getTotalPages()}
        />

        <ProductModal
          isOpen={showTrendingModal}
          onClose={closeModal}
          title="Trending Products"
          products={getCurrentProducts()}
          totalPages={getTotalPages()}
        />

        {/* Products Modal */}
        <ProductsModal
          isOpen={showProducts}
          onClose={() => setShowProducts(false)}
          category={category}
          products={products}
        />

        {showCart && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden neumorphic-card animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
                  Shopping Cart ({getTotalItems()} items)
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCart(false)}
                  className="hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto max-h-96 p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-2">Add some products to get started</p>
                    <Button
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => {
                        setShowCart(false)
                        // Scroll to featured products
                        setTimeout(() => {
                          const featuredSection = document.querySelector("[data-featured-products]")
                          if (featuredSection) {
                            featuredSection.scrollIntoView({ behavior: "smooth", block: "start" })
                          }
                        }, 100)
                      }}
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-purple-600 font-bold">ETB {item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total: ETB {getTotalPrice()}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setShowCart(false)} className="flex-1">
                      Continue Shopping
                    </Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Checkout</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
