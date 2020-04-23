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

    // each collab can be part of multiple events - junction table of "collabEvents"
    Event.associate = function (models) {
        Event.belongsToMany(models.collab,{through: "collabEvents"});
        Event.hasMany(models.task, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });
        Event.hasMany(models.cost, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Event;
}