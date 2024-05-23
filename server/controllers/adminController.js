// 3. Parti
import bcrypt from "bcrypt";

import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length > 0) {
      res.status(200).json({
        data: users,
      });
    } else {
      res.status(400).json({
        error: "Veritabanında kayıtlı kullanıcı bulunamadı",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const errors = {};
    let existEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existEmail) {
      errors.email = "Bu E posta hesabı zaten kullanılıyor.";
    }
    let existPhone = await User.findOne({
      where: {
        phone: phone,
      },
    });
    if (existPhone) {
      errors.phone = "Bu Telefon numarası zaten kullanılıyor.";
    }
    if (Object.keys(errors).length > 0) {
      console.error(errors);
      return res.status(400).json({ errors });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
      role: role,
    });
    if (user) {
      res.status(200).json({
        data: user,
        message: "Kayıt işlemi başarıyla tamamlandı",
      });
    } else {
      res.status(400).json({
        error: "Kulllanıcı eklenemedi!",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(400).json({
        error: "Kullanıcı bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({
        data: user,
        msg: "Kullanıcı başarılı bir şekilde silindi",
      });
    } else {
      res.status(400).json({
        error: "silmek istediğiniz kullanıcı bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const user = await User.findByPk(id);
    if (user) {
      Object.keys(updateData).forEach((key) => {
        user[key] = updateData[key];
      });
      if (updateData.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
          updateData.password,
          saltRounds
        );
        user.password = hashedPassword;
        console.log("\n\n" + hashedPassword + "\n\n");
      }
      await user.save();

      res.status(200).json({
        data: user,
        msg: "Kullanıcı başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Güncellemek istediğiniz kullanıcı bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};
