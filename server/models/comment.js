import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define("Comment", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Comment;
