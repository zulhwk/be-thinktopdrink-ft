"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Akun, Product }) {
      this.belongsTo(Akun, { foreignKey: "id_akun", as: "akun" });
      this.belongsTo(Product, { foreignKey: "id_product", as: "product" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        id_akun: undefined,
        id_product: undefined,
      };
    }
  }
  Pembelian.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tipe: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama akun harus ada." },
          notEmpty: { msg: "Nama akun tidak boleh kosong." },
        },
      },
      waktu: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_akun: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "pembelians",
      modelName: "Pembelian",
    }
  );
  return Pembelian;
};
