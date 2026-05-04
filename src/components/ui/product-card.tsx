"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useCart } from "@/components/cart-context";
import { useFavorites } from "@/components/favorites-context";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import Link from "next/link";

import { Product } from "@/data/products";

export const ProductCard = React.memo(function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorited = isFavorite(product.id);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnter = () => {
      gsap.to(imageRef.current, { scale: 1.1, duration: 0.6, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // GSAP spring animation for the heart icon
    if (heartRef.current) {
      gsap.fromTo(heartRef.current, 
        { scale: 0.8 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
      );
    }
    
    toggleFavorite(product);
  };

  return (
    <div ref={cardRef} className="group relative bg-transparent overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
        <div ref={imageRef} className="relative h-full w-full">
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=1000&auto=format&fit=crop"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-6 backdrop-blur-[2px]">
          <button 
            onClick={() => addToCart(product)}
            className="bg-white text-charcoal px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brass hover:text-white transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
          >
            Add to Bag
          </button>
          <Link 
            href={`/product/${product.id}`}
            className="text-white text-[10px] uppercase tracking-widest font-bold border-b border-white pb-1 hover:text-brass hover:border-brass transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            Quick View
          </Link>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-full text-[8px] uppercase tracking-[0.2em] font-bold shadow-sm">
            {(product as any).category || "Artisanal"}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          ref={heartRef}
          onClick={handleFavoriteClick}
          className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm z-10 ${
            favorited ? "bg-white/90 text-red-500" : "bg-charcoal/40 text-white hover:bg-white/90 hover:text-red-500"
          }`}
          title={favorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={18} fill={favorited ? "currentColor" : "none"} className={favorited ? "text-red-500" : ""} />
        </button>
      </div>

      <div className="py-6 sm:py-8 px-2 text-center">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-charcoal mb-2 sm:mb-3 tracking-tight group-hover:text-brass transition-colors duration-500">{product.name}</h3>
        <p className="text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-brass mb-3 sm:mb-4">₹{product.price.toLocaleString()}</p>
        <p className="text-[10px] sm:text-xs text-foreground/40 font-light leading-relaxed max-w-[250px] mx-auto line-clamp-2 italic opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {product.description}
        </p>
      </div>
    </div>
  );
});
