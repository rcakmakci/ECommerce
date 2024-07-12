import e from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import parser from "ua-parser-js";
import { authentication } from "./middlewares/authentication.js";
const app = e();
dotenv.config();

import sequelize from "./config/database.js";
import "./models/relationship.js";
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Veritabanı Senkronize edildi");
    })
    .catch((err) => {
        console.log("Veritabanı Senkronizasyon hatası: ", err);
    });

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use((req, res, next) => {
    const ua = parser.UAParser(req.headers["user-agent"]);
    req.ua = ua;
    next();
});
app.use(e.json({ limit: "10mb" }));
app.use(e.urlencoded({ limit: "10mb", extended: true }));

app.use(authentication);
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started on the ${port} Port`);
});
