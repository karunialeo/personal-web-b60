const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const { Blog, User } = require("../models");

const sequelize = new Sequelize(config.development);

const saltRounds = 10;

async function renderHome(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);
  res.render("index", { user: user });
}

async function renderContact(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  res.render("contact", { user: user });
}

async function renderTestimonials(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  res.render("testimonials", { user: user });
}

async function renderLogin(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  if (user) {
    req.flash("warning", "User already login.");
    res.redirect("/");
  } else {
    res.render("auth-login", { user: user });
  }
}

async function renderRegister(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  if (user) {
    res.redirect("/");
  } else {
    res.render("auth-register", { user: user });
  }
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // check kalau usernya ada atau tidak
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    req.flash("error", "User tidak ditemukan.");
    return res.redirect("/login");
  }

  // check kalau passwordnya salah
  const isValidated = await bcrypt.compare(password, user.password); // return sebuah boolean, apakah true atau false

  if (!isValidated) {
    req.flash("error", "Password mismatch.");
    return res.redirect("/login");
  }

  let loggedInUser = user.toJSON(); // convert dari object sequelize ke object biasa

  delete loggedInUser.password; // menghapus properti password pada object new user

  console.log("user setelah passwordnya di delete :", loggedInUser);
  req.session.user = loggedInUser;

  req.flash("success", `Selamat datang, ${loggedInUser.name}!`);
  res.redirect("/");
}

async function authRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body; // object destructuring

  if (password != confirmPassword) {
    req.flash("error", "Password dan confirm password tidak sesuai.");
    return res.redirect("/register");
  }

  // check apakah email sudah terpakai
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    console.log("usernya udah ada");
    req.flash("error", "Email sudah terpakai.");
    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  console.log("user baru :", newUser);

  const userInsert = await User.create(newUser);

  req.flash("success", "Berhasil mendaftar. Silahkan login.");
  res.redirect("/login");
}

async function authLogout(req, res) {
  // hapus user dari session
  req.session.user = null;

  res.redirect("/login");
}

async function renderBlog(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  // kalau usernya ada atau kalau ada yang sedang login
  const blogs = await Blog.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });

  console.log("hasil fetch data dari controller v2", blogs);

  // console.log("pemilik blog paling atas :", blogs[0].user);

  if (user) {
    res.render("blog-list", { blogs: blogs, user: user });
  } else {
    res.render("blog-list", { blogs: blogs });
  }
}

async function renderBlogDetail(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  const id = req.params.id;

  // type data nya adalah object bukan array
  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    console.log("v2 blog detail :", blogYangDipilih);

    res.render("blog-detail", { blog: blogYangDipilih, user: user }); // tidak perlu index
  }
}

async function renderBlogCreate(req, res) {
  // memunculkan halaman create blog
  res.render("blog-create");
}

async function createBlog(req, res) {
  const user = req.session.user;

  if (!user) {
    req.flash("error", "Please login.");
    return res.redirect("/login");
  }
  // create blog submission
  const { title, content } = req.body; // title dan content adalah properti milik req.body

  let dummyImage = "https://picsum.photos/200/150";

  const image = req.file.path;
  console.log("image yg di upload :", image);

  const newBlog = {
    title, // ini sama saja dengan menuliskan title: title
    content,
    authorId: user.id,
    image: image,
  };

  const resultSubmit = await Blog.create(newBlog); // apa result nya ketika disubmit, gagal atau berhasil?

  res.redirect("/blog"); // URL, bukan nama file
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const deleteResult = await Blog.destroy({
    where: {
      id: id,
    },
  });

  console.log("result delete :", deleteResult);

  res.redirect("/blog");
}

async function renderBlogEdit(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  // render halaman edit blog
  const id = req.params.id;

  const blogYangDipilih = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.redirect("/login");
  }

  if (blogYangDipilih === null) {
    res.render("page-404");
  } else {
    console.log("v2 blog detail :", blogYangDipilih);

    res.render("blog-edit", { blog: blogYangDipilih, user: user });
  }
}

async function updateBlog(req, res) {
  // update blog submission
  const id = req.params.id;
  const { title, content } = req.body;
  console.log("judulnya adalah", title);
  console.log("contentnya :", content);

  const updateResult = await Blog.update(
    {
      // form edit
      title,
      content,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      // where clause atau filter yang mana yg mau di edit
      where: {
        id,
      },
    }
  );

  console.log("result update", updateResult);

  res.redirect("/blog");
}

async function renderError(req, res) {
  const user = req.session.user;
  console.log("usernya adalah :", user);

  res.render("page-404", { user: user });
}

module.exports = {
  renderHome,
  renderContact,
  renderTestimonials,
  renderLogin,
  renderRegister,
  authLogin,
  authRegister,
  authLogout,
  renderBlog,
  renderBlogDetail,
  deleteBlog,
  renderBlogCreate,
  createBlog,
  renderBlogEdit,
  updateBlog,
  renderError,
};
