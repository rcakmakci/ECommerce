import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Shop = sequelize.define("Shop", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
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

export default Shop;
