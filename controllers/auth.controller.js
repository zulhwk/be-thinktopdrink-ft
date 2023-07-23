const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { full_name, email, password, role } = req.body;

      const passwordHash = await bcryptjs.hash(password, 12);

      const response = await User.create({
        full_name,
        email,
        password: passwordHash,
        role,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Register Akun Berhasil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const response = await User.findOne({ where: { email } });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Email belum terdaftar.",
          error: null,
        });
      }

      const isMatch = await bcryptjs.compare(password, response.password);

      if (!isMatch) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Password Salah.",
          error: null,
        });
      }

      const access_token = createAccessToken({ id: response.uuid });
      const refresh_token = createRefreshToken({ id: response.uuid });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          access_token,
          refresh_token,
        },
        message: "Login Berhasil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  reset_password: async (req, res) => {
    try {
      const { email, new_password, old_password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Email tidak terdaftar.",
          error: null,
        });
      }

      const isMatch = await bcryptjs.compare(old_password, user.password);

      if (!isMatch) {
        res.status(400).json({
          status: false,
          response: null,
          message: "Password lama salah.",
          error: null,
        });
      }

      const passwordHash = await bcryptjs.hash(new_password, 12);

      await User.update(
        {
          password: passwordHash,
        },
        {
          where: { email },
        }
      );

      return res.status(200).json({
        status: true,
        response: null,
        message: "Update password berhasil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const { rf_token } = req.body;

      if (!rf_token)
        return res.status(400).json({
          status: false,
          response: null,
          message: "Mohon melakukan login kembali.",
          error: null,
        });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(400).json({
              status: false,
              response: null,
              message: "Mohon melakukan login kembali.",
              error: null,
            });

          const response = await User.findOne({ where: { uuid: result.id } });

          if (!response)
            return res.status(400).json({
              status: false,
              response: null,
              message: "Akun tidak ada, silahkan login kembali.",
              error: null,
            });

          const access_token = createAccessToken({ id: result.id });

          res.status(200).json({
            status: true,
            response: {
              data: response,
              access_token,
            },
            message: "Berhasil.",
            error: null,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
