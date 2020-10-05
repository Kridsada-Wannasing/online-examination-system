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
    // examType: {
    //   type: dataTypes.STRING(20),
    // },
    // term: {
    //   type: dataTypes.INTEGER(1),
    // },
    // year: {
    //   type: dataTypes.INTEGER(4),
    // },
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
    // model.hasMany(models.Score, {
    //   foreignKey: "meetingId",
    // });
  };

  return model;
};
