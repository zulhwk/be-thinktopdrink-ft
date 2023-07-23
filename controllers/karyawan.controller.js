const { User, Personaldata } = require("../models");
const bcryptjs = require("bcryptjs");
const _const = require("../helper/const");
const karyawanCtrl = {
  postKaryawan: async (req, res) => {
    try {
      const {
        full_name,
        email,
        password,
        role,
        nickname,
        address,
        handphone,
        gender,
        occupation,
        birthday,
      } = req.body;

      const user_data = await Personaldata.create({
        nickname,
        address,
        handphone,
        gender,
        occupation,
        birthday,
      });

      const passwordHash = await bcryptjs.hash(password, 12);

      const user = await User.create({
        full_name,
        email,
        password: passwordHash,
        id_personaldata: user_data.id,
        role,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: user,
        },
        message: "Daftar karyawan berhasil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getKaryawan: async (req, res) => {
    try {
      const response = await User.findAll({
        include: "personal_data",
        where: { role: _const.ROLE.EMPLOYEE },
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data product tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: [
            "No",
            "Nama Lengkap",
            "Nickname",
            "Email",
            "JK",
            "Pekerjaan",
            "Alamat",
            "hp",
            "aksi",
          ],
        },
        message: "Data karyawan berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  putKaryawan: async (req, res) => {
    try {
      const param = req.params;
      const { product_name, description, price, stock } = req.body;

      const product = await Personaldata.findOne({
        where: { uuid: param.uuid_product },
      });

      if (!product) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data akun tidak ada.",
          error: null,
        });
      }

      await Personaldata.update(
        { product_name, description, price, stock },
        { where: { uuid: param.uuid_product } }
      );

      return res.status(200).json({
        status: true,
        response: null,
        message: "Product berhasil diubah.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  deleteKaryawan: async (req, res) => {
    try {
      const param = req.params;

      const user = await User.findOne({
        where: {
          uuid: param.uuid_karyawan
        }
      });

      console.log(user, "DATA USERS");

      const product = await Personaldata.findOne({
        where: {
          id: user.id_personaldata,
        },
      });

      if (!product || !user) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data akun tidak ada.",
          error: null,
        });
      }

      await user.destroy();
      await product.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Karyawan berhasil dihapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = karyawanCtrl;
