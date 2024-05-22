import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const CartItem = sequelize.define("CartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export default CartItem;
