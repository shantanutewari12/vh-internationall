import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-50 flex flex-col pt-40">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 text-charcoal">Our <span className="italic text-brass">Heritage</span></h1>
        <p className="text-lg text-foreground/60 leading-relaxed font-light">
          Rooted in the ancient traditions of Moradabad, the Brass City of India, VH International has been crafting exquisite brass artifacts for generations. Our journey is one of preserving timeless artistry while embracing modern elegance.
        </p>
      </div>
      <Footer />
    </main>
  );
}
