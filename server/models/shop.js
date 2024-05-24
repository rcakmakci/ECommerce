import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

const Shop = sequelize.define("Shop", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.TEXT,
    unique: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  secure: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

SequelizeSlugify.slugifyModel(Shop, {
  source: ["name"],
  overwrite: true,
});

export default Shop;
