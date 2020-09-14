module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Subject",
    {
      subjectId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      subjectName: {
        type: dataTypes.STRING(50),
      },
    },
    {
      tableName: "subjects",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Exam, {
      foreignKey: "subjectId",
    });
    model.hasMany(models.Meeting, {
      foreignKey: "subjectId",
    });
  };

  return model;
};
