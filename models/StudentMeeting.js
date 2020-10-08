module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "StudentMeeting",
    {
      isReading: {
        type: dataTypes.BOOLEAN,
        default: false,
      },
    },
    {
      tableName: "student_meetings",
      timestamps: false,
      underscored: false,
    }
  );

  return model;
};
