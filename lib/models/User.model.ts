import { models, model, Schema } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: [true, "this username already used, please chenged"],
    required: [true, "username is required"],
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  bookmarked: {
    type: Array,
    default: [],
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
});

const User =
  models.MOVIE_GUIDE_APP_USERS || model("MOVIE_GUIDE_APP_USERS", userSchema);

export default User;
