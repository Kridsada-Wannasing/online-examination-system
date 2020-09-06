module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Examination",
    {
      examinationId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      password: {
        type: dataTypes.STRING(10),
      },
      startDate: {
        type: dataTypes.DATE,
      },
      endDate: {
        type: dataTypes.DATE,
      },
      startExam: {
        type: dataTypes.BOOLEAN,
      },
    },
    {
      tableName: "examinations",
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Meeting, {
      foreignKey: "meetingId",
    });
  };

  return model;
};
