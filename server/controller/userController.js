const ApiError =require('../eror/ApiEror')
const bcrypt= require('bcrypt')
const {User,Basket}=require('../models/models')
const jsonwebtoken =require('jsonwebtoken')

const generateJwt=(id,email,role)=>{
    return jsonwebtoken.sign({id,email,role},process.env.SECRET_KEY,{expiresIn:'24h'})
}

class UserController{
    async registration(req,res,next){
        const {email,password, role}= req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некоректный email или password'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const  hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,role,password:hashPassword})
        const basket =await  Basket.create({userId:user.id})
        const token =generateJwt(user.id,user.email,user.role)
        return  res.json({token})
    }
    async login(req,res,next){
        const {email, password} = req.body
        const user = await  User.findOne({where:{email}})
        if (!user){
            return next(ApiError.badRequest('Не задан ID'))
        }
        const comparePassword = bcrypt.compareSync(password,user.password)
        if (!comparePassword){
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        // const {id} =req.query
        // if (!id){
        //     return next(ApiError.badRequest('Не задан  ID'))
        // }
        // res.json(id)
        res.json({message:"ALL RIGHT"})
        const token = generateJwt(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }
}
module.exports= new UserController()