const moment = require("moment");
const { Op } = require("sequelize");
const ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const { Pembelian, Akun, Product, Biaya } = require("../models");
const globalHelper = require("../helper/globalHelper");

const laporanCtrl = {
  getLaporanHarianWaktu: async (req, res) => {
    try {
      const param = req.params;

      const month = new Date(param.waktu).getMonth();
      const year = new Date(param.waktu).getFullYear();

      const from = new Date(year, month, 01);
      const to = new Date(year, month, 31);

      const response = await Pembelian.findAll({
        where: {
          waktu: {
            [Op.between]: [from, to],
          },
        },
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data Pembelian tidak ada.",
          error: null,
        });
      }

      // Convert all data to dates data
      let tempArr = response.map((item) => {
        return item.waktu;
      });

      // Remove duplicate date from an array
      const DateDatas = [...new Set(tempArr.map((date) => date.toString()))];

      return res.status(200).json({
        status: true,
        response: {
          data: DateDatas,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Data Pembelian berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanHarianData: async (req, res) => {
    try {
      const param = req.params;

      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        where: { waktu: param.waktu },
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data jurnal tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: [
            "No",
            "Produk",
            "Harga",
            "Quantity",
            "Total Harga",
            "Pembayaran",
            "Akun",
            "Aksi",
          ],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanBulananWaktu: async (req, res) => {
    try {
      const param = req.params;

      const from = new Date(param.year, 0, 01);
      const to = new Date(param.year, 11, 31);

      const response = await Pembelian.findAll({
        where: {
          waktu: {
            [Op.between]: [from, to],
          },
        },
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data pembelian tidak ada.",
          error: null,
        });
      }

      // Convert all data to dates 1D array data
      let tempArr = response.map((item) => {
        return {
          month: new Date(item.waktu).getMonth().toString(),
          year: new Date(item.waktu).getFullYear().toString(),
        };
      });

      const tempDatas = [];
      //Remove Duplicates Item
      tempArr.map((x) =>
        tempDatas.filter((a) => a.month == x.month).length > 0
          ? null
          : tempDatas.push(x)
      );

      const dateDatas = tempDatas.map((item, index) => {
        return new Date(item.year, item.month, 01);
      });

      return res.status(200).json({
        status: true,
        response: {
          data: dateDatas,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Data pembelian berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanBulananData: async (req, res) => {
    try {
      const param = req.params;

      const month = new Date(param.waktu).getMonth();
      const year = new Date(param.waktu).getFullYear();

      const fromDate = new Date(year, month, 01);
      const toDate = new Date(year, month, 31);

      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
          waktu: {
            [Op.between]: [fromDate, toDate],
          },
        },
        order: [["waktu", "DESC"]],
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data jurnal tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: [
            "No",
            "Tanggal",
            "Produk",
            "Harga",
            "Quantity",
            "Total Harga",
            "Pembayaran",
            "Akun",
            "Aksi",
          ],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanTahunanWaktu: async (req, res) => {
    try {
      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        order: [["waktu", "DESC"]],
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data pembelian tidak ada.",
          error: null,
        });
      }

      // Convert all data to dates 1D array data
      let tempArr = response.map((item) => {
        return {
          month: new Date(item.waktu).getMonth().toString(),
          year: new Date(item.waktu).getFullYear().toString(),
        };
      });

      const tempDatas = [];
      //Remove Duplicates Item
      tempArr.map((x) =>
        tempDatas.filter((a) => a.year == x.year).length > 0
          ? null
          : tempDatas.push(x)
      );

      const dateDatas = tempDatas.map((item, index) => {
        return new Date(item.year, item.month, 01);
      });

      return res.status(200).json({
        status: true,
        response: {
          data: dateDatas,
          head: ["No", "Waktu", "Aksi"],
        },
        message: "Data pembelian berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanTahunanData: async (req, res) => {
    try {
      const param = req.params;
      const year = new Date(param.waktu).getFullYear();

      const fromDate = new Date(year, 01, 01);
      const toDate = new Date(year, 11, 31);

      const response = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
          waktu: {
            [Op.between]: [fromDate, toDate],
          },
        },
        order: [["waktu", "DESC"]],
      });

      if (!response) {
        return res.status(400).json({
          status: false,
          response: null,
          message: "Data jurnal tidak ada.",
          error: null,
        });
      }

      return res.status(200).json({
        status: true,
        response: {
          data: response,
          head: [
            "No",
            "Tanggal",
            "Produk",

            "Harga",
            "Quantity",
            "Total Harga",
            "Pembayaran",
            "Akun",
            "Aksi",
          ],
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getLaporanLabaRugi: async (req, res) => {
    try {
      const param = req.query;
      const from = new Date(param.awal);
      const to = new Date(param.akhir);

      const response = await Akun.findAll({
        include: [
          {
            model: Biaya,
            as: "biaya",
            required: false,
            where: {
              updatedAt: {
                [Op.between]: [from, to],
              },
            },
          },
          {
            model: Pembelian,
            as: "pembelian",
            required: false,
            where: {
              waktu: {
                [Op.between]: [from, to],
              },
            },
            include: [
              {
                model: Product,
                required: true,
                as: "product",
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              kategori: "revenue",
            },
            {
              kategori: "operational_expense",
            },
            {
              kategori: "cost_of_sales",
            },
          ],
        },
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      console.log(errors, "ERRORS??");
      return res.status(500).send(errors);
    }
  },
  getSummaryDashboard: async (req, res) => {
    try {
      const nowDate = moment(new Date()).format("YYYY-MM-DD");
      const years = moment(nowDate).year();
      const month = moment(nowDate).month();
      const date = moment(nowDate).date() + 1;
      const from = moment(new Date(years, month, "01", "00", "00"));
      const to = moment(new Date(years, month, date, "23", "59"));

      const dataBiaya = await Biaya.findAll({
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      const dataPembelian = await Pembelian.findAll({
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      let label = [];
      let value = [];
      for (let i = 1; i < date; i++) {
        let _labelDate = moment(new Date(years, month, i)).format("DD MMM");
        label.push(_labelDate);
      }
      for (let i = 0; i < label.length; i++) {
        const valueLabel = label[i];
        let count = 0;
        for (let j = 0; j < dataPembelian.length; j++) {
          const valuePembelian = dataPembelian[j];
          let _newDate = moment(valuePembelian.updatedAt).format("DD MMM");
          if (_newDate === valueLabel) count++;
        }
        value.push(count);
      }

      return res.status(200).json({
        status: true,
        response: {
          dataPembelian,
          dataBiaya,
          pembelian: {
            chartData: {
              label,
              data: value,
            },
            count: dataPembelian.length,
          },
          transaksi: dataPembelian.length + dataBiaya.length,
        },
        message: "Data dashboard berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      return res.status(500).send(errors);
    }
  },
  getLaporan: async (req, res) => {
    try {
      const { bulan = null, tahun = null } = req.query;
      const { from, to } = await globalHelper.handleFilterDate({
        bulan,
        tahun,
      });

      let dataPembelian = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      let dataBiaya = await Biaya.findAll({
        include: ["akun"],
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      return res.status(200).json({
        status: true,
        response: {
          data: [...dataPembelian, ...dataBiaya],
          // data: [],
          // akun: response
        },
        message: "Data Pembelian berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      return res.status(500).send(errors);
    }
  },
  printLaporan: async (req, res) => {
    try {
      const { bulan = null, tahun = null } = req.query;
      const { from, to } = await globalHelper.handleFilterDate({
        bulan,
        tahun,
      });
      let periode =
        bulan && tahun
          ? moment(from).format("MMMM YYYY")
          : `${moment(from).format("DD MMMM YYYY")} - ${moment(to).format(
              "DD MMMM YYYY"
            )}`;
      let dataPembelian = await Pembelian.findAll({
        include: ["akun", "product"],
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      let dataBiaya = await Biaya.findAll({
        include: ["akun"],
        where: {
          updatedAt: {
            [Op.between]: [from, to],
          },
        },
      });

      ejs.renderFile(
        path.join(__dirname, "../views/laporan.ejs"),
        {
          dataTable: [...dataPembelian, ...dataBiaya],
          periode,
          print_date: moment(new Date()).format("DD, MMMM YYYY"),
        },
        (err, data) => {
          if (err) return res.send(err);
          const base = path.resolve("public").replace(/\\/g, "/"); //
          let options = {
            base: "file:///" + base + "/",
            localUrlAccess: true,
            format: "A4",
            top: "0.4in", // default is 0, units: mm, cm, in, px
            right: "1.43in",
            bottom: "0.4in",
            left: "0.43in",
            quality: "10000",
            header: {
              height: "25mm",
            },
            footer: {
              height: "25mm",
            },
            httpHeaders: {
              "Content-type": "application/pdf",
            },
            type: "pdf",
            timeout: 100000,
          };
          pdf.create(data, options).toStream((err, pdfStream) => {
            if (err) {
              return res.sendStatus(500);
            }
            req.files = pdfStream;
            pdf.create(data).toStream((err, pdfStream) => {
              if (err) {
                return res.sendStatus(500);
              }
              res.statusCode = 200;
              pdfStream.on("end", () => {
                return res.end();
              });
              pdfStream.pipe(res);
            });
          });
        }
      );
    } catch (errors) {}
  },
  labaRugi: async (req, res) => {
    try {
      const { bulan = null, tahun = null } = req.query;
      const { from, to } = await globalHelper.handleFilterDate({
        bulan,
        tahun,
      });

      const response = await Akun.findAll({
        include: [
          {
            model: Biaya,
            as: "biaya",
            required: false,
            where: {
              updatedAt: {
                [Op.between]: [from, to],
              },
            },
          },
          {
            model: Pembelian,
            as: "pembelian",
            required: false,
            where: {
              waktu: {
                [Op.between]: [from, to],
              },
            },
            include: [
              {
                model: Product,
                required: true,
                as: "product",
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              kategori: "revenue",
            },
            {
              kategori: "operational_expense",
            },
            {
              kategori: "cost_of_sales",
            },
          ],
        },
      });

      return res.status(200).json({
        status: true,
        response: {
          data: response,
        },
        message: "Data jurnal berhasil diambil.",
        error: null,
      });
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
  printLaporanLaba: async (req, res) => {
    try {
      const { bulan = null, tahun = null, print = "N" } = req.query;
      const { from, to } = await globalHelper.handleFilterDate({
        bulan,
        tahun,
      });
      let periode =
        bulan && tahun
          ? moment(from).format("MMMM YYYY")
          : `${moment(from).format("DD MMMM YYYY")} - ${moment(to).format(
              "DD MMMM YYYY"
            )}`;
      const response = await Akun.findAll({
        include: [
          {
            model: Biaya,
            as: "biaya",
            required: false,
            where: {
              updatedAt: {
                [Op.between]: [from, to],
              },
            },
          },
          {
            model: Pembelian,
            as: "pembelian",
            required: false,
            where: {
              waktu: {
                [Op.between]: [from, to],
              },
            },
            include: [
              {
                model: Product,
                required: true,
                as: "product",
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              kategori: "revenue",
            },
            {
              kategori: "operational_expense",
            },
            {
              kategori: "cost_of_sales",
            },
          ],
        },
      });

      // OLAH DATA.
      let _dataStringify = JSON.stringify(response);
      let _dataParse = JSON.parse(_dataStringify);

      let laba = {
        revenue: {
          data: [],
          total: 0,
        },
        expense: {
          total: 0,
          data: [],
        },
        cos: {
          total: 0,
          data: [],
        },
      };

      _dataParse.forEach((value) => {
        if (value.kategori === "revenue") {
          value.pembelian.forEach((pembeli) => {
            const { price } = pembeli.product;
            laba.revenue.total = laba.revenue.total + price * pembeli.quantity;
            value.saldo = value.saldo + price * pembeli.quantity;
          });
          if (value.pembelian.length > 0) laba.revenue.data.push(value);
        } else if (value.kategori === "operational_expense") {
          value.biaya.forEach((biayas) => {
            laba.expense.total = laba.expense.total + biayas.jumlah;
            value.saldo = value.saldo + biayas.jumlah;
          });
          if (value.biaya.length > 0) laba.expense.data.push(value);
        } else if (value.kategori === "cost_of_sales") {
          value.biaya.forEach((biayas) => {
            laba.cos.total = laba.cos.total + biayas.jumlah;
            value.saldo = value.saldo + biayas.jumlah;
          });
          if (value.biaya.length > 0) laba.cos.data.push(value);
        }
      });

      if (print == "N") {
        return res.status(200).json({
          status: true,
          response: {
            data: laba,
          },
          message: "Data laba rugi berhasil diambil.",
          error: null,
        });
      } else if (print == "Y") {
        ejs.renderFile(
          path.join(__dirname, "../views/laba-rugi.ejs"),
          {
            data: laba,
            periode,
            print_date: moment(new Date()).format("DD, MMMM YYYY"),
            helper: globalHelper,
          },
          (err, data) => {
            if (err) return res.send(err);
            const base = path.resolve("public").replace(/\\/g, "/"); //
            let options = {
              base: "file:///" + base + "/",
              localUrlAccess: true,
              format: "A4",
              orientation: "landscape",
              top: "0.4in", // default is 0, units: mm, cm, in, px
              right: "1.43in",
              bottom: "0.4in",
              left: "0.43in",
              quality: "10000",
              // header: {
              //   height: "25mm",
              // },
              // footer: {
              //   height: "25mm",
              // },
              httpHeaders: {
                "Content-type": "application/pdf",
              },
              type: "pdf",
              timeout: 100000,
            };
            pdf.create(data, options).toStream((err, pdfStream) => {
              if (err) {
                return res.sendStatus(500);
              }
              req.files = pdfStream;
              pdf.create(data).toStream((err, pdfStream) => {
                if (err) {
                  return res.sendStatus(500);
                }
                res.statusCode = 200;
                pdfStream.on("end", () => {
                  return res.end();
                });
                pdfStream.pipe(res);
              });
            });
          }
        );
      }
    } catch (errors) {
      res.status(500).send(errors);
    }
  },
};

module.exports = laporanCtrl;
