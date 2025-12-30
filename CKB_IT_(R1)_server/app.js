const express = require("express")
const cors = require('cors')

require('dotenv').config()
const connectDB = require("./config/db");
const adminRoutes = require('./routes/admin.route');
const teamRoutes = require('./routes/team.route');
const questionRoutes = require('./routes/questions.route');

const app = express()
const PORT = process.env.PORT || 8000


connectDB();


app.use(cors())
app.use(express.json())

app.use('/api', teamRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', questionRoutes);

app.get('/', (req,res)=>{
    res.json({
        msg: "Server is Properly Started!"
    })
})



app.listen(PORT, ()=>{
    console.log(`Server Started @PORT: ${PORT}`)
})