module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("Meeting", {
    meetingId: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    examType: {
      type: dataTypes.STRING(20),
    },
    term: {
      type: dataTypes.INTEGER(1),
    },
    year: {
      type: dataTypes.INTEGER(4),
    },
    password: {
      type: dataTypes.STRING(10),
    },
    startExamDate: {
      type: dataTypes.DATE,
    },
    endExamDate: {
      type: dataTypes.DATE,
    },
    isPostpone: {
      type: dataTypes.BOOLEAN,
      default: false,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
    });
    model.belongsToMany(models.Student, {
      through: models.StudentMeeting,
      foreignKey: "meetingId",
    });
    model.belongsTo(models.Subject, {
      foreignKey: "subjectId",
    });
    model.hasMany(models.Score, {
      foreignKey: "meetingId",
    });
    model.belongsTo(models.Exam, {
      foreignKey: "examId",
    });
  };

  return model;
};
