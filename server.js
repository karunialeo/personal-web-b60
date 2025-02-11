const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const path = require("path");

const { formatDateToWIB, getRelativeTime } = require("./utils/time");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views")); // C://My Computer/Users/Documents/../../personal-web/views

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

let blogs = [];

// HOME
app.get("/", (req, res) => {
  res.render("index");
  console.log("test");
});

// CONTACT ME
app.get("/contact", (req, res) => {
  res.render("contact");
});

// BLOG LIST
app.get("/blog", (req, res) => {
  console.log(blogs);
  res.render("blog-list", { blogs: blogs });
});

// CREATE BLOG PAGE
app.get("/blog-create", (req, res) => {
  res.render("blog-create");
});

// SUBMIT NEW BLOG
app.post("/blog-create", (req, res) => {
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("judulnya adalah", title);
  console.log("contentnya :", content);

  let image = "https://picsum.photos/200/150";

  let newBlog = {
    title: title,
    content: content,
    image: image,
    author: "Leo G",
    postedAt: new Date(),
  };

  blogs.push(newBlog);

  res.redirect("/blog");
});

// BLOG DETAIL
app.get("/blog/:id", (req, res) => {
  res.render("blog-detail");
});

// TESTIMONIALS
app.get("/testimonials", (req, res) => {
  res.render("testimonials");
});

app.listen(port, () => {
  console.log(`My personal web app listening on port ${port}`);
});
