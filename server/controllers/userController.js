export const getAllUser = (req, res) => {
  try {
    res.status(200).json({
      data: "Tüm kullanıcı bilgileri",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
