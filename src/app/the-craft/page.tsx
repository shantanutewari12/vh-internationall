import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function TheCraftPage() {
  return (
    <main className="min-h-screen bg-cream-50 flex flex-col pt-40">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 text-charcoal">The <span className="italic text-brass">Craft</span></h1>
        <p className="text-lg text-foreground/60 leading-relaxed font-light mb-8">
          Every piece in our collection is born from fire and molded by master artisans. Using traditional sand-casting and lost-wax methods, we ensure that each artifact carries a unique soul, marked by the subtle imperfections of true handcraftsmanship.
        </p>
      </div>
      <Footer />
    </main>
  );
}
