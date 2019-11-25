const express = require('express')
const app = express()



app.use('/api',require('./helloWorld'))
app.use('/home',require('./dashboard'))
app.use('/dump',require('./dumpRoute'))
app.use('/users',require('./users'))
app.use('/drop',require('./dropdownsRoute'))
app.use('/work',require('./workOrderRoute'))


module.exports=app