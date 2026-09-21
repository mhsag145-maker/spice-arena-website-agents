export type MenuItem = {
  no: number;
  name: string;
  nameUr: string;
  price: number;
  desc: string;
};

export type MenuCategory = {
  slug: string;
  title: string;
  titleUr: string;
  blurb: string;
  image: string;
  items: MenuItem[];
};

export const CDN = "https://spicearena.com.pk/wp-content/uploads";

export const menu: MenuCategory[] = [
  {
    slug: "chinese",
    title: "Chinese Connection",
    titleUr: "چائنیز",
    blurb: "Wok-fired classics with house sauces and live sizzlers.",
    image: `${CDN}/2026/06/chinese-03-s.jpg`,
    items: [
      { no: 101, name: "Chicken Hot & Sour Soup", nameUr: "ہاٹ اینڈ سار سوپ", price: 650, desc: "Bowl, shredded chicken, white pepper." },
      { no: 102, name: "Chicken Manchurian", nameUr: "چکن منچورین", price: 1450, desc: "Glazed chicken, garlic, spring onion." },
      { no: 103, name: "Chicken Chilli Dry", nameUr: "چکن چلی ڈرائی", price: 1550, desc: "Tossed with capsicum and dry red chilli." },
      { no: 104, name: "Beef Black Pepper", nameUr: "بیف بلیک پیپر", price: 1750, desc: "Tender beef strips, cracked pepper sauce." },
      { no: 105, name: "Prawn Garlic Sizzler", nameUr: "پران گارلک سزلر", price: 2250, desc: "Served on a hot plate." },
      { no: 106, name: "Egg Fried Rice", nameUr: "ایگ فرائیڈ رائس", price: 750, desc: "Wok rice, egg, scallion." },
      { no: 107, name: "Chicken Chowmein", nameUr: "چکن چاؤمین", price: 950, desc: "Stir-fried noodles, julienne vegetables." },
    ],
  },
  {
    slug: "royal",
    title: "Traditional Royal Cuisine",
    titleUr: "روایتی دیسی",
    blurb: "Live karahis, slow-cooked handi and charcoal BBQ.",
    image: `${CDN}/2026/06/desi-05-s.jpg`,
    items: [
      { no: 201, name: "Chicken White Karahi (Full)", nameUr: "وائٹ کڑاہی", price: 2650, desc: "Cream, green chilli, fresh ginger." },
      { no: 202, name: "Mutton Karahi (Full)", nameUr: "مٹن کڑاہی", price: 4950, desc: "Tomato based, slow simmered." },
      { no: 203, name: "Chicken Handi", nameUr: "چکن ہانڈی", price: 1850, desc: "Clay-pot gravy, kasuri methi." },
      { no: 204, name: "Seekh Kabab (6 pcs)", nameUr: "سیخ کباب", price: 1250, desc: "Charcoal grilled minced beef." },
      { no: 205, name: "Malai Boti (8 pcs)", nameUr: "ملائی بوٹی", price: 1350, desc: "Creamy marinated chicken cubes." },
      { no: 206, name: "Mutton Biryani", nameUr: "مٹن بریانی", price: 1550, desc: "Layered basmati, raita on the side." },
      { no: 207, name: "Tandoori Roti / Naan", nameUr: "روٹی / نان", price: 90, desc: "Clay oven, freshly baked." },
    ],
  },
  {
    slug: "continental",
    title: "Continental Delicacies",
    titleUr: "کانٹینینٹل",
    blurb: "Grills, pastas and steaks plated with lakeside calm.",
    image: `${CDN}/2026/06/continental-11-s.jpg`,
    items: [
      { no: 301, name: "Grilled Chicken Steak", nameUr: "گرلڈ چکن اسٹیک", price: 1950, desc: "Mushroom or pepper sauce, sautéed vegetables." },
      { no: 302, name: "Beef Tenderloin Steak", nameUr: "بیف اسٹیک", price: 3450, desc: "Cooked to your preference." },
      { no: 303, name: "Alfredo Pasta", nameUr: "الفریڈو پاستا", price: 1450, desc: "Cream, parmesan, grilled chicken." },
      { no: 304, name: "Arrabbiata Pasta", nameUr: "ارابیاٹا پاستا", price: 1350, desc: "Spiced tomato, basil, chilli flakes." },
      { no: 305, name: "Crispy Fried Fish & Fries", nameUr: "فرائیڈ فش", price: 1850, desc: "Tartar sauce, lemon." },
      { no: 306, name: "Arena Club Sandwich", nameUr: "کلب سینڈوچ", price: 1150, desc: "Triple decker with fries." },
    ],
  },
  {
    slug: "kids",
    title: "Kids Menu",
    titleUr: "بچوں کا مینو",
    blurb: "Small plates, big smiles.",
    image: `${CDN}/2026/03/kids-home.jpg`,
    items: [
      { no: 401, name: "Chicken Nuggets & Fries", nameUr: "نگٹس اینڈ فرائز", price: 850, desc: "Six pieces with ketchup." },
      { no: 402, name: "Mini Beef Burger", nameUr: "منی برگر", price: 950, desc: "Soft bun, cheese slice." },
      { no: 403, name: "Macaroni in Cheese", nameUr: "چیز میکرونی", price: 800, desc: "Mild and creamy." },
      { no: 404, name: "Kids Pizza Slice", nameUr: "کڈز پیزا", price: 700, desc: "Cheese and corn." },
    ],
  },
  {
    slug: "desserts",
    title: "Desserts & Sweets",
    titleUr: "میٹھا",
    blurb: "Warm, cold and everything in between.",
    image: `${CDN}/2026/06/desserts-08-s.jpg`,
    items: [
      { no: 501, name: "Molten Lava Cake", nameUr: "لاوا کیک", price: 750, desc: "Warm centre, vanilla scoop." },
      { no: 502, name: "Kheer / Rice Pudding", nameUr: "کھیر", price: 450, desc: "Cardamom, pistachio." },
      { no: 503, name: "Gulab Jamun (2 pcs)", nameUr: "گلاب جامن", price: 400, desc: "Served warm." },
      { no: 504, name: "Kulfi Falooda", nameUr: "قلفی فالودہ", price: 650, desc: "House-churned kulfi." },
    ],
  },
  {
    slug: "bar",
    title: "Bar Menu",
    titleUr: "مشروبات",
    blurb: "Mocktails, fresh juices, hot brews.",
    image: `${CDN}/2026/06/bar-12-s.jpg`,
    items: [
      { no: 601, name: "Mint Margarita (Mocktail)", nameUr: "منٹ مارگریٹا", price: 550, desc: "Lime, mint, crushed ice." },
      { no: 602, name: "Blue Lagoon", nameUr: "بلیو لگون", price: 550, desc: "Citrus and blue curaçao syrup." },
      { no: 603, name: "Fresh Lime Soda", nameUr: "لیمن سوڈا", price: 400, desc: "Sweet or salted." },
      { no: 604, name: "Kashmiri Chai", nameUr: "کشمیری چائے", price: 500, desc: "Pink tea with nuts." },
      { no: 605, name: "Espresso / Cappuccino", nameUr: "کافی", price: 600, desc: "Freshly ground beans." },
    ],
  },
];

export const allItems: MenuItem[] = menu.flatMap((c) => c.items);

export const findItemByNo = (no: number) => allItems.find((i) => i.no === no);

export const BUSINESS = {
  name: "Spice Arena",
  tagline: "Best Restaurant in Lahore",
  address: "Palm City, 28 KM Ferozpur Road, Lahore",
  hours: "4:00 PM – 11:00 PM",
  phoneDisplay: "+92-336-111-7777",
  phoneTel: "+923361117777",
  whatsapp: "923361117777",
  logo: `${CDN}/2026/03/spice-arena-logo-white-h-s.png`,
};
