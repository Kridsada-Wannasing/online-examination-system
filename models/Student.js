module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Student",
    {
      studentId: {
        type: dataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: dataTypes.STRING(50),
      },
      lastName: {
        type: dataTypes.STRING(50),
      },
      email: {
        type: dataTypes.STRING,
        unique: true,
      },
      password: {
        type: dataTypes.STRING,
      },
      faculty: {
        type: dataTypes.STRING(100),
      },
      department: {
        type: dataTypes.STRING(100),
      },
    },
    {
      tableName: "students",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.ExamLog, {
      foreignKey: "studentId",
    });
    model.hasMany(models.StudentMeeting, {
      foreignKey: "studentId",
    });
  };

  return model;
};
