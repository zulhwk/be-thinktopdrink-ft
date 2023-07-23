const { Biaya, Akun } = require("../models");

const biayaCtrl = {
  postBiaya: async (req, res) => {
    try {
      const { id_akun, deskripsi, jumlah } = req.body;

      const akun_data = await Akun.findOne({ where: { uuid: id_akun } });

      const response = await Biaya.create({
        id_akun: akun_data.id,
        deskripsi,
        jumlah,
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Biaya berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getBiaya: async (req, res) => {
    try {
      const response = await Biaya.findAll({
        include: "akun"
      });
      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: ["No", "Deskripsi", "Jumlah", "Aksi"],
        },
        message: "Data biaya berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  putBiaya: async (req, res) => {
    try {
      const param = req.params;
      const { id_akun, deskripsi, jumlah } = req.body;
    
      const akun = await Akun.findOne({where: { uuid: id_akun }});
      const biaya = await Biaya.findOne({
        where: { uuid: param.uuid_biaya },
      });

      if (!biaya) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data biaya tidak ada.",
          error: null,
        });
      }

      await biaya.update(
        { deskripsi, id_akun: akun.id, jumlah },
        { where: { uuid: param.uuid_pembelian } }
      );

      return res.status(200).json({
        status: true,
        response: null,
        message: "Biaya berhasil diubah.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteBiaya: async (req, res) => {
    try {
      const param = req.params;

      const biaya = await Biaya.findOne({
        where: {
          uuid: param.uuid_biaya,
        },
      });

      if (!biaya) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data biaya tidak ada.",
          error: null,
        });
      }

      await biaya.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Biaya berhasil dihapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = biayaCtrl;
