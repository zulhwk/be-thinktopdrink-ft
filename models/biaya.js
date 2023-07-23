"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Biaya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Akun }) {
      this.belongsTo(Akun, { foreignKey: "id_akun", as: "akun" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        id_akun: undefined
      };
    }
  }
  Biaya.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      id_akun: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "biayas",
      modelName: "Biaya",
    }
  );
  return Biaya;
};
