module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("Admin", {
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
      type: dataTypes.STRING(0),
    },
    password: {
      type: dataTypes.STRING,
    },
  });

  return model;
};
