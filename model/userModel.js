const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ProfileSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profile_picture: {
    type: String,
  },
  // Teacher-specific fields
  qualification: {
    type: String,
  },
  experience_years: {
    type: Number,
  },
  specialization: {
    type: String,
  },
  // Student-specific fields
  grade_level: {
    type: String,
  },
  parent_contact: {
    type: String,
  },
  emergency_contact: {
    type: String,
  },
});

// Define the user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description:{
      type:String,
      required: false,
    },
    image:{
      type:String,
      required:true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: ProfileSchema,
    role: {
      type: String,
      enum: ["teacher", "student", "admin"],
      default: "student",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Password hashing middleware: before saving a user, hash the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Create the model from the schema
const USER = mongoose.model("user", userSchema);
// Export the USER model to use it in controllers
module.exports = USER;
