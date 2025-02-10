const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use(express.static("assets"));

// HOME
app.get("/", (req, res) => {
  res.render("index");
});

// CONTACT ME
app.get("/contact", (req, res) => {
  res.render("contact");
});

// BLOG
app.get("/blog", (req, res) => {
  res.render("blog");
});

// BLOG DETAIL
app.get("/blog/:id", (req, res) => {
  res.render("blog-detail");
});

// BLOG DETAIL
app.get("/testimonials", (req, res) => {
  res.render("testimonials");
});

app.listen(port, () => {
  console.log(`My personal web app listening on port ${port}`);
});
