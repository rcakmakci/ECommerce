import e from "express";
const app = e();

app.get("/", (req, res) => {
  res.send("Uygulama Çalıştı");
});

app.listen(3000, () => {
  console.log("Server Started on the 3000 Port");
});
