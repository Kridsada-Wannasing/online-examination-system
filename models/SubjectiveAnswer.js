module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "SubjectiveAnswer",
    {
      subjectiveAnswerId: {
        type: dataTypes.STRING(20),
        primaryKey: true,
      },
      keyword1: {
        type: dataTypes.STRING(255),
      },
      keyword2: {
        type: dataTypes.STRING(255),
      },
      keyword3: {
        type: dataTypes.STRING(255),
      },
    },
    {
      tableName: "subjective_answers",
    }
  );

  return model;
};
