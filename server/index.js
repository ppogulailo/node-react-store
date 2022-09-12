require('dotenv').config()
const  express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors =require('cors')
const fileUpload = require('express-fileupload')
const router =require('./routes/index')
const errorHandler = require('./middleware/ErorHandMiddlware')
const path =require('path')

const PORT = process.env.PORT || 5000
const app =express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors())
app.use('/api',router)
app.use(fileUpload({}))
app.get('/',(req,res)=>{
    res.status(200).json({message:'WORKINGG!!!'})
})
// Обработака ошибок последний Middleware
app.use(errorHandler)

const start=async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Server access started on ${PORT} PORT`))
    }catch (e){
        console.log(e)
    }
}



start()