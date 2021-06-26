const jwt = require("jsonwebtoken");
const models = require("../models/index");

// protect routes
exports.protects = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // make sure token exist
  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "cookie token is empty"
    });
  }

  // verify user
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const data = await models.User.findOne({
      where: { id: decode.id, email: decode.email },
      raw: true,
      nested: true,
    });

    req.user = {
      id: data.id,
      email: data.email,
      fullname: data.fullname,
      role: data.role,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };

    next();
  } catch (error) {
    console.error(error.message, "<< error jwt");
    return res.status(401).json({
      "code": 401,
      "message": "signature is invalid"
    });
  }
};

// grant access to spesific roles
exports.permission = (condition) => {
  return (req, res, next) => {
    if (!condition.includes(req.user.role)) {
      return res.status(401).json({
        code: 401,
        message: "not allowed to access"
      })
    }
    next();
  };
};
