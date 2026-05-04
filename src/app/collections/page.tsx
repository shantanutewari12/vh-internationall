"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { ProductCard } from "@/components/ui/product-card";
import { Search, Filter, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Home Decor",
  "Pooja & Spiritual",
  "Kitchen & Dining",
  "Luxury & Antique",
  "Furniture & Lifestyle",
  "Jewelry & Accessories"
];

import { PRODUCTS } from "@/data/products";
import { Footer } from "@/components/ui/footer";

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"none" | "low-high" | "high-low">("none");

  const filteredProducts = activeCategory === "All" 
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const toggleSort = () => {
    if (sortOrder === "none") setSortOrder("low-high");
    else if (sortOrder === "low-high") setSortOrder("high-low");
    else setSortOrder("none");
  };

  const getSortLabel = () => {
    if (sortOrder === "low-high") return "Price: Low to High";
    if (sortOrder === "high-low") return "Price: High to Low";
    return "Sort By";
  };

  return (
    <main className="min-h-screen bg-cream-50 pt-24 md:pt-32 pb-10 md:pb-20 px-6 md:px-8 flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <h1 className="text-5xl md:text-[10rem] font-serif mb-4 md:mb-6 tracking-tighter leading-none">Collections</h1>
          <p className="text-xs md:text-sm text-brass uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold">Curation of Heritage • Series 01</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 mb-12 md:mb-20 border-b border-charcoal/10 pb-8 md:pb-12">
          <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat 
                    ? "bg-charcoal text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]" 
                    : "bg-white text-charcoal hover:bg-cream-100 border border-charcoal/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40">
            <button 
              onClick={toggleSort}
              className={`flex items-center gap-3 transition-colors group ${sortOrder !== "none" ? "text-brass" : "hover:text-brass"}`}
            >
              {getSortLabel()} <ChevronDown size={12} className={`group-hover:translate-y-0.5 transition-transform ${sortOrder !== "none" && "rotate-180"}`} />
            </button>
            <div className="flex items-center gap-3 cursor-pointer hover:text-brass transition-colors group">
              Filter <Filter size={12} />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-24 mb-20 md:mb-32">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-60 text-center">
            <h3 className="text-4xl font-serif text-charcoal/20 italic">No pieces found in this category.</h3>
            <button onClick={() => setActiveCategory("All")} className="mt-8 text-brass uppercase tracking-widest text-xs font-bold border-b border-brass pb-1">Show All Products</button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
