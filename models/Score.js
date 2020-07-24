module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Score",
    {
      scoreId: {
        type: dataTypes.INTEGER(8),
      },
      score: {
        type: dataTypes.INTEGER(3),
      },
    },
    {
      tableName: "exams",
    }
  );

  return model;
};
