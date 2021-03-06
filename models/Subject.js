module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Subject",
    {
      subjectId: {
        type: dataTypes.STRING(8),
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
    model.hasMany(models.Score, {
      foreignKey: "subjectId",
    });
  };

  return model;
};
