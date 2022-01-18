const isAdmin = (request, response, next) => {
  try {
    if (["POST", "PATCH", "PUT", "DELETE"].indexOf(request.method) > -1) {
      if (request.user.role != "ADMIN") {
        throw new Error("Forbidden: You do not have permission to access this resource");
      }
    }
    next();
  } catch (e) {
    console.log(e);
    return response
      .status(403)
      .json({ message: "Forbidden: You do not have permission to access this resource" });
  }
};

module.exports = isAdmin;
