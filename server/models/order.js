import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
  adress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "Preparing", // Hazırlanıyor
      "Shipping", // Yolda
      "Delivered", // Teslim Edildi
      "Cancelled", // İptal Edildi
      "Refunded" // İade Edildi
    ),
  },
});

export default Order;
