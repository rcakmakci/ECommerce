import jwt from "jsonwebtoken";

export const generateAccessToken = (userData) => {
    return jwt.sign(userData, "secret-key", { expiresIn: "1m" });
};
