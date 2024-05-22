import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define("Cart", {
  status: {
    type: DataTypes.ENUM("active", "pending", "completed", "canceled"),
  },
});

export default Cart;
