const express  =  require('express');
const app = express();
const cors = require('cors');

const PORT  = process.env.PORT || 5000
const getCnpj = require('./src/midleware/fetchData');


app.use(cors());
app.use(express.json());

app.get('/',async (req,res) =>{
  let data  = await getCnpj(req.query.domain);
  res.json(
    data);
} );
  

app.listen(PORT, () =>{ console.log('runing...')  });
