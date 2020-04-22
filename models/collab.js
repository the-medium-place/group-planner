const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    const Collab = sequelize.define("collab", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            // allowNull: false
        }
    });

    // each collaborator can have many events
    Collab.associate = function (models) {
        Collab.hasMany(models.event);
    };

    // each collab can have one task
    Collab.associate = function (models) {
        Collab.hasOne(models.task);
    };

      // each collab can have one task
      Collab.associate = function (models) {
        Collab.hasOne(models.cost);
    };

    // foreign key event id - each event can have multiple collaborators
    Collab.associate = function (models) {
        Collab.belongsToMany(models.event, {
<<<<<<< HEAD
            through: 
=======
            foreignKey: {
                allowNull: false
            }
>>>>>>> bbab6c1966a2b9002a7abe7f503df25a7ba5cf7a
        });
    };

    // foreign key task id - each collab has one task
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

    // encrypt user password before creation of user model
    Collab.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    return Collab;
}