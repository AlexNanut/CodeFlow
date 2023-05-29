const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CodeSnippet extends Model {}

CodeSnippet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    code: {
      type: DataTypes.STRING,
    },
    // explanation: {
    //   type: DataTypes.STRING,
    // },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    module_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "module",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "code_snippet",
  }
);
module.exports = CodeSnippet;
