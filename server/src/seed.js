const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sweetsData = [
  // Laddus
  { name: 'Besan Laddu', category: 'Laddus', price: 25, quantity: 100 },
  { name: 'Motichoor Laddu', category: 'Laddus', price: 30, quantity: 90 },
  { name: 'Boondi Laddu', category: 'Laddus', price: 20, quantity: 110 },

  // Barfis
  { name: 'Kaju Katli', category: 'Barfis', price: 40, quantity: 80 },
  { name: 'Coconut Barfi', category: 'Barfis', price: 25, quantity: 100 },
  { name: 'Badam Barfi', category: 'Barfis', price: 35, quantity: 70 },

  // Halwas
  { name: 'Gajar Halwa', category: 'Halwas', price: 30, quantity: 60 },
  { name: 'Sooji Halwa', category: 'Halwas', price: 20, quantity: 90 },
  { name: 'Moong Dal Halwa', category: 'Halwas', price: 35, quantity: 50 },

  // Milk-based Sweets
  { name: 'Rasgulla', category: 'Milk-based', price: 15, quantity: 150 },
  { name: 'Rasmalai', category: 'Milk-based', price: 35, quantity: 70 },
  { name: 'Sandesh', category: 'Milk-based', price: 25, quantity: 80 },
  { name: 'Cham Cham', category: 'Milk-based', price: 20, quantity: 100 },
  { name: 'Kalakand', category: 'Milk-based', price: 30, quantity: 90 },

  // Deep-Fried Sweets
  { name: 'Jalebi', category: 'Deep-Fried', price: 15, quantity: 120 },
  { name: 'Imarti', category: 'Deep-Fried', price: 20, quantity: 100 },
  { name: 'Balushahi', category: 'Deep-Fried', price: 25, quantity: 80 },
  { name: 'Malpua', category: 'Deep-Fried', price: 30, quantity: 60 },

  // Bengali Sweets
  { name: 'Mishti Doi', category: 'Bengali', price: 25, quantity: 90 },
  { name: 'Chhena Murki', category: 'Bengali', price: 20, quantity: 100 },
  { name: 'Rajbhog', category: 'Bengali', price: 30, quantity: 70 },
  { name: 'Kheer Kadam', category: 'Bengali', price: 35, quantity: 60 },

  // Dry Fruit Sweets
  { name: 'Anjeer Rolls', category: 'Dry Fruit', price: 50, quantity: 40 },
  { name: 'Khajur Pak', category: 'Dry Fruit', price: 45, quantity: 50 },
  { name: 'Dry Fruit Katli', category: 'Dry Fruit', price: 55, quantity: 35 },

  // Sugar-Free
  { name: 'Sugar-Free Barfi', category: 'Sugar-Free', price: 40, quantity: 50 },
  { name: 'Low-calorie Laddu', category: 'Sugar-Free', price: 35, quantity: 60 },
  { name: 'Protein Modak', category: 'Sugar-Free', price: 45, quantity: 40 }
];

async function main() {
  console.log('Seeding Indian sweets...');

  for (const sweet of sweetsData) {
    await prisma.sweets.create({
      data: {
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity
      }
    });
  }

  console.log('Seeding completed!');


  console.log('Inserting Admin...');

  await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Admin',
      email: 'admin@sweetshop.com',
      password: 'admin123',
      role: 'admin'
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log('Admin inserted:', data);
    })
    .catch(err => {
      console.error('Error inserting admin:', err);
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
