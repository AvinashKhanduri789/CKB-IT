const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.methods.isPasswordCorrect = async function(password){
    return await this.password===password
}

const Admin = mongoose.model("Admin", schema);

module.exports = Admin;
