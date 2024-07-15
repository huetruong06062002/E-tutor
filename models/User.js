const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {type: String},
  role: {
    type: String,
    enum: ["guest", "student", "tutor", "moderator", "admin"],
    default: "guest",
  },
  degree: String,
  skills: [String],
  identityInfo: String,
}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.post("save", async function (doc, next) {
  if (doc.role === "tutor") {
    try {
      const Tutor = mongoose.model("Tutor");
      const tutor = new Tutor({
        userId: doc._id,
        description: "Enter description here", // You can customize this based on your requirements
        ratings: [],
        info: {
          name: doc.name,
          image: "default_image_url", // Default image for tutor profile
          address: "Enter address here", // You can customize this based on your requirements
        },
        moreProducts: [],
      });
      await tutor.save();
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
