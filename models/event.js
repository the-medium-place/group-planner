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
            type: DataTypes.DATETIME // format for DATETIME: YYYY-MM-DD hh:mm:ss
        }

    })
    return Event;
    

}