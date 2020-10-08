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
