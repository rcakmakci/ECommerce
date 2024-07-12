import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

const ThreeSubCategory = sequelize.define("ThreeSubCategory", {
  name: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.TEXT,
    unique: true,
  },
});

SequelizeSlugify.slugifyModel(ThreeSubCategory, {
  source: ["name"],
  overwrite: true,
});

export default ThreeSubCategory;
