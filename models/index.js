const Pet = require("./Pet");
const User = require("./User");

User.hasMany(Pet, {
  foreignKey: "owner_id",
});

Pet.belongsTo(User, {
  foreignKey: "owner_id",
});

module.exports = {
  Pet,
  User
};
