module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "ObjectiveAnswer",
    {
      objectiveAnswerId: {
        type: dataTypes.STRING(20),
        primary: true,
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
    },
    {
      tableName: "objective_answers",
    }
  );

  return model;
};
