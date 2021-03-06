module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Admin",
    {
      adminId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: dataTypes.STRING(50),
      },
      lastName: {
        type: dataTypes.STRING(50),
      },
      email: {
        type: dataTypes.STRING,
      },
      password: {
        type: dataTypes.STRING,
      },
    },
    {
      tableName: "admins",
      timestamps: false,
    }
  );

  return model;
};
