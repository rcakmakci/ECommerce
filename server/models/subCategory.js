import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

const SubCategory = sequelize.define("SubCategory", {
  name: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.TEXT,
    unique: true,
  },
});

SequelizeSlugify.slugifyModel(SubCategory, {
  source: ["name"],
  overwrite: true,
});

export default SubCategory;
