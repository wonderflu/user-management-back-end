module.exports = class ClientError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new ClientError(401, "User is not authorized.");
  }
  static BadRequest(message, errors = []) {
    return new ClientError(400, message, errors);
  }
  static Forbidden() {
    return new ClientError(403, "You do not have permission to access this resource");
  }
};
