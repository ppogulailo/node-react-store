const sequeileze=require('../db')
const {DataTypes}=require('sequelize')

const User = sequeileze.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING,defaultValue:"USER"},
})
const Basket = sequeileze.define('basket',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},

})
const BasketDevice = sequeileze.define('basket_device',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},

})
const Device = sequeileze.define('device',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull: false},
    rating:{type:DataTypes.INTEGER,defaultValue: 0},
    img:{type:DataTypes.STRING,allowNull:false}
})

const Type = sequeileze.define('type',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},

})
const Brand = sequeileze.define('brand',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},

})
const Rating= sequeileze.define('rating',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    rate:{type:DataTypes.STRING,allowNull:false},

})
const DeviceInfo= sequeileze.define('device_info',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false}
})

const TypeBrand= sequeileze.define('type_brand',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand,{through:TypeBrand})
Brand.belongsToMany(Type,{through:TypeBrand})

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

module.exports = {
    User,
    BasketDevice,
    Basket,
    DeviceInfo,
    Device,
    TypeBrand,
    Type,
    Brand,
    Rating,

}