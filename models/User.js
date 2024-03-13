const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true,'Email required'],
    unique: true,
    validate: {
      validator: function(v){
        return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
      },
      message: "Please enter a valid email"
    },
  }
});

const User = model("user", userSchema);

module.exports = User;
