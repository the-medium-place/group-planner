module.exports = function (sequelize, DataTypes) {
    const Cost = sequelize.define("cost", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        purchased: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });


    // // associate to collab for foreign key
    // Cost.associate = function (models) {
    //     // We're saying that a Task should belong to an Event
    //     // A Task can't be created without an Event due to the foreign key constraint
    //     Cost.belongsTo(models.Event, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    
    // Cost.associate = (models) => {
    //     Cost.hasOne(models.Collab, {
    //         onDelete: "cascade"
    //     });
    // };



    return Cost;
}