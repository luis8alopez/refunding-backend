const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const directionsRouter = require('./App/routes/directionsRoutes');

const port = process.env.PORT || 4000;



//DB config



//

//Middlewares
app.use(cors());
app.use(bodyParser.json());


//

//Routes
app.use('/api',directionsRouter);


//
app.listen(port,()=>{
    console.log("App running on port: ",port);
})