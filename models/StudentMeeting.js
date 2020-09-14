module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("StudentMeeting", {
    studentMeetingId: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Meeting, {
      foreignKey: "meetingId",
    });
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
  };

  return model;
};
