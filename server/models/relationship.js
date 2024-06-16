import User from "./user.js";
import Shop from "./shop.js";
import Product from "./product.js";
import Category from "./category.js";
import SubCategory from "./subCategory.js";
import SubSubCategory from "./subSubCategory.js";
import Order from "./order.js";
import OrderLine from "./orderLine.js";
import Cart from "./cart.js";
import CartItem from "./cartItem.js";
import Comment from "./comment.js";
import ThreeSubCategory from "./threeSubCategory.js";
import Token from "./token.js";

// ! User (Kullanıcı) ilişkileri
User.hasMany(Cart); // Bir kullanıcı birden fazla sepete sahip olabilir (Sadece 1 aktif sepete sahip olabilecek).
User.hasMany(Order); // Bir kullanıcı birden fazla siparişe sahip olabilir.
User.hasMany(Comment); // Bir kullanıcı birden fazla yoruma sahip olabilir.
User.hasOne(Shop); // Bir kullanıcı sadece bir mağazaya sahip olabilir.

// ! User (Token) ilişkileri
User.hasMany(Token); // Bir kullanıcı birden fazla oturuma sahip olabilecek.
Token.belongsTo(User); // Bir oturum sadece bir kullanıcıya ait olabilir.

// ! Product (Ürün) ilişkileri
Product.hasMany(Comment); // Bir ürün birden fazla yoruma sahip olabilir.
Product.belongsToMany(SubCategory, { through: "ProductSubCategory" }); // Bir ürün birden çok alt kategoriye ait olabilir.
Product.belongsToMany(SubSubCategory, { through: "ProductSubSubCategory" }); // Bir ürün birden çok 2. alt kategoriye ait olabilir.
Product.belongsToMany(ThreeSubCategory, { through: "ProductThreeSubCategory" }); // Bir ürün birden çok 3. alt kategoriye ait olabilir.
Product.belongsTo(Shop); // Bir ürün sadece bir mağazaya ait olabilir.

// ! Shop (Mağaza) ilişkileri
Shop.hasMany(Product); // Bir mağaza birden fazla ürüne sahip olabilir.
Shop.belongsTo(Category); // Bir mağaza sadece bir kategoriye ait olabilir.
Shop.belongsTo(User); // Bir mağaza sadece bir kullanıcıya ait olabilir (Satıcı rolü).

// ! Order (Sipariş) ilişkileri
Order.belongsTo(User); // Bir sipariş sadece bir kullanıcıya ait olabilir.
Order.hasMany(OrderLine); // Bir sipariş içinde birden fazla ürün olabilir.

// ! Cart (Sepet) ilişkileri
Cart.belongsTo(User); // Bir sepet sadece bir kullanıcıya ait olabilir.
Cart.hasMany(CartItem); // Bir sepet içinde birden fazla ürün olabilir.
CartItem.belongsTo(Cart); // Bir sepet ürünü sadece bir sepete ait olabilir.

// ! Comment (Yorum) ilişkileri
Comment.belongsTo(User); // Bir yorum sadece bir kullanıcıya ait olabilir.

// ! Category (Kategori) ilişkileri
Category.hasMany(SubCategory); // Bir kategori birden fazla alt kategoriye sahip olabilir.
SubCategory.belongsTo(Category); // Bir alt kategori sadece bir kategoriye ait olabilir.
SubCategory.hasMany(SubSubCategory); // Bir alt kategorinin de birden fazla alt kategorileri olabilir.
SubSubCategory.belongsTo(SubCategory); // İkinci bir alt kategori sadece bir ebeveyn kategoriye ait olabilir. Yani sadece bir Üst Kategorisi olabilir.
ThreeSubCategory.belongsTo(SubSubCategory); // 3. bir alt kategori sadece bir ebeveyne ait olabilir.
