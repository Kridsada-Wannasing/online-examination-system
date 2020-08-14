module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Subject",
    {
      subjectId: {
        type: dataTypes.INTEGER(8),
        primaryKey: true,
        allowNull: false,
      },
      subjectName: {
        type: dataTypes.STRING(50),
      },
    },
    {
      tableName: "exams",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Exam, {
      foreignKey: "examId",
    });
  };

  return model;
};
