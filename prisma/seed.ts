const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Home Decor" },
    { name: "Pooja & Spiritual" },
    { name: "Kitchen & Dining" },
    { name: "Luxury & Antique" },
    { name: "Furniture & Lifestyle" },
    { name: "Jewelry & Accessories" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  const homeDecor = await prisma.category.findUnique({ where: { name: "Home Decor" } });

  const products = [
    {
      name: "Brass Peacock Wall Hanging",
      description: "Intricately handcrafted brass peacock wall hanging for a royal touch.",
      price: 149.99,
      images: ["/hero.png"],
      categoryId: homeDecor.id,
    },
    {
      name: "Vintage Brass Flower Vase",
      description: "Antique finished brass vase with traditional engravings.",
      price: 89.99,
      images: ["/hero.png"],
      categoryId: homeDecor.id,
    },
    // Add more products here...
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seed successful!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
