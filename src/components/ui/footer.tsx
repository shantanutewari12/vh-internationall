import Link from "next/link";
import { Logo } from "./logo";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-[#1a1a1a] text-[#f7f3eb] pt-12 md:pt-20 pb-8 md:pb-10 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-12 md:mb-20">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 text-brass flex-shrink-0" />
            <span className="font-serif text-2xl tracking-widest uppercase">VH International</span>
          </div>
          <p className="text-sm text-cream-50/60 leading-relaxed max-w-xs">
            Exquisite handcrafted brass artifacts that blend timeless Indian heritage with modern elegance. Bringing the golden touch to your home.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brass transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-brass transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-brass transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg mb-6 uppercase tracking-widest text-brass">Shop</h4>
          <ul className="space-y-4 text-sm text-cream-50/70">
            <li><Link href="/collections?category=Home Decor" className="hover:text-white transition-colors block">Home Decor</Link></li>
            <li><Link href="/collections?category=Pooja & Spiritual" className="hover:text-white transition-colors block">Pooja & Spiritual</Link></li>
            <li><Link href="/collections?category=Kitchen & Dining" className="hover:text-white transition-colors block">Kitchen & Dining</Link></li>
            <li><Link href="/collections?category=Luxury & Antique" className="hover:text-white transition-colors block">Luxury & Antiques</Link></li>
          </ul>
        </div>

        {/* About & Support */}
        <div>
          <h4 className="font-serif text-lg mb-6 uppercase tracking-widest text-brass">Information</h4>
          <ul className="space-y-4 text-sm text-cream-50/70">
            <li><Link href="/about" className="hover:text-white transition-colors block">Our Heritage</Link></li>
            <li><Link href="/the-craft" className="hover:text-white transition-colors block">The Craft</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors block">Shipping & Returns</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors block">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg mb-6 uppercase tracking-widest text-brass">Get in Touch</h4>
          <div className="space-y-4 text-sm text-cream-50/70">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-brass flex-shrink-0 mt-1" />
              <span>Moradabad, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-brass flex-shrink-0" />
              <span>9368042721</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-brass flex-shrink-0" />
              <span className="break-all">shantanitiwari12@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-cream-50/30 text-center md:text-left">
        <p>© 2026 VH INTERNATIONAL BRASS EMPORIUM. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <span>Designed for Excellence</span>
          <span>Sourced with Integrity</span>
        </div>
      </div>
    </footer>
  );
}
