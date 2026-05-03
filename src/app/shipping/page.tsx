import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-cream-50 flex flex-col pt-40">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 text-charcoal">Shipping & <span className="italic text-brass">Returns</span></h1>
        <p className="text-lg text-foreground/60 leading-relaxed font-light mb-8">
          We offer complimentary legacy shipping globally. All artifacts are securely packaged in custom-fitted wooden crates to ensure their pristine arrival. If a piece does not resonate with your space, we accept returns within 14 days of delivery.
        </p>
      </div>
      <Footer />
    </main>
  );
}
