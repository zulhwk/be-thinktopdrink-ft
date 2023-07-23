const jwt = require("jsonwebtoken");
const { User } = require("../models");
const _const = require("./const");

exports.getUserByToken = async (req) => {
  try {
    let token = req.header("Authorization");

    if (token == null || token == undefined) {
      return {
        status: false,
        message: "Authorization token not found",
        data: null,
        err: null,
      };
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (user) {
      const userData = await User.findOne({ where: { uuid: user.id } });

      return userData;
    } else {
      return {
        status: false,
        message: "User Data not found",
        data: null,
        err: "User tidak terdaftar",
      };
    }
  } catch (err) {
    return {
      status: false,
      message: "User Data not found",
      data: null,
      err: err.stack,
    };
  }
};

exports.getAdminByToken = async (req) => {
  try {
    let token = req.header("Authorization");
    if (token == null || token == undefined) {
      return {
        status: false,
        message: "Authorzation token not found",
        data: null,
        err: null,
      };
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (user) {
      const userData = await User.findOne({
        where: {
          uuid: user.id,
          role: _const.ROLE.ADMIN,
        },
      });
      if (userData) {
        return userData;
      } else {
        return {
          status: false,
          message: "User data not found.",
          data: null,
          err: "Anda bukan admin.",
        };
      }
    } else {
      return {
        status: false,
        message: "User data not found",
        data: null,
        err: "Anda bukan admin",
      };
    }
  } catch (err) {
    return {
      status: false,
      message: "Unknown error",
      data: null,
      err: err.stack,
    };
  }
};

exports.getEmployeeByToken = async (req) => {
  try {
    let token = req.header("Authorization");
    if (token == null || token == undefined) {
      return {
        status: false,
        message: "Authorzation token not found",
        data: null,
        err: null,
      };
    }

    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (user) {
      const userData = await User.findOne({
        where: {
          uuid: user.id,
          role: _const.ROLE.EMPLOYEE,
        },
      });
      if (userData) {
        return userData;
      } else {
        return {
          status: false,
          message: "User data not found.",
          data: null,
          err: "Anda bukan pegawai.",
        };
      }
    } else {
      return {
        status: false,
        message: "User data not found",
        data: null,
        err: "Anda bukan admin",
      };
    }
  } catch (err) {
    return {
      status: false,
      message: "Unknown error",
      data: null,
      err: err.stack,
    };
  }
};
