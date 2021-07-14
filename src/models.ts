const { DataTypes } = require('sequelize');
const { sequelize } = require('./db.ts');

export interface baseCasheir {
  firstName: string
  lastName: string
  age: number
  shiftId: number
  yearsOfExperience: number
  shopId: number
}

export interface CasheirInterface extends baseCasheir{
  id: number
}

const Shift = sequelize.define('shift', {
  shiftName: DataTypes.STRING,
  startOfShift: DataTypes.DATE,
  endOfShift: DataTypes.DATE,

}, {
  timestamps: false,
  freezeTableName: true,
});

const Shop = sequelize.define('shop', {
  shopName: DataTypes.STRING,
}, {
  timestamps: false,
  freezeTableName: true,
});

const Casheir = sequelize.define('casheir', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  age: DataTypes.INTEGER,
  shiftId: {
    type: DataTypes.INTEGER,
    references: {
      model: Shift,
      key: 'id',
    },
  },
  shopId: {
    type: DataTypes.INTEGER,
    references: {
      model: Shop,
      key: 'id',
    },
  },
  yearsOfExperience: DataTypes.INTEGER,
}, {
  timestamps: false,
  freezeTableName: true,
});

// Shop.hasMany(Casheir, { foreingKey: 'shopId', sourceKey: 'shopName' });
// Casheir.belongsTo(Shop, { foreingKey: 'shopId', targetKey: 'shopName' });

Casheir.belongsTo(Shop);
Casheir.belongsTo(Shift);
Shop.hasMany(Casheir);
Shift.hasMany(Casheir);

module.exports.Casheir = Casheir;
module.exports.Shop = Shop;
module.exports.Shift = Shift;
