"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8 py-20">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-100">
            <Image
              src={product.images[0] || "/hero.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full bg-white/90 backdrop-blur-md py-4 uppercase tracking-[0.2em] text-xs font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-brass hover:text-white">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-serif tracking-tight">{product.name}</h3>
              <p className="text-sm text-foreground/50 italic mt-1">{product.description.slice(0, 50)}...</p>
            </div>
            <p className="text-lg font-medium text-brass">£{product.price}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
