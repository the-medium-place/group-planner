
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
    };


    // associate to collab for foreign key
    Task.associate = (models) => {
        Task.hasOne(models.collab, {
            onDelete: "SET NULL"
        });
    };


    return Task;

}