module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "ObjectiveQuestion",
    {
      objectiveQuestionId: {
        type: dataTypes.STRING(20),
        primary: true,
      },
      question: {
        type: dataTypes.STRING(255),
      },
      level: {
        type: dataTypes.INTEGER(2),
      },
      chioce1: {
        type: dataTypes.STRING(255),
      },
      chioce2: {
        type: dataTypes.STRING(255),
      },
      chioce3: {
        type: dataTypes.STRING(255),
      },
      chioce4: {
        type: dataTypes.STRING(255),
      },
      chioce5: {
        type: dataTypes.STRING(255),
      },
      chioce6: {
        type: dataTypes.STRING(255),
      },
      chioce7: {
        type: dataTypes.STRING(255),
      },
      chioce8: {
        type: dataTypes.STRING(255),
      },
      chioce9: {
        type: dataTypes.STRING(255),
      },
      chioce10: {
        type: dataTypes.STRING(255),
      },
    },
    },
    {
      tableName: "objective_questions",
    }
  );

  return model;
};
