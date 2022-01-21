const { v4: uuid } = require("uuid");
const path = require("path");

class FileService {
  saveFile(file) {
    try {
      const fileName = uuid() + ".jpg";
      const filePath = path.resolve("avatars", fileName);
      file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileService();
