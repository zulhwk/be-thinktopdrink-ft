"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pembelian, Biaya }) {
      // define association here
      this.hasMany(Pembelian, { foreignKey: "id_akun", as: "pembelian" });
      this.hasMany(Biaya, { foreignKey: "id_akun", as: "biaya" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Akun.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_akun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kode_akun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kategori: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saldo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0
      },
    },
    {
      sequelize,
      tableName: "akuns",
      modelName: "Akun",
    }
  );
  return Akun;
};
