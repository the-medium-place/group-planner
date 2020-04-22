
module.exports = function (sequelize, DataTypes) {
    const Task = sequelize.define("task", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Task.associate = function (models) {
        Task.belongsTo(models.event, {
            foreignKey: {
                allowNull: false
            }
        });

        Task.hasOne(models.collab);
    };

    return Task;

}