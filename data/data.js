const initialProducts = [
  // Men's Clothing (20 products)
  {
    id: 101,
    name: "Classic Denim Hoodie",
    description: "A timeless denim hoodie with a comfortable fit, perfect for casual outings. Features a durable cotton blend fabric and a practical front pocket.",
    img: "img_index/product-hoodie1-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 42,
    availible: 58,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Perfect fit and very comfortable material. Highly recommend!",
        date: "2023-06-10"
      },
      {
        userId: 503,
        username: "user3",
        rating: 4,
        comment: "Great quality but runs slightly large",
        date: "2023-07-15"
      }
    ]
  },
  {
    id: 102,
    name: "Casual Denim Hoodie",
    description: "Lightweight denim hoodie with a relaxed fit, ideal for layering. Features adjustable drawstrings and ribbed cuffs for a snug fit.",
    img: "img_index/product-hoodie2-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 35,
    availible: 65,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Love the style and warmth. My new favorite hoodie!",
        date: "2023-06-25"
      }
    ]
  },
  {
    id: 103,
    name: "Leather Denim Hoodie",
    description: "Premium leather-trimmed denim hoodie with a rugged look. Features genuine leather accents and a warm inner lining for cooler weather.",
    img: "img_index/product-hoodie3-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 18,
    availible: 32,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Premium quality leather. Worth every penny!",
        date: "2023-07-30"
      },
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Great jacket but the sleeves are a bit long",
        date: "2023-08-12"
      }
    ]
  },
  {
    id: 104,
    name: "Slim Fit Jeans",
    description: "Modern slim-fit jeans with stretch technology for maximum comfort. Features a mid-rise waist and tapered leg opening.",
    img: "img_index/product-m-jeans1-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 12,
    availible: 28,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 4,
        comment: "Comfortable and stylish. True to size.",
        date: "2023-06-15"
      }
    ]
  },
  {
    id: 105,
    name: "Slim Fit Jeans",
    description: "Versatile slim-fit jeans in a classic blue wash. Made with durable denim that maintains its shape wash after wash.",
    img: "img_index/product-m-jeans2-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 67,
    availible: 83,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Best jeans I've ever owned!",
        date: "2023-07-01"
      },
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Perfect fit and great quality",
        date: "2023-07-20"
      },
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Great jeans but the color fades after washing",
        date: "2023-08-15"
      }
    ]
  },
  {
    id: 106,
    name: "Cashmere Slim Jeans",
    description: "Luxury slim-fit jeans with a cashmere blend for exceptional softness. Features a premium finish and elegant drape.",
    img: "img_index/product-m-jeans3-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 23,
    availible: 27,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Extremely comfortable and high quality fabric",
        date: "2023-07-22"
      }
    ]
  },
  {
    id: 107,
    name: "Slim Fit Jeans",
    description: "Contemporary slim-fit jeans with a dark indigo wash. Features reinforced stitching and five-pocket styling.",
    img: "img_index/product-m-jeans4-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 54,
    availible: 46,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 4,
        comment: "Good fit but a bit tight around the waist",
        date: "2023-06-18"
      },
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Perfect jeans for my body type",
        date: "2023-07-12"
      }
    ]
  },
  {
    id: 108,
    name: "Sports Shoes",
    description: "High-performance running shoes with responsive cushioning. Features breathable mesh upper and durable rubber outsole.",
    img: "img_index/sports-shoe1-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 8,
    availible: 22,
    reviews: [
      {
        userId: 505,
        username: "user5",
        rating: 5,
        comment: "Great support for running. Very comfortable!",
        date: "2023-08-08"
      }
    ]
  },
  {
    id: 109,
    name: "Sports Shoes",
    description: "Lightweight training shoes with flexible sole design. Features anti-slip tread pattern and cushioned insole for all-day comfort.",
    img: "img_index/sports-shoe2-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 39,
    availible: 61,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 4,
        comment: "Good shoes for the price",
        date: "2023-06-30"
      },
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Lightweight and comfortable for daily wear",
        date: "2023-07-25"
      }
    ]
  },
  {
    id: 110,
    name: "Sports Shoes",
    description: "Versatile athletic shoes with responsive foam midsole. Features engineered knit upper for breathability and support.",
    img: "img_index/sports-shoe3-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 72,
    availible: 128,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Best sports shoes I've bought in years",
        date: "2023-06-12"
      },
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Excellent cushioning and support",
        date: "2023-07-08"
      },
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Great shoes but took a while to break in",
        date: "2023-08-10"
      }
    ]
  },
  {
    id: 111,
    name: "Sports Shoes",
    description: "High-top basketball shoes with ankle support. Features a durable leather upper and herringbone traction pattern.",
    img: "img_index/sports-shoe4-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 19,
    availible: 31,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Perfect for basketball. Great ankle support!",
        date: "2023-07-05"
      }
    ]
  },
  {
    id: 112,
    name: "Sports Shoes",
    description: "Casual athletic shoes with retro styling. Features a cushioned footbed and durable rubber outsole for everyday wear.",
    img: "img_index/sports-shoe5-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 45,
    availible: 55,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 4,
        comment: "Comfortable walking shoes with good grip",
        date: "2023-07-18"
      },
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Great value for money. Very durable!",
        date: "2023-06-22"
      }
    ]
  },
  {
    id: 113,
    name: "Cargo T-shirt",
    description: "Utility-inspired t-shirt with multiple pockets. Features a relaxed fit and durable cotton fabric for everyday wear.",
    img: "img_index/tshirt1-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 28,
    availible: 72,
    reviews: [
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Love the pockets. Very practical design!",
        date: "2023-07-10"
      }
    ]
  },
  {
    id: 114,
    name: "Silk T-shirt",
    description: "Premium silk-blend t-shirt with a luxurious drape. Features a subtle sheen and breathable fabric for superior comfort.",
    img: "img_index/tshirt2-300x300.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 31,
    availible: 69,
    reviews: [
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Super soft material. Runs a bit small",
        date: "2023-08-05"
      },
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Feels luxurious. Perfect for summer!",
        date: "2023-07-02"
      }
    ]
  },
  {
    id: 115,
    name: "Leather T-shirt",
    description: "Unique leather-paneled t-shirt for a bold look. Features a combination of cotton and genuine leather for a distinctive style.",
    img: "img_index/tshirt3-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 14,
    availible: 26,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Unique and stylish. Gets lots of compliments!",
        date: "2023-06-20"
      },
      {
        userId: 504,
        username: "user4",
        rating: 4,
        comment: "Great quality leather but requires special care",
        date: "2023-07-28"
      }
    ]
  },
  {
    id: 116,
    name: "Winter T-shirt",
    description: "Thermal-lined t-shirt for cold weather comfort. Features a brushed interior for warmth and a classic crew neck design.",
    img: "img_index/tshirt4-300x300.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 37,
    availible: 63,
    reviews: [
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Very warm without being bulky. Perfect for winter!",
        date: "2023-07-14"
      }
    ]
  },
  {
    id: 117,
    name: "Aviator T-shirt",
    description: "Vintage-inspired aviator print t-shirt. Features a soft cotton fabric and fade-resistant printing for long-lasting wear.",
    img: "img_index/tshirt7-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 42,
    availible: 58,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Love the vintage aviation theme. High quality print!",
        date: "2023-07-03"
      },
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Great shirt but the color faded slightly after washing",
        date: "2023-08-14"
      }
    ]
  },
  {
    id: 118,
    name: "Gym T-shirt",
    description: "Performance t-shirt with moisture-wicking technology. Features a breathable mesh back and ergonomic seams for active wear.",
    img: "img_index/tshirt4-600x600.jpg",
    price: 150,
    category: "men",
    sellerId: 301,
    sold: 29,
    availible: 71,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Breathable and comfortable for workouts",
        date: "2023-06-17"
      },
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Wicks sweat away perfectly. Great for intense training!",
        date: "2023-07-27"
      }
    ]
  },
  {
    id: 119,
    name: "Wool T-shirt",
    description: "Merino wool-blend t-shirt for temperature regulation. Features natural odor resistance and a comfortable slim fit.",
    img: "img_index/tshirt4-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 11,
    availible: 19,
    reviews: [
      {
        userId: 503,
        username: "user3",
        rating: 4,
        comment: "Very warm and comfortable. Perfect for cold weather!",
        date: "2023-07-16"
      }
    ]
  },
  {
    id: 120,
    name: "Men's T-shirt",
    description: "Essential crew neck t-shirt in classic colors. Features a premium cotton blend and reinforced stitching for durability.",
    img: "img_index/tshirt4-600x600.jpg",
    price: 200,
    category: "men",
    sellerId: 301,
    sold: 16,
    availible: 24,
    reviews: [
      {
        userId: 505,
        username: "user5",
        rating: 5,
        comment: "Classic fit. Goes with everything in my wardrobe!",
        date: "2023-08-07"
      },
      {
        userId: 502,
        username: "user2",
        rating: 4,
        comment: "Good basic tee. Holds up well after multiple washes",
        date: "2023-07-01"
      }
    ]
  },

  // Women's Clothing (20 products)
  {
    id: 201,
    name: "Women's Accessory",
    description: "Elegant statement necklace with intricate metalwork. Features a delicate chain and eye-catching pendant for special occasions.",
    img: "img_index/product-accessory1-600x600.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 52,
    availible: 48,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Beautiful accessory, gets lots of compliments!",
        date: "2023-07-22"
      },
      {
        userId: 502,
        username: "user2",
        rating: 4,
        comment: "Nice but a bit pricey for what it is",
        date: "2023-06-28"
      }
    ]
  },
  {
    id: 202,
    name: "Women's Accessory",
    description: "Dainty layered bracelet set with adjustable closures. Features a mix of textures and delicate charms for everyday elegance.",
    img: "img_index/product-accessory1-b-300x300.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 47,
    availible: 53,
    reviews: [
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Absolutely love this! Perfect gift.",
        date: "2023-07-05"
      }
    ]
  },
  {
    id: 203,
    name: "Women's Accessory",
    description: "Geometric drop earrings with sparkling accents. Features lightweight design and hypoallergenic materials for comfortable wear.",
    img: "img_index/product-accessory1-c-300x300.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 23,
    availible: 27,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 4,
        comment: "Elegant design. Goes with many outfits",
        date: "2023-06-14"
      },
      {
        userId: 505,
        username: "user5",
        rating: 5,
        comment: "My new favorite accessory!",
        date: "2023-08-09"
      }
    ]
  },
  {
    id: 204,
    name: "Women's Accessory",
    description: "Artisan-crafted bangle with hand-engraved details. Features a substantial weight and smooth interior for comfortable wear.",
    img: "img_index/product-accessory2-600x600.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 18,
    availible: 22,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Unique and stylish. Perfect for special occasions!",
        date: "2023-07-24"
      }
    ]
  },
  {
    id: 205,
    name: "Women's Accessory",
    description: "Handwoven silk scarf with vibrant patterns. Features hand-rolled edges and a lightweight drape for year-round wear.",
    img: "img_index/product-accessory2-b-300x300.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 9,
    availible: 21,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 4,
        comment: "Beautiful craftsmanship",
        date: "2023-06-29"
      },
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Exceeded my expectations!",
        date: "2023-07-07"
      }
    ]
  },
  {
    id: 206,
    name: "Women's Accessory",
    description: "Delicate pendant necklace with a minimalist design. Features a fine chain and subtle sparkle for everyday sophistication.",
    img: "img_index/product-accessory2-c-300x300.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 43,
    availible: 57,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Versatile piece that works with many outfits",
        date: "2023-06-16"
      },
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Nice quality but the clasp is a bit delicate",
        date: "2023-08-11"
      }
    ]
  },
  {
    id: 207,
    name: "Women's Accessory",
    description: "Statement cocktail ring with crystal accents. Features a bold design and comfortable band for special occasion wear.",
    img: "img_index/product-accessory3-600x600.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 21,
    availible: 29,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Gorgeous design. Worth every penny!",
        date: "2023-07-26"
      }
    ]
  },
  {
    id: 208,
    name: "Crossbody Bag",
    description: "Compact crossbody bag with adjustable strap. Features multiple compartments and a secure zip closure for essentials.",
    img: "img_index/product-bag1-600x600.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 17,
    availible: 23,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 4,
        comment: "Perfect size for everyday use",
        date: "2023-07-04"
      },
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Love the compartments. Very practical!",
        date: "2023-07-09"
      }
    ]
  },
  {
    id: 209,
    name: "Crossbody Bag",
    description: "Structured leather crossbody with gold-tone hardware. Features a roomy interior and protective feet on the base.",
    img: "img_index/product-bag2-600x600.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 28,
    availible: 32,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "High quality leather that's aging beautifully",
        date: "2023-06-19"
      }
    ]
  },
  {
    id: 210,
    name: "Crossbody Bag Leggings",
    description: "High-waisted leggings with a crossbody bag design. Features a flattering fit, opaque fabric, and comfortable wide waistband.",
    img: "img_index/product-bag3-300x300.jpg",
    price: 150,
    category: "women",
    sellerId: 302,
    sold: 65,
    availible: 85,
    reviews: [
      {
        userId: 505,
        username: "user5",
        rating: 5,
        comment: "So comfortable I bought a second pair!",
        date: "2023-08-13"
      },
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Perfect for workouts and casual wear",
        date: "2023-07-23"
      }
    ]
  },
  {
    id: 211,
    name: "Crossbody Bag",
    description: "Convertible crossbody bag with removable strap. Features a spacious main compartment and multiple organizational pockets.",
    img: "img_index/product-bag3-600x600.jpg",
    price: 150,
    category: "women",
    sellerId: 302,
    sold: 39,
    availible: 61,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 4,
        comment: "Great bag for the price. Holds all my essentials!",
        date: "2023-07-06"
      }
    ]
  },
  {
    id: 212,
    name: "Wool Crossbody Bag",
    description: "Felted wool crossbody with embroidered details. Features a soft texture, inner lining, and magnetic snap closure.",
    img: "img_index/product-bag3-b-300x300.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 14,
    availible: 26,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Beautiful craftsmanship. Very elegant!",
        date: "2023-06-21"
      },
      {
        userId: 503,
        username: "user3",
        rating: 4,
        comment: "Love the design but the strap could be longer",
        date: "2023-07-11"
      }
    ]
  },
  {
    id: 213,
    name: "Crossbody Bag",
    description: "Mini crossbody bag with chain strap. Features a compact silhouette perfect for evenings out and a secure inner zip pocket.",
    img: "img_index/product-bag3-c-300x300.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 27,
    availible: 33,
    reviews: [
      {
        userId: 505,
        username: "user5",
        rating: 5,
        comment: "My new everyday bag! Fits everything I need",
        date: "2023-08-16"
      }
    ]
  },
  {
    id: 214,
    name: "Silk Jeans",
    description: "Luxury silk-blend jeans with a satin finish. Features a tailored fit and delicate drape for elegant occasions.",
    img: "img_index/product-w-jeans1.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 8,
    availible: 12,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 4,
        comment: "Luxurious feel but requires delicate care",
        date: "2023-07-21"
      },
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Perfect for special occasions. So elegant!",
        date: "2023-07-08"
      }
    ]
  },
  {
    id: 215,
    name: "Lace Jeans",
    description: "Feminine jeans with delicate lace panel details. Features a mid-rise waist and stretch denim for comfort and style.",
    img: "img_index/product-w-jeans2-600x600.jpg",
    price: 150,
    category: "women",
    sellerId: 302,
    sold: 42,
    availible: 58,
    reviews: [
      {
        userId: 501,
        username: "user1",
        rating: 5,
        comment: "Beautiful detailing. Fits like a dream!",
        date: "2023-06-13"
      }
    ]
  },
  {
    id: 216,
    name: "Jeans Pants",
    description: "Classic straight-leg jeans with a comfortable fit. Features a medium wash and five-pocket styling for everyday wear.",
    img: "img_index/product-w-jeans3-600x600.jpg",
    price: 150,
    category: "women",
    sellerId: 302,
    sold: 23,
    availible: 27,
    reviews: [
      {
        userId: 503,
        username: "user3",
        rating: 4,
        comment: "Comfortable and stylish. True to size.",
        date: "2023-07-13"
      },
      {
        userId: 505,
        username: "user5",
        rating: 5,
        comment: "My new favorite jeans!",
        date: "2023-08-17"
      }
    ]
  },
  {
    id: 217,
    name: "Women's Jeans",
    description: "High-rise skinny jeans with tummy control panel. Features ultra-stretch denim and ankle-length cut for a flattering fit.",
    img: "img_index/product-w-jeans4-600x600.jpg",
    price: 150,
    category: "women",
    sellerId: 302,
    sold: 31,
    availible: 69,
    reviews: [
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Perfect fit and very comfortable all day",
        date: "2023-07-19"
      }
    ]
  },
  {
    id: 218,
    name: "Oversized Bag",
    description: "Room tote bag with structured silhouette. Features sturdy handles, interior pockets, and a zip-top closure for security.",
    img: "img_index/product-bag3-d-300x300.jpg",
    price: 150,
    category: "women",
    sellerId: 302,
    sold: 37,
    availible: 63,
    reviews: [
      {
        userId: 502,
        username: "user2",
        rating: 5,
        comment: "Fits all my work essentials with room to spare!",
        date: "2023-07-17"
      },
      {
        userId: 501,
        username: "user1",
        rating: 4,
        comment: "Great bag but a bit heavy when full",
        date: "2023-06-24"
      }
    ]
  },
  {
    id: 219,
    name: "Cashmere Bag",
    description: "Luxury cashmere-blend shoulder bag. Features a soft texture, gold-tone hardware, and a detachable strap for versatility.",
    img: "img_index/product-bag4-600x600.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 15,
    availible: 25,
    reviews: [
      {
        userId: 503,
        username: "user3",
        rating: 5,
        comment: "Luxurious feel and perfect size",
        date: "2023-07-29"
      }
    ]
  },
  {
    id: 220,
    name: "Crossbody Jeans",
    description: "Innovative jeans with built-in crossbody bag design. Features a comfortable stretch denim and practical storage solution.",
    img: "img_index/product-w-jeans1.jpg",
    price: 200,
    category: "women",
    sellerId: 302,
    sold: 19,
    availible: 21,
    reviews: [
      {
        userId: 505,
        username: "user5",
        rating: 4,
        comment: "Unique design. Very comfortable!",
        date: "2023-08-18"
      },
      {
        userId: 504,
        username: "user4",
        rating: 5,
        comment: "Perfect combination of style and comfort",
        date: "2023-07-31"
      }
    ]
  }
];

function initializeData() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
}

initializeData();


function getAllProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}
const allProducts = getAllProducts();