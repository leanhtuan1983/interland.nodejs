const db = require("../config/db");
const bcrypt = require("bcryptjs");

function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// Hiển thị form login
exports.loginForm = (req, res) => {
  res.render("authentication/login", { error: null });
};

// Xử lý login
exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.render("authentication/login", {
          error: "Sai username hoặc password!",
        });
      }

      const user = results[0];

      // So sánh mật khẩu
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
          };
          return res.redirect("/dashboard");
        } else {
          return res.render("authentication/login", {
            error: "Sai username hoặc password!",
          });
        }
      });
    }
  );
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
};
