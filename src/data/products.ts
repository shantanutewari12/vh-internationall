export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: "Pooja & Spiritual" | "Home Decor" | "Kitchen & Dining" | "Luxury & Antique" | "Furniture & Lifestyle" | "Jewelry & Accessories";
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // POOJA & SPIRITUAL
  {
    id: "brass-deepak-peacock",
    name: "Peacock Stand Deepak",
    price: 3850,
    description: "Handcrafted brass oil lamp with stand featuring intricate peacock figurines. A masterpiece for your temple.",
    images: ["/images/peacock_deepak_1777830890306.png"],
    category: "Pooja & Spiritual",
    featured: true
  },
  {
    id: "brass-laxmi-diya",
    name: "Laxmi Idol Brass Diya",
    price: 2450,
    description: "Sacred brass oil lamp featuring Goddess Laxmi, the symbol of wealth and prosperity.",
    images: ["/images/laxmi_diya_1777829082154.png"],
    category: "Pooja & Spiritual"
  },
  {
    id: "panchaarti-royal",
    name: "Royal Panchaarti Lamp",
    price: 3200,
    description: "Five-wicked traditional brass lamp for grand ceremonies and daily rituals.",
    images: ["/images/panchaarti_lamp_1777829096840.png"],
    category: "Pooja & Spiritual"
  },
  {
    id: "dhoopdaan-lattice",
    name: "Lattice Brass Dhoopdaan",
    price: 2100,
    description: "Incense burner with intricate lattice work for spreading spiritual fragrance.",
    images: ["/images/lattice_dhoopdaan_1777829143248.png"],
    category: "Pooja & Spiritual"
  },
  {
    id: "akhand-jyote-eternal",
    name: "Eternal Akhand Jyote",
    price: 2400,
    description: "Glass-covered brass lamp designed for continuous illumination during festivals.",
    images: ["/images/akhand_jyote_1777829113124.png"],
    category: "Pooja & Spiritual"
  },
  {
    id: "kerala-deep-tall",
    name: "Tall Kerala Brass Deep",
    price: 8500,
    description: "Traditional tall brass oil lamp from Kerala, symbolizing purity and light.",
    images: ["/images/kerala_deep_1777829128108.png"],
    category: "Pooja & Spiritual",
    featured: true
  },
  {
    id: "brass-jingle-bell",
    name: "Sacred Temple Jingle Bell",
    price: 1500,
    description: "Rhythmic brass bell with a clear, resonant sound for spiritual invocation.",
    images: ["/images/temple_bell_1777829161754.png"],
    category: "Pooja & Spiritual"
  },

  // HOME DECOR
  {
    id: "peacock-wall-hanging",
    name: "Peacock Brass Wall Hanging",
    price: 12500,
    description: "A grand statement piece featuring a large, ornate peacock for your wall decor.",
    images: ["/images/peacock_wall_hanging_1777830909267.png"],
    category: "Home Decor",
    featured: true
  },
  {
    id: "brass-peacock-kalash",
    name: "Peacock Kalash Pair",
    price: 6800,
    description: "A beautiful pair of hanging brass kalash with peacock motifs.",
    images: ["/images/peacock_kalash_1777829177877.png"],
    category: "Home Decor"
  },
  {
    id: "brass-flower-vase-antique",
    name: "Antique Engraved Vase",
    price: 5200,
    description: "Ornate brass vase with hand-carved details, perfect for premium settings.",
    images: ["/images/antique_vase_1777830926266.png"],
    category: "Home Decor"
  },
  {
    id: "ganesh-idol-floral",
    name: "Floral Ganesh Figurine",
    price: 8500,
    description: "Graceful brass Ganesha idol surrounded by artistic floral patterns.",
    images: ["https://images.pexels.com/photos/21383559/pexels-photo-21383559.jpeg"],
    category: "Home Decor",
    featured: true
  },
  {
    id: "brass-swan-duo",
    name: "Graceful Brass Swan Duo",
    price: 4200,
    description: "A pair of elegant brass swans representing grace and beauty.",
    images: ["/images/brass_swan_1777829194021.png"],
    category: "Home Decor"
  },
  {
    id: "antique-brass-urli",
    name: "Handcrafted Brass Urli",
    price: 7500,
    description: "Traditional brass urli for floating flowers and candles in your home entrance.",
    images: ["/images/brass_urli_1777830944996.png"],
    category: "Home Decor"
  },
  {
    id: "brass-elephant-statue",
    name: "Regal Elephant Statue",
    price: 15500,
    description: "A majestic brass elephant statue, hand-carved with traditional Indian motifs.",
    images: ["/images/elephant_statue_1777829208416.png"],
    category: "Home Decor",
    featured: true
  },
  {
    id: "brass-cow-calf",
    name: "Sacred Cow & Calf",
    price: 5800,
    description: "Traditional Kamadhenu cow and calf statue in pure brass.",
    images: ["/images/cow_calf_1777829221497.png"],
    category: "Home Decor"
  }
];
