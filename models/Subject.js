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
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Exam, {
      foreignKey: "examId",
    });
  };

  return model;
};
