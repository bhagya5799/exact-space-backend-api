const express = require('express')
const mongoose = require('mongoose')
const RestApi = require('./model')
const app = express();
const cors = require('cors')
app.use(express.json())

const db = "mongodb+srv://bhagyashree:bhagyashree@cluster0.063mmqv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db).then(() => console.log('db connected')).catch((err) => console.log(err))


app.use(cors())
app.post('/getall', async (request, response) => {
    const { name, emailId, password } = request.body
    try {
        const newData = new RestApi({ name, emailId, password })
        await newData.save()
    
        const resVal = await RestApi.find()
        let result=false
      resVal.map(eachUser => {
        if (eachUser.name == name && eachUser.emailId == emailId){
            result=true
        }
      })
      if (result == true){
        response.send({status: false, message: "User already existed", })
        response.status(400)
      }
        else{
            response.send({status: true, message: " UserUpdated success"})
        }
    }
    catch (err) {
        console.log(err.message)
    }
})

app.post('/login', async (request, response) => {
    const { emailId, password } = request.body
    try {
        const resVal = await RestApi.find()
        let result = null
        const getValue = resVal.map(eachUser => {
            if (emailId == eachUser.emailId && password == eachUser.password) {
                result = true
            }
        })
        if (result == true) {
            response.send({ status: true, message: "Login SuccessFull" })
        }
        else {
            response.send(({ status: false, message: " Invalid User" }))
            response.status(400)

        }
    }
    catch (err) {
        se
        console.log(err.message)
    }
})

app.get('/', async (request, response) => {
    try {
        return response.json(await RestApi.find())
    }
    catch (err) {
        console.log(err.message)
    }
})


app.get('/getOneData/:id', async (request, response) => {
    const { id } = request.params
    try {
        const idVal = await RestApi.findById(id)
        response.send(idVal)
    }
    catch (err) {
        console.log(err.message)
    }

})


app.put('/updateVal/:id', async (request, response) => {
    const { id } = request.params
    try {
        await RestApi.findOneAndUpdate({ _id: id }, request.body)

    }
    catch (err) {
        console.log(err.message)
    }
})


app.delete('/deleteVal/:id', async (request, response) => {
    const { id } = request.params.id
    try {
        await RestApi.findOneAndDelete(id)
        return response.json(await RestApi.find())

    }
    catch (err) {
        console.log(err.message)
    }
})


app.listen(process.env.PORT || 3007, () => console.log('running'))