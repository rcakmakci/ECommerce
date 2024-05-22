import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const SubCategory = sequelize.define("SubCategory", {
  name: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default SubCategory;
