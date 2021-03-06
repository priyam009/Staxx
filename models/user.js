module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ["^[a-z]+$", "i"]
        }
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          is: ["^[a-z]+$", "i"]
        }
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        },
        defaultValue: 0
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "week"
      }
    },
    {
      timestamps: true,
      updatedAt: false
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Expense, {
      onDelete: "cascade"
    });
  };

  return User;
};
