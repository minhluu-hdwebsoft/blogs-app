const { faker } = require("@faker-js/faker");
const fs = require("fs");

const chooseRandom = (arr, num = 1) => {
  const res = [];
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};

function generateCategories(arr) {
  const categories = [];

  arr.forEach((item) =>
    categories.push({
      id: faker.datatype.uuid(),
      name: item,
      is_deleted: false,
      created_at: Date.now(),
      updated_at: Date.now(),
    }),
  );

  return categories;
}

function generateUser(length) {
  const users = [];

  for (let i = 1; i <= length; i++) {
    users.push({
      name: `Admin${i}`,
      email: `admin${i}@admin.com`,
      password: "$2a$10$SbLLgPSv6GI5sUjxHR5v..AXXludDzLLRRaNRyY6d7TWmmZ6XLhxm",
      avatar: faker.image.avatar(),
      createdAt: Date.now(),
      id: i,
    });
  }

  return users;
}

function generateBlogs(users, categories, length) {
  const blogs = [];

  for (let i = 0; i < length; i++) {
    const userIndex = Math.floor(Math.random() * users.length);
    const blogCategories = chooseRandom(categories, Math.floor(Math.random() * categories.length));

    blogs.push({
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      html: faker.lorem.paragraphs(5),
      is_deleted: false,
      created_at: Date.now(),
      updated_at: Date.now(),
      categories: blogCategories,
      author: users[userIndex],
    });
  }

  return blogs;
}

function generateDb() {
  const categoryList = ["Javascript", "Redux", "ReactJS", "NextJS", "HTML", "CSS"];
  const users = generateUser(5);
  const categories = generateCategories(categoryList);
  const blogs = generateBlogs(users, categories, 5);

  // Prepare database
  const db = {
    users, //For author
    categories,
    blogs,
  };

  fs.writeFile("./server/db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully !!!");
  });

  return db;
}

generateDb();
