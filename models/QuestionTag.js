module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionTag",
    {
      questionTagId: {
        type: dataTypes.STRING(4),
        primaryKey: true,
      },
    },
    {
      tableName: "questions_tag",
    }
  );

  return model;
};
