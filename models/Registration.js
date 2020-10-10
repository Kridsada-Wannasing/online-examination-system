module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Registration",
    {
      registrationId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      tableName: "registrations",
      underscored: false,
    }
  );

  // model.associate = (models) => {
  //   model.belongsTo(models.Subject, {
  //     foreignKey: "subjectId",
  //   });
  //   model.belongsTo(models.Student, {
  //     foreignKey: "studentId",
  //   });
  // };

  return model;
};
