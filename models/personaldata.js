"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Personaldata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.hasMany(User, { foreignKey: "id_personaldata", as: "user" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Personaldata.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nickname: DataTypes.STRING,
      address: DataTypes.STRING,
      handphone: DataTypes.STRING,
      gender: DataTypes.STRING,
      occupation: DataTypes.STRING,
      birthday: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "personaldatas",
      modelName: "Personaldata",
    }
  );
  return Personaldata;
};
