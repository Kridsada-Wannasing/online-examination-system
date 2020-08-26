module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Score",
    {
      scoreId: {
        type: dataTypes.INTEGER(8),
      },
      score: {
        type: dataTypes.INTEGER(3),
      },
    },
    {
      tableName: "exams",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
  };

  return model;
};
