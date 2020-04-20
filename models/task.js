
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
    
    // Task.associate = function (models) {
    //     // We're saying that a Task should belong to an Event
    //     // A Task can't be created without an Event due to the foreign key constraint
    //     Task.belongsTo(models.Event, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };


    // // associate to collab for foreign key
    // Task.associate = (models) => {
    //     Task.hasOne(models.Collab, {
    //         onDelete: "cascade"
    //     });
    // };


    return Task;

}