//require the correct modules
const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const bcrypt = require("bcrypt");

//extend sequelize model on class Users
class Users extends Model {
  //Instance method to check if the form submitted password matches the saved user's encrypted password
  async validatePass(provided_password) {
    //bcrypt compare returns a boolean, based on if the string matches the encrypted string or not
    const is_valid = await bcrypt.compare(provided_password, this.password);
    return is_valid;
  }
}
//Init Users and ttheir attributes
Users.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 6,
      },
    },
  },
  {
    sequelize: db,
    modelName: "Users",
    hooks: {
      // Do something right before the user is stored to the table
      async beforeCreate(Users) {
        //bcrypt will return an encrypted string mixing the standard password string with 10 levels of salt
        const encrypted_pass = await bcrypt.hash(Users.password, 10);
        //Store the encrypted password to the database instead of the standard string
        Users.password = encrypted_pass;
      },
    },
  }
);

//export the Users Model to other parts of the application
module.exports = Users;
