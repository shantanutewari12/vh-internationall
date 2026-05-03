"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { ProductCard } from "@/components/ui/product-card";
import { Footer } from "@/components/ui/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ArrowRight, Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 3);

  useEffect(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.to(".hero-title span", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
    })
    .to(".hero-subtitle", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=1");

    // Reveal animations on scroll
    gsap.utils.toArray(".reveal-text").forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Parallax effect for hero
    gsap.to(".hero-image", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 200,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="bg-cream-50 overflow-hidden" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="hero-image relative h-[120%] w-full">
            <Image
              src="/hero.png"
              alt="Background"
              fill
              sizes="100vw"
              className="object-cover grayscale-[0.1]"
              priority
            />
            <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-[1px]" />
          </div>
        </div>
        
        <div className="relative z-10 text-center text-white px-8">
          <p className="hero-subtitle text-[10px] uppercase tracking-[0.6em] mb-8 font-bold text-brass drop-shadow-lg opacity-0 translate-y-5">
            Est. 1974 • Artisanal Excellence
          </p>
          <h1 className="hero-title text-[8rem] md:text-[18rem] font-serif leading-[0.8] tracking-tighter mb-12 flex flex-col items-center">
            <span className="inline-block opacity-0 translate-y-24">VH</span>
            <span className="inline-block italic text-brass -mt-4 md:-mt-10 opacity-0 translate-y-24">LEGACY</span>
          </h1>
          <div className="hero-subtitle flex flex-col md:flex-row items-center justify-center gap-10 mt-12 opacity-0 translate-y-5">
            <Link 
              href="/collections" 
              className="bg-white text-charcoal px-12 py-6 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-brass hover:text-white transition-all duration-700 shadow-2xl"
            >
              The 2026 Collection
            </Link>
            <Link 
              href="/about" 
              className="text-white text-[10px] uppercase tracking-widest font-bold border-b border-white pb-2 hover:text-brass hover:border-brass transition-all duration-500"
            >
              Our Heritage Story
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-60 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="reveal-text">
            <p className="text-brass tracking-[0.4em] uppercase text-[10px] font-bold mb-8 italic">The VH Philosophy</p>
            <h2 className="text-6xl md:text-8xl font-serif mb-12 text-charcoal leading-none">Metal with <br /><span className="italic">Soul</span></h2>
            <p className="text-xl text-foreground/50 leading-relaxed font-light mb-10 max-w-md">
              We believe that every brass artifact is a vessel of history. In our Moradabad furnaces, we blend ancient "Thathera" casting techniques with a modern editorial aesthetic.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-px w-20 bg-brass" />
              <p className="text-sm font-serif italic text-charcoal/60">Crafted for the sophisticated home.</p>
            </div>
          </div>
          <div className="reveal-text relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
            <Image
              src="/craft.png"
              alt="Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brass/5 mix-blend-overlay" />
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-40 bg-charcoal rounded-[4rem] mx-4 md:mx-10 my-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="reveal-text">
              <p className="text-brass tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Selected Pieces</p>
              <h2 className="text-6xl md:text-9xl font-serif text-cream-50 leading-none">Signature <br /><span className="italic">Artifacts</span></h2>
            </div>
            <Link 
              href="/collections" 
              className="reveal-text text-cream-50/60 hover:text-brass text-[10px] uppercase tracking-widest font-bold border-b border-cream-50/20 pb-2 transition-all flex items-center gap-3 mb-4 group"
            >
              View Full Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-60 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-brass tracking-[0.4em] uppercase text-[10px] font-bold mb-12">The Voice of Heritage</p>
          <div className="relative">
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-20 text-brass/10 w-40 h-40" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { name: "Arjun Sharma", role: "Interior Architect", text: "The weight and finish of VH brass is unlike anything else. It brings a soul to modern minimalism." },
                { name: "Priya Mehra", role: "Collector", text: "Truly artisanal. You can see the hammer marks and the hand of the maker in every single piece." },
                { name: "Vikram Gupta", role: "Hotelier", text: "We curated our flagship lobby with VH statues. The reaction from guests has been extraordinary." }
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-brass text-brass" />)}
                  </div>
                  <p className="text-xl text-charcoal/80 font-serif leading-relaxed mb-8 italic">"{t.text}"</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mt-2">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Big Call to Action */}
      <section className="h-[90vh] relative overflow-hidden flex items-center justify-center mx-4 md:mx-10 mb-10 rounded-[4rem]">
        <Image
          src="/hero.png"
          alt="CTA Background"
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[3px]" />
        <div className="relative z-10 text-center text-white px-8 max-w-4xl">
          <h2 className="text-6xl md:text-[12rem] font-serif mb-12 leading-none tracking-tighter">THE <span className="italic text-brass">GOLDEN</span> LEGACY</h2>
          <p className="text-xl md:text-2xl font-light text-cream-50/60 mb-16 leading-relaxed max-w-2xl mx-auto italic">
            Become a part of the VH story. Join thousands of connoisseurs who celebrate the art of high-end brass.
          </p>
          <Link 
            href="/collections" 
            className="inline-flex items-center gap-6 bg-brass text-white px-16 py-8 rounded-full text-xs uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-charcoal transition-all duration-700 shadow-2xl group"
          >
            Start Your Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
