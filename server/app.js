import e from "express";
import dotenv from "dotenv";
import cors from "cors";
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

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

// Router Codes
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server Started on the ${port} Port`);
});
