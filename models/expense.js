module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define(
    "Expense",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0.01
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      updatedAt: false
    }
  );

  return Expense;
};
