module.exports = class ClientError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message, errors = []) {
    return new ClientError(400, message, errors);
  }
  static UnauthorizedError() {
    return new ClientError(401, "User is not authorized.");
  }
  static Forbidden() {
    return new ClientError(403, "You do not have permission to access this resource.");
  }
  static NotFound() {
    return new ClientError(404, "The page you are looking for was not found.");
  }
};
