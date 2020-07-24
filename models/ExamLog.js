module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "ExamLog",
    {
      examLogId: {
        type: dataTypes.INTEGER(8),
      },
      answer1: {
        type: dataTypes.STRING(50),
      },
      answer2: {
        type: dataTypes.STRING(50),
      },
      answer3: {
        type: dataTypes.STRING(50),
      },
      answer4: {
        type: dataTypes.STRING(50),
      },
      answer5: {
        type: dataTypes.STRING(50),
      },
    },
    {
      tableName: "exams",
    }
  );

  return model;
};
