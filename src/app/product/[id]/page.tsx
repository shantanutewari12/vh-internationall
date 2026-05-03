"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { useCart } from "@/components/cart-context";
import { ArrowLeft, ShoppingBag, Heart, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { Footer } from "@/components/ui/footer";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <main className="min-h-screen bg-cream-50 pt-40 pb-20 px-8 flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <Link href="/collections" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold mb-16 text-charcoal/40 hover:text-brass transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Left: Images */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative aspect-[3/4] bg-cream-100 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]"
            >
              <Image
                src={product.images[selectedImage] || "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=1000&auto=format&fit=crop"}
                alt={product.name}
                fill
                className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            
            {product.images.length > 1 && (
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-24 h-32 rounded-2xl overflow-hidden border-2 transition-all duration-500 flex-shrink-0 ${
                      selectedImage === i ? "border-brass scale-105 shadow-lg" : "border-transparent opacity-40 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={product.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            <div className="overflow-hidden mb-6">
              <p className="text-brass font-bold uppercase tracking-[0.5em] text-[10px] animate-slide-up">{(product as any).category || "Artisanal Collection"}</p>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-serif mb-8 text-charcoal leading-[0.9] tracking-tighter">{product.name}</h1>
            <p className="text-4xl font-serif text-brass mb-12 tracking-tight italic">₹{product.price.toLocaleString()}</p>
            
            <div className="prose prose-lg text-foreground/50 mb-16 font-light leading-relaxed max-w-lg">
              <p>{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-16 py-12 border-y border-charcoal/5">
              {[
                { label: "Material", value: "High-Purity Artisan Brass" },
                { label: "Technique", value: "Ancient Sand Casting" },
                { label: "Finish", value: "Hand-Burnished Luster" },
                { label: "Origin", value: "Heritage Moradabad" }
              ].map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-foreground/30 mb-2 font-bold">{spec.label}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-charcoal">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
              <button 
                onClick={() => addToCart(product)}
                className="flex-grow bg-charcoal text-white py-8 rounded-full uppercase tracking-[0.3em] text-xs font-bold hover:bg-brass transition-all duration-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4 group"
              >
                Add to Bag <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-8 rounded-full border border-charcoal/10 hover:bg-white hover:border-brass hover:text-brass transition-all duration-700 shadow-sm group">
                <Heart size={20} className="group-hover:fill-current" />
              </button>
            </div>

            {/* Badges */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/40">
                <Shield size={18} className="text-brass" /> 2-Year Artisanal Warranty
              </div>
              <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/40">
                <RotateCcw size={18} className="text-brass" /> 30-Day Heritage Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
