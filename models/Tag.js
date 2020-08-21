module.exports = (sequelize, dataTypes) => {
  const model = sequelize.define(
    "Tag",
    {
      tagId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      tagName: {
        type: dataTypes.STRING(255),
      },
    },
    {
      tableName: "tags",
      timestamps: false,
      underscored: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.QuestionTag, {
      foreignKey: "tagId",
    });
  };

  return model;
};
