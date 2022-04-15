const { faker } = require("@faker-js/faker");
const fs = require("fs");

const chooseRandom = (arr, num = 1) => {
  const res = [arr[Math.floor(Math.random() * arr.length)]];
  for (let i = 1; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};

const genCreatedAnUpdatedAt = () => {
  return {
    created_at: Date.parse(faker.date.past(20)),
    updated_at: Date.parse(faker.date.past(10)),
  };
};

function generateCategories(arr) {
  const categories = [];

  arr.forEach((item) =>
    categories.push({
      id: faker.datatype.uuid(),
      name: item,
      is_deleted: false,
      ...genCreatedAnUpdatedAt(),
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
      ...genCreatedAnUpdatedAt(),
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
      ...genCreatedAnUpdatedAt(),
      categories: blogCategories,
      categoriesSearch: {
        id: blogCategories.map((item) => item.id).join("-"),
        name: blogCategories.map((item) => item.name).join("-"),
      },
      author: users[userIndex],
    });
  }

  return blogs;
}

function generateComments(users, blogs, length) {
  const comments = [];

  for (const blog of blogs) {
    const commentsSize = Math.floor(Math.random() * (length - 1) + 1);
    for (let i = 0; i < commentsSize; i++) {
      const userIndex = Math.floor(Math.random() * users.length);

      comments.push({
        id: faker.datatype.uuid(),
        blogId: blog.id,
        content: faker.lorem.text(),
        author: users[userIndex],
        is_deleted: false,
        ...genCreatedAnUpdatedAt(),
      });
    }
  }

  return comments;
}

function generateDb() {
  const categoryList = ["Javascript", "Redux", "ReactJS", "NextJS", "HTML", "CSS"];
  const users = generateUser(5);
  const categories = generateCategories(categoryList);
  const blogs = generateBlogs(users, categories, 20);
  const comments = generateComments(users, blogs, 6);

  // Prepare database
  const db = {
    users, //For author
    categories,
    blogs,
    comments,
  };

  fs.writeFile("./server/db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully !!!");
  });

  return db;
}

generateDb();
