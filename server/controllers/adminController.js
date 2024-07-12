// 3. Parti
import bcrypt from "bcrypt";

import User from "../models/user.js";
import Category from "../models/category.js";
import SubCategory from "../models/subCategory.js";
import SubSubCategory from "../models/subSubCategory.js";
import ThreeSubCategory from "../models/threeSubCategory.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";
import sequelize from "../config/database.js";

//  ! User
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
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

// ! CATEGORY
export const addBulkCategory = async (req, res) => {
  try {
    const { categories } = req.body;
    for (const category of categories) {
      const createdCategory = await Category.create({
        name: category.name,
      });
      for (const subCategory of category.subCategories) {
        const createdSubCategory = await SubCategory.create(
          {
            name: subCategory.name,
            CategoryId: createdCategory.id,
          },
          {
            include: [Category],
          }
        );
        for (const subSubCategory of subCategory.subCategories) {
          const createdSubSubCategory = await SubSubCategory.create(
            {
              name: subSubCategory.name,
              SubCategoryId: createdSubCategory.id,
            },
            {
              include: [SubCategory],
            }
          );
          for (const threeSubCategory of subSubCategory.subCategories) {
            const createdThreeSubCategory = await ThreeSubCategory.create(
              {
                name: threeSubCategory.name,
                SubSubCategoryId: createdSubSubCategory.id,
              },
              {
                include: [SubSubCategory],
              }
            );
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.length > 0) {
      res.status(200).json({
        data: categories,
        msg: "Kategoriler başarılı bir şekilde listelendi",
      });
    } else {
      res.status(400).json({
        error: "Listelenecek kategori yok",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json({
        data: category,
        msg: "Kategori bilgisi alındı",
      });
    } else {
      res.status(400).json({
        error: "Kategori bilgileri alınamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    if (category) {
      res.status(200).json({
        data: category,
        msg: "Kategori başarılı bir şekilde eklendi",
      });
    } else {
      res.status(400).json({
        error: "Kategori eklenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.destroy({
      where: {
        id: id,
      },
    });
    if (category.length > 0) {
      res.status(200).json({
        msg: "Kategori başarılı bir şekilde silindi",
      });
    } else {
      res.status(400).json({
        error: "Kategori silinemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const [row, updatedCategory] = await Category.update(
      { name: name },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    if (row.length > 0) {
      res.status(200).json({
        data: updatedCategory,
        msg: "Kategori başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Kategori güncellenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

// ! SUB CATEGORY
export const getAllSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll();
    if (subCategories.length > 0) {
      res.status(200).json({
        data: subCategories,
        msg: "Alt Kategoriler başarıyla listelendi",
      });
    } else {
      res.status(400).json({
        error: "Listelenecek Alt KAtegori bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      res.status(200).json({
        data: subCategory,
        msg: "Alt Kategori bilgisi alındı",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const subCategory = await SubCategory.create({ name: name });
    if (subCategory) {
      res.status(200).json({
        data: subCategory,
        msg: "Alt Kategori Başarılı bir şekilde eklendi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori eklenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subCategory = await SubCategory.destroy({
      where: {
        id: id,
      },
    });
    if (subCategory) {
      res.status(200).json({
        msg: "Alt Kategori silindi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori silinemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const [row, updatedSubCategory] = await SubCategory.update(
      { name: name },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    if (row.length > 0) {
      res.status(200).json({
        data: updatedSubCategory,
        msg: "Alt Kategori başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori güncellenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

// ! SUB SUB CATEGORY
export const getAllSubSubCategory = async (req, res) => {
  try {
    const subSubCategories = await SubSubCategory.findAll();
    if (subSubCategories.length > 0) {
      res.status(200).json({
        data: subSubCategories,
        msg: "Alt Kategoriler başarıyla listelendi",
      });
    } else {
      res.status(400).json({
        error: "Listelenecek Alt KAtegori bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getSubSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subSubCategory = await SubSubCategory.findByPk(id);
    if (subSubCategory) {
      res.status(200).json({
        data: subSubCategory,
        msg: "Alt Kategori bilgisi alındı",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
};

export const addSubSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const subSubCategory = await SubSubCategory.create({ name: name });
    if (subSubCategory) {
      res.status(200).json({
        data: subSubCategory,
        msg: "Alt Kategori Başarılı bir şekilde eklendi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori eklenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteSubSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subSubCategory = await SubSubCategory.destroy({
      where: {
        id: id,
      },
    });
    if (subSubCategory) {
      res.status(200).json({
        msg: "Alt Kategori silindi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori silinemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateSubSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const [row, updatedSubSubCategory] = await SubSubCategory.update(
      { name: name },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    if (row.length > 0) {
      res.status(200).json({
        data: updatedSubSubCategory,
        msg: "Alt Kategori başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori güncellenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

// ! THREE SUB CATEGORY
export const getAllThreeSubCategory = async (req, res) => {
  try {
    const threeSubCategories = await ThreeSubCategory.findAll();
    if (threeSubCategories.length > 0) {
      res.status(200).json({
        data: threeSubCategories,
        msg: "Alt Kategoriler başarıyla listelendi",
      });
    } else {
      res.status(400).json({
        error: "Listelenecek Alt KAtegori bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getThreeSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const threeSubCategory = await ThreeSubCategory.findByPk(id);
    if (threeSubCategory) {
      res.status(200).json({
        data: threeSubCategory,
        msg: "Alt Kategori bilgisi alındı",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
};

export const addThreeSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const threeSubCategory = await ThreeSubCategory.create({ name: name });
    if (threeSubCategory) {
      res.status(200).json({
        data: threeSubCategory,
        msg: "Alt Kategori Başarılı bir şekilde eklendi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori eklenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteThreeSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const threeSubCategory = await ThreeSubCategory.destroy({
      where: {
        id: id,
      },
    });
    if (threeSubCategory) {
      res.status(200).json({
        msg: "Alt Kategori silindi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori silinemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateThreeSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const [row, updatedThreeSubCategory] = await ThreeSubCategory.update(
      { name: name },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    if (row.length > 0) {
      res.status(200).json({
        data: updatedThreeSubCategory,
        msg: "Alt Kategori başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Alt Kategori güncellenemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

// ! Shop
export const getSellersWithoutShops = async (req, res) => {
  try {
    const sellersWithoutShops = await User.findAll({
      where: {
        role: "seller", // rolü "seller" olan kullanıcıları bul
      },
      // attributes: [
      //   "id", // kullanıcının id'sini al
      //   [sequelize.fn("COUNT", sequelize.col("Shop.id")), "shopCount"], // Shops.id'yi say ve shopCount olarak adlandır
      // ],
      include: [
        {
          model: Shop, // Shop modeli ile ilişkilendir
          required: false, // Mağazası olmayan kullanıcıların da dahil edilmesi için
          attributes: [], // Mağaza ile ilgili ek alanları dahil etme
        },
      ],
      group: ["User.id"], // Kullanıcıları id'lerine göre grupla
      having: sequelize.where(
        sequelize.fn("COUNT", sequelize.col("Shop.id")),
        "=",
        0
      ), // Mağazası olmayan kullanıcıları filtrele
    });
    if (sellersWithoutShops.length > 0) {
      res.status(200).json({
        data: sellersWithoutShops,
        msg: "Uygun satıcılar başarıyla listelendi",
      });
    } else {
      res.status(400).json({
        error: "Mağaza için uygun bir satıcı bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getAllShop = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    if (shops.length > 0) {
      res.status(200).json({
        data: shops,
        msg: "Tüm mağazalar başarılı bir şekilde listelendi",
      });
    } else {
      res.status(400).json({
        error: "Listelenecek mağaza bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getShop = async (req, res) => {
  try {
    const id = req.params.id;
    const shop = await Shop.findByPk(id);
    if (shop) {
      res.status(200).json({
        data: shop,
        msg: "Mağaza bilgisi başarılı bir şekilde alındı",
      });
    } else {
      res.status(400).json({
        error: "Mağaza bilgisi bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const addShop = async (req, res) => {
  try {
    const { name, CategoryId, UserId } = req.body;
    const seller = await User.findOne(
      {
        where: {
          id: UserId,
        },
      },
      {
        include: [Shop],
      }
    );
    if (seller.role == "seller" && !seller.Shop) {
      const shop = await Shop.create(
        {
          name: name,
          CategoryId: CategoryId,
          UserId: UserId,
        },
        {
          include: [Category, User],
        }
      );
      if (shop) {
        res.status(200).json({
          data: shop,
          msg: "Yeni mağaza başarılı bir şekilde kayıt edildi",
        });
      } else {
        res.status(400).json({
          error: "Mağaza kayıt edilemedi",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteShop = async (req, res) => {
  try {
    const id = req.params.id;
    const shop = await Shop.findByPk(id);
    if (shop) {
      await shop.destroy();
      res.status(200).json({
        data: shop,
        msg: "Mağaza başarılı bir şekilde silindi",
      });
    } else {
      res.status(400).json({
        error: "silmek istediğiniz mağaza bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateShop = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const shop = await Shop.findByPk(id);
    if (shop) {
      Object.keys(updateData).forEach((key) => {
        shop[key] = updateData[key];
      });
      await shop.save();

      res.status(200).json({
        data: shop,
        msg: "Mağaza başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Güncellemek istediğiniz mağaza bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

// ! Product
export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    if (product.length > 0) {
      res.status(200).json({
        data: product,
        msg: "Ürünler başarılı bir şekilde listelendi",
      });
    } else {
      res.status(400).json({
        error: "Listelenecek ürün bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json({
        data: product,
        msg: "Ürün bilgisi başarılı bir şekilde alındı",
      });
    } else {
      res.status(400).json({
        error: "Ürün bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await Product.create(productData);
    if (product) {
      res.status(200).json({
        data: product,
        msg: "Ürün başarılı bir şekilde kayıt edildi",
      });
    } else {
      res.status(400).json({
        error: "Ürün kayıt edilemedi",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const product = await Product.findByPk(id);
    if (product) {
      Object.keys(updateData).forEach((key) => {
        product[key] = updateData[key];
      });
      await product.save();

      res.status(200).json({
        data: product,
        msg: "Mağaza başarılı bir şekilde güncellendi",
      });
    } else {
      res.status(400).json({
        error: "Güncellemek istediğiniz mağaza bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).json({
        msg: "Ürün başarılı bir şekilde silindi",
      });
    } else {
      res.status(400).json({
        error: "Silmek istediğiniz ürün bulunamadı",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};
