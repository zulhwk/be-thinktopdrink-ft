const { Product } = require("../models");

const productCtrl = {
  postProduct: async (req, res) => {
    try {
      const { product_name, description, price, stock } = req.body;

      const response = await Product.create({
        product_name,
        description,
        price,
        stock,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Product berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getProduct: async (req, res) => {
    try {
      const response = await Product.findAll();

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
          head: ["No", "Nama", "Deskripsi", "Harga", "Aksi"],
        },
        message: "Data product berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  putProduct: async (req, res) => {
    try {
      const param = req.params;
      const { product_name, description, price, stock } = req.body;

      const product = await Product.findOne({
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

      await Product.update(
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

  deleteProduct: async (req, res) => {
    try {
      const param = req.params;

      const product = await Product.findOne({
        where: {
          uuid: param.uuid_product,
        },
      });

      if (!product) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data product tidak ada.",
          error: null,
        });
      }

      await product.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Product berhasil dihapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = productCtrl;
