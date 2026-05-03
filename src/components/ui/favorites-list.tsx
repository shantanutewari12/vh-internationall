"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/components/favorites-context";
import { useCart } from "@/components/cart-context";
import { Trash2, ShoppingBag, HeartCrack } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FavoritesList() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-[400px]">
        <HeartCrack size={48} className="text-charcoal/20 mb-6" />
        <h3 className="text-2xl font-serif text-charcoal mb-2">No Favorites Yet</h3>
        <p className="text-gray-500 font-light max-w-sm mx-auto mb-8">
          You haven't saved any artifacts to your collection yet.
        </p>
        <Link href="/collections" className="bg-charcoal text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brass transition-all duration-500">
          Discover Artifacts
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <AnimatePresence>
        {favorites.map((product) => (
          <motion.div 
            key={product.id} 
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-brass/30 transition-all duration-500"
          >
            <div className="relative w-full sm:w-28 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-cream-100 shadow-inner">
              <Image
                src={product.images?.[0] || product.image || ""}
                alt={product.name}
                fill
                sizes="120px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="flex-grow w-full text-center sm:text-left">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-brass mb-1">{product.category || "Artisanal"}</p>
              <h4 className="font-serif text-xl text-charcoal mb-2">{product.name}</h4>
              <p className="text-charcoal font-black">₹{product.price.toLocaleString()}</p>
            </div>
            
            <div className="flex sm:flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0 justify-center">
              <button
                onClick={() => addToCart(product)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-white rounded-full hover:bg-brass transition-colors text-[10px] uppercase tracking-widest font-bold flex-1 sm:flex-none"
              >
                <ShoppingBag size={14} /> <span className="sm:hidden">Add to Cart</span>
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors flex-1 sm:flex-none"
                title="Remove from Favorites"
              >
                <Trash2 size={14} /> <span className="sm:hidden">Remove</span>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
