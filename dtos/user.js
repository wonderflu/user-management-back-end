class UserDto {
  id;
  role;
  constructor(model) {
    this.id = model._id;
    this.role = model.role;
  }
}

module.exports = UserDto;
