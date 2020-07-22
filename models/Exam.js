module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Exam",
    {
      examId: {
        type: dataTypes.INTEGER(4),
        primaryKey: true,
      },
      examType: {
        type: dataTypes.STRING(20),
      },
      term: {
        type: dataTypes.INTEGER(1),
      },
      year: {
        type: dataTypes.INTEGER(4),
      },
      examName: {
        type: dataTypes.STRING(100),
      },
      format: {
        type: dataTypes.BOOLEAN,
      },
      authority: {
        type: dataTypes.BOOLEAN,
      },
    },
    {
      tableName: "exams",
    }
  );

  return model;
};
