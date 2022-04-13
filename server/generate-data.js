const { faker } = require("@faker-js/faker");
const fs = require("fs");

function generateCategorys(arr) {
  const categorys = [];

  arr.forEach((item) =>
    categorys.push({
      id: faker.datatype.uuid(),
      name: item,
    }),
  );

  return categorys;
}

function generateBlogs(categorys, length) {
  const blogs = [];

  categorys.forEach((category) => {
    for (let i = 0; i < length; i++) {
      blogs.push({
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(),
        html: faker.lorem.paragraphs(5, "<br/>\n"),
        is_deleted: false,
        created_at: Date.now(),
        updated_at: Date.now(),
        categorys: [category],
        author: {
          name: "Admin",
          email: "admin@admin.com",
          id: 1,
        },
      });
    }
  });

  return blogs;
}

function generateDb() {
  const categoryList = ["Javascript", "Redux", "ReactJS", "NextJS", "HTML", "CSS"];
  const categorys = generateCategorys(categoryList);
  const blogs = generateBlogs(categorys, 5);

  // Prepare database
  const db = {
    users: [
      {
        name: "Admin",
        email: "admin@admin.com",
        password: "$2a$10$SbLLgPSv6GI5sUjxHR5v..AXXludDzLLRRaNRyY6d7TWmmZ6XLhxm",
        createdAt: 1649835434093,
        id: 1,
      },
    ], //For author
    categorys,
    blogs: blogs,
  };

  fs.writeFile("./server/db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully !!!");
  });

  return db;
}

generateDb();
