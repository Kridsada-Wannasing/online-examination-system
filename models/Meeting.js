module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("Meeting", {
    meetingId: {
      type: dataTypes.INTEGER(4),
      primaryKey: true,
    },
    examDate: {
      type: dataTypes.DATE(6),
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
    model.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
    });
    model.belongsTo(models.Section, {
      foreignKey: "sectionId",
    });
  };

  return model;
};
