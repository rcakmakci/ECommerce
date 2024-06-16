import validator from "validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt-helper.js";
import Token from "../models/token.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, username, phone, password, role } =
            req.body;
        const errors = {};
        let existEmail = await User.findOne({
            where: {
                email: email,
            },
        });
        if (existEmail) {
            errors.email = "Bu E posta hesabı zaten kullanılıyor.";
        }
        let existUsername = await User.findOne({
            where: {
                username: username,
            },
        });
        if (existUsername) {
            errors.username = "Bu Username hesabı zaten kullanılıyor.";
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
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        error: "Şifreleme hatası",
                    });
                }
                // Store hash in your password DB.
                const user = await User.create({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    phone: phone,
                    password: hash,
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
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                error: "Lütfen geçerli kullannıcı adınızı giriniz",
            });
        }
        const usernameField = validator.isEmail(username)
            ? "email"
            : "username";
        const user = await User.findOne({
            where: {
                [usernameField]: username,
            },
        });
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                // result == true
                console.log(result);
                if (result) {
                    const userData = {
                        id: user._id,
                        username: user.username,
                        role: user.role,
                    };
                    const token = generateAccessToken(userData);
                    console.log("\n\n\nUSER AGENT: " + JSON.stringify(req.ua));
                    console.log(token);
                    const newToken = await Token.create(
                        {
                            token: token,
                            ip: req.ip,
                            device: req.ua,
                            UserId: user.id,
                        },
                        {
                            include: User,
                        }
                    );
                    if (newToken) {
                        return res.status(200).json({
                            message:
                                "Kullanıcı başarılı bir şekilde giriş yaptı",
                            token: newToken.token,
                            userAgent: newToken.device,
                            ip: newToken.ip,
                        });
                    } else {
                        return res.status(400).json({
                            error: "güvenlik hatası oluştu",
                        });
                    }
                } else {
                    return res.status(400).json({
                        error: "Geçersiz şifre girdiniz",
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: "Böyle bir kullanıcı bulunamadı",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
