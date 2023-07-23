const moment = require("moment");

const convertPrice = (price = 0) => {
  if (price) {
    var currency = price
      .toString()
      .match(/.{1,3}/g)
      .join(".");
    currency = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //replace sttring using regex
    return currency;
  } else {
    return price;
  }
};

const handleFilterDate = async ({ bulan = null, tahun = null, day = null }) => {
  bulan = bulan ? parseInt(bulan) : null;
  tahun = tahun ? parseInt(tahun) : null;
  day = day ? parseInt(day) : null;

  const nowDate = moment(new Date()).format("YYYY-MM-DD");
  const nowYear = moment(nowDate).year();

  const fromYear = tahun ? tahun : nowYear;
  const fromMonth = bulan ? bulan : 0;
  const fromDay = day ? day : 1;

  const toYear = tahun ? tahun : nowYear;
  const toMonth = bulan ? bulan : 11;
  const toDay = day ? day : 31;

  const from = moment(
    new Date(fromYear, fromMonth, fromDay, "00", "00")
  ).format("YYYY-MM-DD");
  const to = moment(new Date(toYear, toMonth, toDay, "23", "59")).format(
    "YYYY-MM-DD"
  );

  return {
    from,
    to,
  };
};

const globalHelper = {
  convertPrice,
  handleFilterDate,
};

module.exports = globalHelper;
