module.exports = function (sequelize, DataTypes) {
    const Event = sequelize.define("event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
            // allowNull: false
        },
        location: {
            type: DataTypes.STRING
            // allowNull: false
        },
        date_time: {
            type: DataTypes.DATE // format for DATETIME: YYYY-MM-DD hh:mm:ss
        }

    });

    // each collab can be part of multiple events - junction table of "collab-events"
    Event.associate = function (models) {
        Event.belongsToMany(models.collab,{through: "collabEvents"});
    };

    // associate to task for foreign key
    Event.associate = function (models) {
        Event.hasMany(models.task, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });
    };

    // associate to cost for foreign key
    Event.associate = (models) => {
        Event.hasMany(models.cost, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });
    };

  


    return Event;
}