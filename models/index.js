const Pet = require("./Pet");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Pet, {
  foreignKey: "owner_id",
});

Pet.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
});

Comment.belongsTo(User, {
    foreignKey:"owner_id",
    as: "owner",
});

Pet.hasMany(Comment, {
    foreignKey:"pet_id",
    as: "pet"
});

module.exports = {
  Pet,
  User,
  Comment
};
