const { Akun } = require("../models");

const akunCtrl = {
  postAkun: async (req, res) => {
    try {
      const { nama_akun, kode_akun, kategori } = req.body;
      const akun = await Akun.findOne({ where: { kode_akun } });

      if (akun) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Kode akun sudah ada.",
          err: {
            kode_akun: "Kode akun sudah ada."
          },
        });
      }

      const response = await Akun.create({
        nama_akun,
        kode_akun,
        kategori,
      });

      return res.status(200).json({
        status: true,
        response: {
          head: ["No", "Nama", "Waktu", "Aksi"],
          data: response,
        },
        message: "Akun berhasil dibuat.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  getAkun: async (req, res) => {
    try {
      const response = await Akun.findAll();

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data Akun tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: ["No", "Nama", "Kode", "Aksi"],
        },
        message: "Data akun berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  putAkun: async (req, res) => {
    try {
      const param = req.params;
      const { kode_akun, nama_akun } = req.body;

      const akun = await Akun.findOne({
        where: { uuid: param.uuid_akun },
      });

      if (akun.uuid !== param.uuid_akun) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data akun tidak ada.",
          error: null,
        });
      }

      await Akun.update(
        { nama_akun, kode_akun },
        { where: { uuid: param.uuid_akun } }
      );

      return res.status(200).json({
        status: true,
        response: null,
        message: "Akun berhasil diubah.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  deleteAkun: async (req, res) => {
    try {
      const param = req.params;
      console.log(param);

      const akun = await Akun.findOne({
        where: {
          uuid: param.uuid_akun,
        },
      });

      if (!akun) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data akun tidak ada.",
          error: null,
        });
      }

      await akun.destroy();

      return res.status(200).json({
        status: true,
        response: null,
        message: "Akun berhasil dihapus.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

module.exports = akunCtrl;
