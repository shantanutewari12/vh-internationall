"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { useCart } from "@/components/cart-context";
import { ShoppingBag, Menu, User, X, Heart } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@/components/clerk-compatibility";
import { FavoritesList } from "@/components/ui/favorites-list";

export function Navbar() {
  const { totalItems } = useCart();
  const { isLoaded, isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? "bg-cream-50/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"
    }`}>
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-3 items-center text-black">
        
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-4 group transform transition-all duration-700 hover:scale-105">
            <Logo className="w-10 h-10" />
            <span className="font-serif text-[12px] tracking-[0.4em] uppercase text-charcoal font-black whitespace-nowrap hidden sm:block">VH INTERNATIONAL</span>
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center justify-center gap-10 text-[9px] uppercase tracking-[0.3em] font-bold">
          <Link href="/" className="hover:text-brass hover:-translate-y-0.5 transition-all duration-300">Home</Link>
          <Link href="/collections" className="hover:text-brass hover:-translate-y-0.5 transition-all duration-300">Collections</Link>
          <Link href="/the-craft" className="hover:text-brass hover:-translate-y-0.5 transition-all duration-300">The Craft</Link>
          <Link href="/about" className="hover:text-brass hover:-translate-y-0.5 transition-all duration-300">Our Story</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-6 justify-end">
          <div className="flex items-center gap-2 sm:gap-4">
            {isLoaded ? (
              isSignedIn ? (
                <UserButton>
                  <UserButton.UserProfilePage
                    label="Favorites"
                    labelIcon={<Heart size={16} />}
                    url="favorites"
                  >
                    <FavoritesList />
                  </UserButton.UserProfilePage>
                  <UserButton.UserProfilePage
                    label="Order History"
                    labelIcon={<ShoppingBag size={16} />}
                    url="orders"
                  >
                    <div className="p-8 text-center h-[300px] flex flex-col items-center justify-center">
                      <ShoppingBag size={48} className="text-charcoal/20 mb-4" />
                      <h3 className="text-2xl font-serif text-charcoal mb-2">No Past Orders</h3>
                      <p className="text-gray-500 font-light max-w-sm mx-auto">You haven't made any purchases yet. Your future heirloom awaits.</p>
                      <Link href="/collections" className="mt-8 bg-charcoal text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brass transition-all duration-500">
                        Explore Collection
                      </Link>
                    </div>
                  </UserButton.UserProfilePage>
                </UserButton>
              ) : (
                <SignInButton mode="modal">
                  <button className="p-2 hover:text-brass transition-colors" title="Sign In">
                    <User size={18} />
                  </button>
                </SignInButton>
              )
            ) : (
              <div className="w-8 h-8 rounded-full bg-black/5 animate-pulse" />
            )}
          </div>

          <Link href="/cart" className="relative p-2 hover:text-brass transition-colors group">
            <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brass text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden p-1 sm:p-2 hover:text-brass transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-cream-50 z-[110] transition-transform duration-700 md:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <Logo className="w-12 h-12" />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 sm:gap-8 text-3xl sm:text-4xl font-serif">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
            <Link href="/the-craft" onClick={() => setIsMobileMenuOpen(false)}>The Craft</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          </div>

          <div className="mt-auto py-8 border-t border-black/10">
            {isLoaded && !isSignedIn && (
              <SignInButton mode="modal">
                <button className="w-full bg-black text-white py-4 rounded-full uppercase tracking-widest text-sm">
                  Sign In
                </button>
              </SignInButton>
            )}
            {isSignedIn && (
              <div className="flex items-center gap-4">
                <UserButton showName />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
