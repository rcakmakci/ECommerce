import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

const SubSubCategory = sequelize.define("SubSubCategory", {
  name: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.TEXT,
    unique: true,
  },
});

SequelizeSlugify.slugifyModel(SubSubCategory, {
  source: ["name"],
});

export default SubSubCategory;
