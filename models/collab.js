module.exports = function (sequelize, DataTypes) {
    const Collab = sequelize.define("collab", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // // foreign key event id
    // Collab.associate = function (models) {
    //     // We're saying that a Task should belong to an Event
    //     // A Task can't be created without an Event due to the foreign key constraint
    //     Collab.belongsTo(models.Event, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };


    // // foreign key task id
    // Collab.associate = function (models) {
    //     // We're saying that a Task should belong to an Event
    //     // A Task can't be created without an Event due to the foreign key constraint
    //     Collab.belongsTo(models.Task, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     });
    // };


    // //foreign key cost id
    // Collab.associate = function (models) {
    //     // We're saying that a Task should belong to an Event
    //     // A Task can't be created without an Event due to the foreign key constraint
    //     Collab.belongsTo(models.Cost, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     });
    // };




    return Collab;
}