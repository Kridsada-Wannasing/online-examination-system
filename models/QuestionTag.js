module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "QuestionsTag",
    {
      questionsTagsId: {
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
