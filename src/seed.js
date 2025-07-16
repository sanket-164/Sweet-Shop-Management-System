const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sweetsData = [
  // Chocolate
  { name: 'Classic Milk Chocolate', category: 'Chocolate', price: 2.50, quantity: 100 },
  { name: 'Dark Delight', category: 'Chocolate', price: 3.00, quantity: 80 },
  { name: 'White Chocolate Dream', category: 'Chocolate', price: 2.75, quantity: 90 },
  { name: 'Hazelnut Crunch', category: 'Chocolate', price: 3.50, quantity: 70 },
  { name: 'Caramel Filled Bar', category: 'Chocolate', price: 3.20, quantity: 60 },

  // Candy
  { name: 'Sour Gummy Worms', category: 'Candy', price: 1.50, quantity: 120 },
  { name: 'Fruit Chewy Mix', category: 'Candy', price: 1.20, quantity: 150 },
  { name: 'Mint Hard Candy', category: 'Candy', price: 1.00, quantity: 200 },
  { name: 'Lollipop Swirl', category: 'Candy', price: 0.80, quantity: 180 },
  { name: 'Rainbow Jelly Beans', category: 'Candy', price: 1.30, quantity: 140 },

  // Pastry
  { name: 'Chocolate Croissant', category: 'Pastry', price: 2.20, quantity: 50 },
  { name: 'Vanilla Cream Puff', category: 'Pastry', price: 2.00, quantity: 45 },
  { name: 'Strawberry Danish', category: 'Pastry', price: 2.50, quantity: 40 },
  { name: 'Apple Turnover', category: 'Pastry', price: 2.30, quantity: 55 },
  { name: 'Blueberry Muffin', category: 'Pastry', price: 2.10, quantity: 60 },

  // Cookie
  { name: 'Chocolate Chip Cookie', category: 'Cookie', price: 1.80, quantity: 100 },
  { name: 'Oatmeal Raisin Cookie', category: 'Cookie', price: 1.60, quantity: 110 },
  { name: 'Peanut Butter Cookie', category: 'Cookie', price: 1.70, quantity: 90 },
  { name: 'Sugar Sprinkle Cookie', category: 'Cookie', price: 1.50, quantity: 120 }
];

async function main() {
  console.log('Seeding sweets...');

  for (const sweet of sweetsData) {
    await prisma.sweet.upsert({
      where: {
        name_category: {
          name: sweet.name,
          category: sweet.category
        }
      },
      update: {
        price: sweet.price * 10,
        quantity: sweet.quantity
      },
      create: sweet
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
