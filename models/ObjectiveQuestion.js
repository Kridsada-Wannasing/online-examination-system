module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "ObjectiveQuestions",
    {
      ObjectiveQuestionId: {
        type: dataTypes.STRING(20),
        primary: true,
      },
      Question: {
        type: dataTypes.STRING(255),
      },
      Level: {
        type: dataTypes.INTEGER(2),
      },
      Chioce1: {
        type: dataTypes.STRING(255),
      },
      Chioce2: {
        type: dataTypes.STRING(255),
      },
      Chioce3: {
        type: dataTypes.STRING(255),
      },
      Chioce4: {
        type: dataTypes.STRING(255),
      },
      Chioce5: {
        type: dataTypes.STRING(255),
      },
      Chioce6: {
        type: dataTypes.STRING(255),
      },
      Chioce7: {
        type: dataTypes.STRING(255),
      },
      Chioce8: {
        type: dataTypes.STRING(255),
      },
      Chioce9: {
        type: dataTypes.STRING(255),
      },
      Chioce10: {
        type: dataTypes.STRING(255),
      },
    },
    {
      tableName: "objective_questions",
    }
  );

  return model;
};
