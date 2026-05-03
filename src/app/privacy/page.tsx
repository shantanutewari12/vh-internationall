import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream-50 flex flex-col pt-40">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 text-charcoal">Privacy <span className="italic text-brass">Policy</span></h1>
        <p className="text-lg text-foreground/60 leading-relaxed font-light mb-8">
          Your privacy is treated with the same meticulous care as our artifacts. We secure your data using modern encryption and will never share your personal information with third parties outside of essential shipping and payment partners.
        </p>
      </div>
      <Footer />
    </main>
  );
}
