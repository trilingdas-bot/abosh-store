"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Menu, MapPin, X, Mail, Lock, LogOut } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { EnhancedSearch } from "./enhanced-search"
import { useState, useEffect } from "react"

interface HeaderProps {
  handleSearch?: (query: string) => void
  getTotalItems?: () => number
  setShowCart?: (show: boolean) => void
  user?: { name: string; email: string } | null
  onLogin?: (user: { name: string; email: string }) => void
  onLogout?: () => void
}

export function Header({ handleSearch, getTotalItems, setShowCart, user, onLogin, onLogout }: HeaderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" })

  useEffect(() => {
    const handleSearchEvent = (event: CustomEvent) => {
      if (handleSearch) {
        handleSearch(event.detail)
      }
    }

    const handleToggleCart = () => {
      if (setShowCart) {
        setShowCart(true)
      }
    }

    const handleCartUpdate = () => {
      if (getTotalItems) {
        setCartItemCount(getTotalItems())
      }
    }

    window.addEventListener("search", handleSearchEvent as EventListener)
    window.addEventListener("toggleCart", handleToggleCart)
    window.addEventListener("cartUpdated", handleCartUpdate)

    if (getTotalItems) {
      setCartItemCount(getTotalItems())
    }

    return () => {
      window.removeEventListener("search", handleSearchEvent as EventListener)
      window.removeEventListener("toggleCart", handleToggleCart)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [handleSearch, getTotalItems, setShowCart])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.email && loginForm.password) {
      const userData = {
        name: loginForm.email.split("@")[0],
        email: loginForm.email,
      }
      onLogin?.(userData)
      setShowLoginModal(false)
      setLoginForm({ email: "", password: "" })
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (signupForm.name && signupForm.email && signupForm.password) {
      const userData = {
        name: signupForm.name,
        email: signupForm.email,
      }
      onLogin?.(userData)
      setShowSignupModal(false)
      setSignupForm({ name: "", email: "", password: "" })
    }
  }

  const handleLogout = () => {
    onLogout?.()
  }

  const getAvatarInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 glassmorphism-navbar rounded-2xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                src="/images/logo.png"
                alt="Abush Store"
                className="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="hidden sm:block">
                <h1 className="font-space-grotesk font-bold text-xl text-foreground transition-colors duration-300 group-hover:text-purple-600">
                  Abush Store
                </h1>
                <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-purple-500">
                  <MapPin className="h-3 w-3 transition-transform duration-300 group-hover:scale-110" />
                  <span>Deliver to Addis Ababa</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <EnhancedSearch
                onSearch={(query) => {
                  if (handleSearch) {
                    handleSearch(query)
                  } else if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("search", { detail: query }))
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative group">
                <LanguageSwitcher />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 scale-110"></div>
              </div>

              {user ? (
                <div className="hidden lg:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 border border-purple-100">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
                      {getAvatarInitials(user.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">Welcome, {user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="neumorphic-button transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-600"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="neumorphic-button text-sm hover:text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-purple-50 relative overflow-hidden group"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="neumorphic-button text-sm hover:text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-purple-50 relative overflow-hidden group"
                    onClick={() => setShowSignupModal(true)}
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                onClick={() => {
                  if (setShowCart) {
                    setShowCart(true)
                  } else if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("toggleCart"))
                  }
                }}
                className="neumorphic-button relative flex items-center gap-2 px-3 group transition-all duration-300 hover:scale-105 hover:bg-purple-50"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 transition-all duration-300 group-hover:text-purple-600 group-hover:scale-110" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-accent text-white text-xs font-bold transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-600">
                    {cartItemCount}
                  </Badge>
                </div>
                <div className="hidden sm:flex flex-col items-start text-xs">
                  <span className="text-muted-foreground transition-colors duration-300 group-hover:text-purple-500">
                    Cart
                  </span>
                </div>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="neumorphic-button lg:hidden transition-all duration-300 hover:scale-105 hover:bg-purple-50 hover:text-purple-600"
                onClick={() => (user ? handleLogout() : setShowLoginModal(true))}
              >
                {user ? (
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-medium">
                    {getAvatarInitials(user.name)}
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="neumorphic-button md:hidden transition-all duration-300 hover:scale-105 hover:bg-purple-50 hover:text-purple-600"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 neumorphic-card animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space-grotesk font-bold text-foreground">Welcome Back</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLoginModal(false)}
                className="hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-purple-600" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="neumorphic-input pl-10 transition-all duration-300 focus:border-purple-300 focus:shadow-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-purple-600" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="neumorphic-input pl-10 transition-all duration-300 focus:border-purple-300 focus:shadow-lg"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Sign In
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-muted-foreground hover:text-purple-600 transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    setShowLoginModal(false)
                    setShowSignupModal(true)
                  }}
                >
                  Don't have an account? Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 neumorphic-card animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space-grotesk font-bold text-foreground">Join Abush Store</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSignupModal(false)}
                className="hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-purple-600" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="neumorphic-input pl-10 transition-all duration-300 focus:border-purple-300 focus:shadow-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-purple-600" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="neumorphic-input pl-10 transition-all duration-300 focus:border-purple-300 focus:shadow-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-purple-600" />
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="neumorphic-input pl-10 transition-all duration-300 focus:border-purple-300 focus:shadow-lg"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Create Account
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-muted-foreground hover:text-purple-600 transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    setShowSignupModal(false)
                    setShowLoginModal(true)
                  }}
                >
                  Already have an account? Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
