import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.TEXT,
    unique: true,
  },
  picture: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT, // Yüzde olarak,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
      isFloat: true,
    },
    defaultValue: 0,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

SequelizeSlugify.slugifyModel(Product, {
  source: ["title"],
  overwrite: true,
});

export default Product;
