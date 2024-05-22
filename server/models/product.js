import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

export default Product;
