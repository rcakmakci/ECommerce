import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.TEXT,
    unique: true,
  },
});

SequelizeSlugify.slugifyModel(Category, {
  source: ["name"],
});

export default Category;
