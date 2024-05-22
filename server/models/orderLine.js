import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const OrderLine = sequelize.define("OrderLine", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default OrderLine;
