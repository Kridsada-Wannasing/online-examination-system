module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define("Section", {
    sectionId: {
      type: dataTypes.INTEGER(4),
      primaryKey: true,
    },
    section: {
      type: dataTypes.INTEGER(2),
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
  };

  return model;
};
