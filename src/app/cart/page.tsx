"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { Navbar } from "@/components/ui/navbar";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, CheckCircle2, Loader2, CreditCard, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { playSuccessChime } from "@/lib/sounds";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [checkoutState, setCheckoutState] = useState<"idle" | "payment_modal" | "processing" | "success">("idle");

  const handleCheckoutClick = () => {
    setCheckoutState("payment_modal");
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutState("processing");
    toast.info("Processing your secure payment...");
    
    setTimeout(() => {
      setCheckoutState("success");
      clearCart();
      toast.success("Payment successful!");
      
      // Trigger sound and visual effects
      playSuccessChime();
      
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#c5a059', '#d4b47d', '#ffffff'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#c5a059', '#d4b47d', '#ffffff'] }));
      }, 250);
      
    }, 3000);
  };

  if (checkoutState === "success") {
    return (
      <main className="min-h-screen bg-cream-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-6 md:px-8 py-24 md:py-40">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.8 }}>
            <CheckCircle2 size={80} className="text-green-600 mb-8 mx-auto w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-serif mb-6 text-charcoal leading-none">Order <span className="italic text-brass">Confirmed</span></h1>
          <p className="text-foreground/50 max-w-md mb-10 md:mb-12 font-light text-base md:text-lg">
            Thank you for trusting VH International. Your artisanal artifacts are being prepared with the utmost care.
          </p>
          <Link 
            href="/collections"
            className="flex items-center gap-4 bg-charcoal text-white px-12 py-6 rounded-full uppercase tracking-widest text-xs hover:bg-brass transition-all duration-700 shadow-2xl"
            onClick={() => setCheckoutState("idle")}
          >
            Continue Exploring <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-cream-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-6 md:px-8 py-24 md:py-40">
          <h1 className="text-5xl md:text-8xl font-serif mb-8 text-charcoal leading-none">Your bag <br />is <span className="italic text-brass">empty</span>.</h1>
          <p className="text-foreground/50 max-w-md mb-10 md:mb-12 font-light text-base md:text-lg">
            Each artifact in our collection is waiting for its story to begin in your home.
          </p>
          <Link 
            href="/collections"
            className="flex items-center gap-4 bg-charcoal text-white px-12 py-6 rounded-full uppercase tracking-widest text-xs hover:bg-brass transition-all duration-700 shadow-2xl"
          >
            Explore Collections <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-50 pt-40 pb-0 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Payment Modal Overlay */}
      <AnimatePresence>
        {(checkoutState === "payment_modal" || checkoutState === "processing") && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-charcoal/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="bg-charcoal text-white p-6 md:p-8 flex justify-between items-center sticky top-0 z-10">
                <div>
                  <h3 className="text-2xl font-serif mb-1">VH Checkout</h3>
                  <p className="text-[10px] uppercase tracking-widest text-brass font-bold">Secure Payment Gateway</p>
                </div>
                {checkoutState !== "processing" && (
                  <button onClick={() => setCheckoutState("idle")} className="hover:text-brass transition-colors">
                    <X size={24} />
                  </button>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-end mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100">
                  <span className="text-gray-500 font-light">Amount to pay</span>
                  <span className="text-3xl md:text-4xl font-serif text-charcoal">₹{totalPrice.toLocaleString()}</span>
                </div>

                {checkoutState === "processing" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Loader2 size={48} className="animate-spin text-brass mb-6" />
                    <h4 className="text-xl font-serif text-charcoal mb-2">Processing Payment</h4>
                    <p className="text-sm text-gray-500">Please do not close this window...</p>
                  </div>
                ) : (
                  <form onSubmit={processPayment} className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal mb-2">Card Information</label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          required
                          placeholder="0000 0000 0000 0000" 
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-all font-mono text-sm"
                          defaultValue="4242 4242 4242 4242"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal mb-2">Expiry Date</label>
                        <input 
                          type="text" 
                          required
                          placeholder="MM/YY" 
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-all font-mono text-sm"
                          defaultValue="12/28"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal mb-2">CVC</label>
                        <input 
                          type="text" 
                          required
                          placeholder="123" 
                          maxLength={3}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-all font-mono text-sm"
                          defaultValue="123"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-charcoal text-white py-4 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-brass transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ShieldCheck size={16} /> Pay ₹{totalPrice.toLocaleString()}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full flex-grow px-6 md:px-8 pb-10 md:pb-20 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4 md:gap-8">
          <div>
            <h1 className="text-5xl md:text-[10rem] font-serif leading-none tracking-tighter">Your Bag</h1>
            <p className="text-brass uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs font-bold mt-2 md:mt-4">Review your selected artifacts</p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40 mt-4 md:mt-0">Total Pieces: {totalItems}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-12">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group flex flex-col md:flex-row items-start gap-6 md:gap-10 p-4 md:p-6 bg-white/50 backdrop-blur-sm rounded-2xl md:rounded-[2rem] border border-white hover:border-brass/30 transition-all duration-500 hover:shadow-xl"
                >
                  <div className="relative w-full md:w-56 h-48 md:h-72 bg-cream-100 rounded-xl md:rounded-3xl overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                    <Image
                      src={item.images?.[0] || item.image || "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=1000&auto=format&fit=crop"}
                      alt={item.name}
                      fill
                      className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between w-full h-full py-2 md:py-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-brass mb-2">{item.category || "Artisanal"}</p>
                        <h3 className="text-2xl md:text-4xl font-serif mb-2 text-charcoal">{item.name}</h3>
                        <p className="text-sm text-foreground/40 font-light leading-relaxed italic max-w-sm">"{item.description}"</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-3 bg-red-50 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-end justify-between mt-6 md:mt-12 w-full">
                      <div className="flex items-center gap-4 md:gap-6 bg-cream-50 px-4 md:px-6 py-2 md:py-3 rounded-full border border-charcoal/5">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="hover:text-brass transition-colors p-1"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold tracking-widest">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:text-brass transition-colors p-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-2xl md:text-4xl font-serif text-charcoal">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl p-6 md:p-12 rounded-2xl md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white sticky top-24 md:top-40">
              <h2 className="text-4xl md:text-5xl font-serif mb-8 md:mb-12 text-charcoal italic">The Total</h2>
              
              <div className="space-y-6 md:space-y-8 text-[10px] uppercase tracking-[0.3em] font-bold">
                <div className="flex justify-between text-charcoal/40">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-black">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal/40">
                  <span>Legacy Shipping</span>
                  <span className="text-green-600">Complimentary</span>
                </div>
                <div className="flex justify-between text-charcoal/40">
                  <span>Customs & Duty</span>
                  <span className="text-charcoal font-black">₹0</span>
                </div>
                <div className="pt-8 md:pt-10 border-t border-charcoal/10 flex justify-between items-end">
                  <span className="text-charcoal/60 text-[10px] uppercase tracking-[0.2em] mb-1 md:mb-2">Grand Total</span>
                  <span className="text-3xl md:text-5xl font-serif text-charcoal tracking-tight">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-charcoal text-white py-6 md:py-8 rounded-full mt-8 md:mt-12 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold hover:bg-brass transition-all duration-700 flex items-center justify-center gap-4 group shadow-xl overflow-hidden relative"
              >
                <span className="flex items-center gap-4 relative z-10">Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></span>
                <div className="absolute inset-0 bg-brass transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-0"></div>
              </button>
              
              <div className="mt-10 pt-8 border-t border-charcoal/5 flex flex-col gap-4 text-center">
                <p className="text-[8px] text-charcoal/30 uppercase tracking-[0.2em] leading-relaxed">
                  Secure Global Checkout • Fully Insured Delivery <br /> Authenticity Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
