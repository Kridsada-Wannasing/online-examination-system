module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Score",
    {
      scoreId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      score: {
        type: dataTypes.INTEGER(3),
      },
      sum: {
        type: dataTypes.INTEGER(3),
      },
    },
    {
      tableName: "scores",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
    model.belongsTo(models.Subject, {
      foreignKey: "subjectId",
    });
    model.belongsTo(models.Meeting, {
      foreignKey: "meetingId",
    });
  };

  return model;
};
