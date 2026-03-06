import { DataGetter } from './data-getter';
import { IProducts } from './iproducts';

export class JsonDataGetter implements DataGetter {
  private jsonData: string;
  constructor() {
    this.jsonData = `[
  {
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "price": 9.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    "category": "beauty",
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "stock": 99
  },
  {
    "id": 2,
    "title": "Eyeshadow Palette with Mirror",
    "price": 19.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
    "category": "beauty",
    "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    "stock": 34
  },
  {
    "id": 3,
    "title": "Powder Canister",
    "price": 14.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
    "category": "beauty",
    "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    "stock": 89
  },
  {
    "id": 4,
    "title": "Red Lipstick",
    "price": 12.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
    "category": "beauty",
    "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    "stock": 91
  },
  {
    "id": 5,
    "title": "Red Nail Polish",
    "price": 8.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
    "category": "beauty",
    "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    "stock": 79
  },
  {
    "id": 6,
    "title": "Calvin Klein CK One",
    "price": 49.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
    "category": "fragrances",
    "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    "stock": 29
  },
  {
    "id": 7,
    "title": "Chanel Coco Noir Eau De",
    "price": 129.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
    "category": "fragrances",
    "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    "stock": 58
  },
  {
    "id": 8,
    "title": "Dior J'adore",
    "price": 89.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
    "category": "fragrances",
    "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    "stock": 98
  },
  {
    "id": 9,
    "title": "Dolce Shine Eau de",
    "price": 69.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
    "category": "fragrances",
    "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    "stock": 4
  },
  {
    "id": 10,
    "title": "Gucci Bloom Eau de",
    "price": 79.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
    "category": "fragrances",
    "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    "stock": 91
  },
  {
    "id": 11,
    "title": "Annibale Colombo Bed",
    "price": 1899.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
    "category": "furniture",
    "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    "stock": 88
  },
  {
    "id": 12,
    "title": "Annibale Colombo Sofa",
    "price": 2499.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
    "category": "furniture",
    "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    "stock": 60
  },
  {
    "id": 13,
    "title": "Bedside Table African Cherry",
    "price": 299.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
    "category": "furniture",
    "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    "stock": 64
  },
  {
    "id": 14,
    "title": "Knoll Saarinen Executive Conference Chair",
    "price": 499.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
    "category": "furniture",
    "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    "stock": 26
  },
  {
    "id": 15,
    "title": "Wooden Bathroom Sink With Mirror",
    "price": 799.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
    "category": "furniture",
    "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    "stock": 7
  },
  {
    "id": 16,
    "title": "Apple",
    "price": 1.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
    "category": "groceries",
    "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    "stock": 8
  },
  {
    "id": 17,
    "title": "Beef Steak",
    "price": 12.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp",
    "category": "groceries",
    "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    "stock": 86
  },
  {
    "id": 18,
    "title": "Cat Food",
    "price": 8.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp",
    "category": "groceries",
    "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    "stock": 46
  },
  {
    "id": 19,
    "title": "Chicken Meat",
    "price": 9.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
    "category": "groceries",
    "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
    "stock": 97
  },
  {
    "id": 20,
    "title": "Cooking Oil",
    "price": 4.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp",
    "category": "groceries",
    "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    "stock": 10
  },
  {
    "id": 21,
    "title": "Cucumber",
    "price": 1.49,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp",
    "category": "groceries",
    "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    "stock": 84
  },
  {
    "id": 22,
    "title": "Dog Food",
    "price": 10.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp",
    "category": "groceries",
    "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    "stock": 71
  },
  {
    "id": 23,
    "title": "Eggs",
    "price": 2.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp",
    "category": "groceries",
    "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    "stock": 9
  },
  {
    "id": 24,
    "title": "Fish Steak",
    "price": 14.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp",
    "category": "groceries",
    "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    "stock": 74
  },
  {
    "id": 25,
    "title": "Green Bell Pepper",
    "price": 1.29,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp",
    "category": "groceries",
    "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    "stock": 33
  },
  {
    "id": 26,
    "title": "Green Chili Pepper",
    "price": 0.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
    "category": "groceries",
    "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    "stock": 3
  },
  {
    "id": 27,
    "title": "Honey Jar",
    "price": 6.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
    "category": "groceries",
    "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    "stock": 34
  },
  {
    "id": 28,
    "title": "Ice Cream",
    "price": 5.49,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
    "category": "groceries",
    "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    "stock": 27
  },
  {
    "id": 29,
    "title": "Juice",
    "price": 3.99,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/juice/1.webp",
    "category": "groceries",
    "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    "stock": 50
  },
  {
    "id": 30,
    "title": "Kiwi",
    "price": 2.49,
    "imgUrl": "https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp",
    "category": "groceries",
    "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    "stock": 99
  }
]`;
  }
  getData(): IProducts[] {
    return this.convertToProductArray();
  }
  convertToProductArray = (): IProducts[] => {
    const rawData: any[] = JSON.parse(this.jsonData);
    // console.log(rawData.at(0))
    return rawData.map(
      (item): IProducts => ({
        id: item.id,
        title: item.title,
        price: item.price,
        images: item.imgUrl,
        category: item.category,
        description: item.description,
        stock: item.stock,
      }),
    );
  };
}
