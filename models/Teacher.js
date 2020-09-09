module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Teacher",
    {
      teacherId: {
        type: dataTypes.INTEGER(4),
        primaryKey: true,
      },
      firstName: {
        type: dataTypes.STRING(50),
      },
      lastName: {
        type: dataTypes.STRING(50),
      },
      email: {
        type: dataTypes.STRING(50),
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
      tableName: "teachers",
      timestamps: false,
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Exam, {
      foreignKey: "teacherId",
    });
    model.hasMany(models.Meeting, {
      foreignKey: "meetingId",
    });
  };

  return model;
};
