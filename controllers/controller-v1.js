const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

let blogs = [
  {
    title: "Pasar Coding di Indonesia",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda, voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto, unde magni enim itaque. Nostrum quod veniam quaerat modi ducimus accusamus dolorem, repellat iusto, autem, ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.",
    image: "/img/blog-img.png",
    author: "Erwin Setya",
    postedAt: new Date(
      "Fri July 21 2024 10:15:00 GMT+0700 (Western Indonesia Time)"
    ),
  },
  {
    title: "Blog Judul ke 2",
    content:
      "Nostrum quod veniam quaerat modi ducimus accusamus dolorem, repellat iusto, autem, ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda, voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto, unde magni enim itaque.",
    image: "/img/coding.jpg",
    author: "Erwin Setya",
    postedAt: new Date(
      "Fri July 28 2024 20:35:00 GMT+0700 (Western Indonesia Time)"
    ),
  },
];

async function renderBlog(req, res) {
  const blogs = await sequelize.query(`SELECT * FROM public."Blogs"`, {
    type: QueryTypes.SELECT,
  });
  console.log(blogs);
  res.render("blog-list", { blogs: blogs });
}

function renderBlogDetail(req, res) {
  const id = req.params.id;
  const blogYangDipilih = blogs[id];
  // console.log(blogYangDipilih);

  res.render("blog-detail", { blog: blogYangDipilih });
}

function createBlog(req, res) {
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
}

function renderBlogEdit(req, res) {
  const id = req.params.id;
  const blogYangDipilih = blogs[id];
  console.log(blogYangDipilih);

  res.render("blog-edit", { blog: blogYangDipilih, index: id });
}

function updateBlog(req, res) {
  const id = req.params.id;
  const { title, content } = req.body; // title dan content adalah properti milik req.body
  console.log("judul baru :", title);
  console.log("content baru :", content);

  let image = "https://picsum.photos/200/150";

  let updatedBlog = {
    title: title,
    content: content,
    image: image,
    author: "Erwin Setya",
    postedAt: new Date(),
  };

  blogs[id] = updatedBlog;

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const id = req.params.id;
  const blogYangDipilih = blogs[id];
  console.log(blogYangDipilih);

  blogs.splice(id, 1); // array manipulation => perubahan data pada array

  res.redirect("/blog");
}

module.exports = {
  renderBlog,
  renderBlogDetail,
  renderBlogEdit,
  createBlog,
  updateBlog,
  deleteBlog,
};
