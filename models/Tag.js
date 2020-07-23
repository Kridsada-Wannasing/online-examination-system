module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Tag",
    {
      tagId: {
        type: dataTypes.INTEGER(4),
        primaryKey: true,
      },
      tagName: {
        type: dataTypes.STRING(255),
      },
    },
    {
      tableName: "tags",
    }
  );

  model.associate = (model) => {
    model.hasMany(model.QuestionTag, {
      foreignKey: "tagId",
    });
  };

  return model;
};
