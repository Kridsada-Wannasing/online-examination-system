module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Question",
    {
      questionId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      questionType: {
        type: dataTypes.STRING(10),
      },
      question: {
        type: dataTypes.STRING(255),
      },
      level: {
        type: dataTypes.INTEGER(1),
      },
      // score: {
      //   type: dataTypes.INTEGER(3),
      // },
    },
    {
      tableName: "questions",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.QuestionExam, {
      foreignKey: "questionId",
    });
    model.hasMany(models.Answer, {
      foreignKey: "questionId",
    });
    model.hasMany(models.Choice, {
      foreignKey: "questionId",
    });
    // model.hasMany(models.QuestionTag, {
    //   foreignKey: "questionId",
    // });
  };

  return model;
};
