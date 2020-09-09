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
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
  };

  return model;
};
