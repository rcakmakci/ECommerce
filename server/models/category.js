import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Category;
