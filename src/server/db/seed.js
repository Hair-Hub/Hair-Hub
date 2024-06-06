const db = require("./client");
const { createUser } = require("./users");
const { createItem } = require("./items");
const { createReview } = require("./reviews");
const { createComment } = require("./comments");

const users = [
  {
    userId: 1,
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    userId: 2,
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    userId: 3,
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    userId: 4,
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    userId: 5,
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
  {
    userId: 6,
    name: "Ivory Watkins",
    email: "Iw@example.com",
    password: "Bluecheese",
  },
  {
    userId: 7,
    name: "Richard Stewart",
    email: "rs@example.com",
    password: "pizza",
  },
];

const items = [
  {
    id: 1,
    name: "Kristin Ess Curl Shampoo",
    brand: "Kristin Ess",
    category: "Shampoo",
    description:
      "formulated to enhance and define natural curls while providing essential moisture and hydration. Infused with nourishing ingredients, this shampoo gently cleanses the hair without stripping away natural oils, leaving curls bouncy, shiny, and frizz-free. Its lightweight formula helps to maintain curl integrity and manageability, making it ideal for those with wavy to curly hair types.",
    picture:
      "https://www.kristinesshair.com/cdn/shop/products/curlsham1.png?v=1621021050&width=470",
  },
  {
    id: 2,
    name: "Kristin Ess Curl Conditioner",
    brand: "Kristin Ess",
    category: "Conditioner",
    description:
      "a hydrating formula designed to nourish and define natural curls. With its lightweight yet moisturizing texture, this conditioner helps to detangle and soften hair while enhancing curl pattern and reducing frizz. Formulated without sulfates and parabens, it leaves curls feeling silky smooth and looking effortlessly beautiful.",
    picture:
      "https://www.kristinesshair.com/cdn/shop/products/curlcondition1.png?v=1621021094&width=470",
  },
  {
    id: 3,
    name: "Coconut Castaway",
    brand: "Dr.Squatch",
    category: "Shampoo",
    description:
      "Tropical scented made from all natural ingredients. Moisturizing shampoo that provides deep hydration for silky, soft, and manageable hair.",
    picture:
      "https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341&width=400",
  },
  {
    id: 4,
    name: "Renpure Biotin & Collagen Thickening Hair Shampoo",
    brand: "Renpure",
    category: "Shampoo",
    description:
      "Renpure Biotin & Collagen Thickening Shampoo is infused with nutrients to help fine hair look and feel thicker and fuller. Our Biotin & Collagen Shampoo contains a blend of Vitamin B7 (Biotin) and protein (Collagen), created to give you the appearance of full, healthy-looking hair.",
    picture:
      "https://www.renpure.com/wp-content/uploads/2019/10/Adv_BiotinCollagen_Shampoo_32oz_EN_FRONT_Web.png",
  },
  {
    id: 5,
    name: "Fresh Falls",
    brand: "Dr.Squatch",
    category: "Conditioner",
    description:
      "Infused with natural ingredients like aloe vera and argan oil, this conditioner deeply nourishes and hydrates the hair, leaving it soft, smooth, and manageable. Its masculine scent, reminiscent of the great outdoors, provides a refreshing sensation that lasts throughout the day.",
    picture:
      "https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3190_93eccf54-3ee9-4283-aac6-d3ac3c2063ea.png?v=1633997453&width=400",
  },
  {
    id: 6,
    name: "Renpure Biotin & Collagen Thickening Conditioner",
    brand: "Renpure",
    category: "Conditioner",
    description:
      "Renpure Biotin & Collagen Thickening Conditioner is infused with nutrients to help fine hair look and feel thicker and fuller. Our Biotin & Collagen Conditioner contains a blend of Vitamin B7 (Biotin) and protein (Collagen), created to give you the appearance of full, healthy-looking hair.",
    picture:
      "https://i.pinimg.com/736x/16/6a/38/166a3882809ff6379252046bc0cd768e--biotin-collagen.jpg",
  },
  {
    id: 7,
    name: "OGX Renewing + Argan Oil of Morocco Shampoo",
    brand: "OGX",
    category: "Shampoo",
    description:
      "Renewing shampoo infused with argan oil to help restore shine and softness to dry, damaged hair.",
    picture:
      "https://ogxbeauty.com/wp-content/uploads/2021/09/argan-oil-morocco-shampoo-13z-1.jpg",
  },
  {
    id: 8,
    name: "Suave Professionals Moisturizing Shampoo",
    brand: "Suave",
    category: "Shampoo",
    description:
      "Moisturizing shampoo that cleanses and nourishes dry hair, leaving it soft and manageable.",
    picture:
      "https://www.suave.com/cdn/shop/files/107131338-079400066619-01.png.rendition.767.767_550x.png?v=1698337904",
  },
  {
    id: 9,
    name: "TRESemmé Moisture Rich Shampoo",
    brand: "TRESemmé",
    category: "Shampoo",
    description:
      "Moisturizing shampoo with vitamin E that delivers hydration and helps restore vibrancy to dry, damaged hair.",
    picture:
      "https://cdn.sanity.io/images/4nopozul/tresemme-staging-us/bc5a32a122a39ed59bd3547e39f4748adc6ab5cd-5000x5000.tif?w=450&h=450&fit=fill&auto=format&q=80&bg=fff",
  },
  {
    id: 10,
    name: "L'Oréal Paris Elvive Total Repair 5 Repairing Shampoo",
    brand: "L'Oréal Paris",
    category: "Shampoo",
    description:
      "Repairing shampoo with protein and ceramide for stronger, smoother, healthier-looking hair.",
    picture:
      "https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/hair-care/shampoo/elvive-total-repair-5-repairing-shampoo/total-repair-5-repairing-shampoo-126-oz/071249207307_t1.png?w=360&rev=855a04cb5d06427f80b03bec76996643&hash=1FE6939710F02881E3571A7FFD04840447AA6323",
  },
];

const reviews = [
  {
    id: 1,
    userId: 1, // Id of user who left review
    username: "Emily Johnson",
    itemId: 1, // Id of item being reviewed
    rating: 3, // Rating given by the user out of 5
    body: "This shampoo works wonders for my curly hair!",
  },
  {
    id: 2,
    userId: 3,
    username: "Isabella García",
    itemId: 2,
    rating: 3,
    body: "Love this conditioner, it really defines my curls",
  },
  {
    id: 3,
    userId: 3,
    username: "Isabella García",
    itemId: 9,
    rating: 3,
    body: "Provides good hydration for my hair. Will buy again.",
  },
  {
    id: 4,
    userId: 4,
    username: "Mohammed Ahmed",
    itemId: 10,
    rating: 3,
    body: "Leaves my hair feeling stronger and healthier. Great product!",
  },
  {
    id: 5,
    userId: 1,
    username: "Emily Johnson",
    itemId: 7,
    rating: 3,
    body: "My hair feels so smooth and shiny after using this shampoo!",
  },
  {
    id: 6,
    userId: 2,
    username: "Liu Wei",
    itemId: 8,
    rating: 2,
    body: "Decent shampoo, but didn't do much for my dry scalp.",
  },
  {
    id: 7,
    userId: 3,
    username: "Isabella García",
    itemId: 3,
    rating: 2,
    body:
      "The scent of this shampoo is nice, but it didn't do much for my hair.",
  },
  {
    id: 8,
    userId: 4,
    username: "Mohammed Ahmed",
    itemId: 4,
    rating: 3,
    body: "Great shampoo for adding volume to my fine hair.",
  },
  {
    id: 9,
    userId: 5,
    username: "John Smith",
    itemId: 5,
    rating: 3,
    body:
      "Love the masculine scent of this conditioner. Leaves my hair soft and hydrated.",
  },
  {
    id: 10,
    userId: 6,
    username: "Ivory Watkins",
    itemId: 6,
    rating: 3,
    body:
      "Love this product! Noticed a huge difference in my hair thickness after using this conditioner.",
  },
];

const comments = [
  {
    id: 1,
    body: "That's great to hear! I might try it for my curls too.",
    username: "Liu Wei",
    userId: 2, 
    parentId: 1, 
    
  },
  {
    id: 2,
    body: "Thanks for your feedback! We're glad you love it.",
    username: "Emily Johnson",
    userId: 1,
    parentId: 2,
    
  },
  {
    id: 3,
    body:"We appreciate your support! Let us know if you need anything else.",
    username: "Isabella García",
    userId: 3,
    parentId: 3,
  },
  {
    id: 4,
    body: "So happy to hear that! Thanks for sharing your experience.",
    username: "Emily Johnson",
    userId: 1,
    parentId: 4,
    
  },
  {
    id: 5,
    body:"That's fantastic! We aim to provide the best experience for our customers.",
    username: "Mohammed Ahmed",
    userId: 4,
    parentId: 5,
  },
  {
    id: 6,
    body:"We're sorry to hear that. Perhaps another product might work better for you.",
    username: "Ivory Watkins",
    userId: 6,
    parentId: 6,
  },
  {
    id: 7,
    body: "Thank you for your honest feedback. We'll take note of that.",
    username: "John Smith",
    userId: 5,
    parentId: 7,
  },
  {
    id: 8,
    body: "We're thrilled that you're satisfied with the results!",
    username: "Emily Johnson",
    userId: 1,
    parentId: 8,
  },
  {
    id: 9,
    body: "That's wonderful! We're delighted you enjoy the scent.",
    username: "Isabella García",
    userId: 3,
    parentId: 9,
  },
  {
    id: 10,
    body:"We apologize for the inconvenience. Please reach out to our support team for assistance.",
    username: "Liu Wei",
    userId: 2,
    parentId: 10,
  },
];

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS comments;`);
    await db.query(`DROP TABLE IF EXISTS reviews;`);
    await db.query(`DROP TABLE IF EXISTS items;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            username VARCHAR(255) DEFAULT 'username',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            hairtype VARCHAR(255) DEFAULT 'hairtype',
            hairtexture VARCHAR(255) DEFAULT 'hairtexture',
            haircolor VARCHAR(255) DEFAULT 'haircolor',
            hairlength VARCHAR(255) DEFAULT 'hairlength',
            hairgoals VARCHAR(255) DEFAULT 'hairgoals'
        )`);
    await db.query(`
        CREATE TABLE items(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            brand VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            description TEXT,
            picture TEXT
        )`);
    await db.query(`
        CREATE TABLE reviews(
            id SERIAL PRIMARY KEY,
            userId INTEGER REFERENCES users(id),
            username VARCHAR(255) DEFAULT 'username',
            itemId INTEGER REFERENCES items(id),
            parentId INTEGER REFERENCES reviews(id),
            rating INTEGER NOT NULL,
            body TEXT
        )`);
    await db.query(`
        CREATE TABLE comments(
            id SERIAL PRIMARY KEY,
            reviewId INTEGER REFERENCES reviews(id),
            username VARCHAR(255) DEFAULT 'username',
            userId INTEGER REFERENCES users(id),
            parentId INTEGER REFERENCES reviews(id),
            body TEXT
        )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertItems = async () => {
  try {
    for (const item of items) {
      await createItem({
        name: item.name,
        brand: item.brand,
        category: item.category,
        description: item.description,
        picture: item.picture,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview({
        id: review.id,
        userId: review.userId,
        username: review.username,
        itemId: review.itemId,
        parentId: review.parentId,
        rating: review.rating,
        body: review.body,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertComments = async () => {
  try {
    for (const comment of comments) {
      await createComment({
        id: comment.id,
        reviewId: comment.reviewId,
        userId: comment.userId,
        username: comment.username,
        parentId: comment.parentId,
        body: comment.body,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertItems();
    await insertReviews();
    await insertComments();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
