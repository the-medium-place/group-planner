const models = require("../models");

module.exports = function(sequelize, DataTypes) {
    const Event = sequelize.define("event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_time: {
            type: DataTypes.DATE // format for DATETIME: YYYY-MM-DD hh:mm:ss
        }

    });

    
    // // associate to task for foreign key
    // Event.associate = function(models){
    //     Event.hasMany(models.Task, {
    //         onDelete: "cascade"
    //     });
    // };

    
    // // associate to cost for foreign key
    // Event.associate = (models) => {
    //     Event.hasMany(models.Cost, {
    //         onDelete: "cascade"
    //     });
    // };

    
    // // associate to collab for foreign key
    // Event.associate = (models) => {
    //     Event.hasMany(models.Collab, {
    //         onDelete: "cascade"
    //     });
    // };


    return Event;
    

}