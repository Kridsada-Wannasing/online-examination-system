module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("Meeting", {
    meetingId: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    examDate: {
      type: dataTypes.DATE,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
    });
    model.hasMany(models.StudentMeeting, {
      foreignKey: "meetingId",
    });
    model.belongsTo(models.Subject, {
      foreignKey: "subjectId",
    });
    model.hasOne(models.Examination, {
      foreignKey: "meetingId",
    });
  };

  return model;
};
