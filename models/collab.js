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

      // each collaborator can have many events
      Collab.associate = function(models){
        Collab.hasMany(models.event);
    };

    // foreign key event id - each event can have multiple collaborators
    Collab.associate = function (models) {
        Collab.belongsTo(models.event, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    // foreign key task id - each event has multiple tasks
    Collab.associate = function (models) {
        Collab.belongsTo(models.task, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    //foreign key cost id - each event has multiple cost values
    Collab.associate = function (models) {
       Collab.belongsTo(models.cost, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Collab;
}