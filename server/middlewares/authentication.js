import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header: ", authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log(token);

        if (!token) {
            req.user = null;
            return next();
        } else {
            jwt.verify(token, "secret-key", (err, decoded) => {
                if (err) {
                    req.user = null;
                    return next();
                } else {
                    console.log(decoded);
                    req.user = decoded.userData;

                    return next();
                }
            });
        }
    } else {
        req.user = null;
        return next();
    }
};

export const requireAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        return next();
    } else {
        console.log(req.user);
        return res.sendStatus(403);
    }
};

export const notAuth = (req, res, next) => {
    if (!req.user) {
        return next();
    } else {
        return res.status(403).json({
            error: "Kullanıcı giriş yapmış zaten",
        });
    }
};

export const authrole = (...roles) => {
    return (req, res, next) => {
        if (req.user && req.user?.role && roles.includes(req.user.role)) {
            console.log(req.user.role);
            return next();
        } else {
            return res.sendStatus(403);
        }
    };
};
