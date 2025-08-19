require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
const saltRounds = 10;

// Cấu hình session
app.use(
  session({
    secret: "your_secret_key", // thay bằng key riêng
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 giờ
    },
  })
);

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const pageRoutes = require("./routes/pageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// Frontend
app.use("/", pageRoutes);

// Backend
app.use("/auth", authenticationRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/categories", categoryRoutes);

// Middleware 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
