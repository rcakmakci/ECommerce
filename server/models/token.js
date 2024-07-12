import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Token = sequelize.define("Token", {
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    device: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

export default Token;
