const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Request = require('../middleware/requestlog')
const db = require('../db/index');


//const responseTime = require('response-time');
 //const xml = require('xml')
const  Estimator = require('./estimatorCal')

const xml = require ('xml2js')

router.post('/',Request.logRequest, async (req, res) => {

    
   //  const output1 = (Estimator.covid19ImpactEstimator(req.body))
  
    return res.status(200).send(req.body);

});

router.get('/users/:id',Request.logRequest, async (req, res) => {

    const getAllQ = 'SELECT * FROM users WHERE id= $1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.id]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
    //  const output1 = (Estimator.covid19ImpactEstimator(req.body))
 
 });

 router.get('/admin/:uname',Request.logRequest, async (req, res) => {

    const getAllQ = 'SELECT * FROM users WHERE uname= $1';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.uname]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
    //  const output1 = (Estimator.covid19ImpactEstimator(req.body))
 
 });

router.post('/json', Request.logRequest, async (req, res) => {

    
     const output1 = (Estimator.covid19ImpactEstimator(req.body))
  
    return res.status(200).send(output1);

});

router.post('/xml', Request.logRequest, async (req, res) => {
const builder = new xml.Builder({
    renderOpts: {
        pretty: false
    }
})
    

     const output1 = (Estimator.covid19ImpactEstimator(req.body))
  res.type('application/xml');
res.header('Content-Type', 'application/xml; charset=UTF-8');
//console.log(res.time)
 return res.status(200).send(builder.buildObject(output1));
});

router.get('/logs', Request.logRequest, async (req, res) => {
 
    const file = path.join(__dirname, '../middleware/logs.txt')
   const logs =  fs.readFileSync(file,'utf8')
   res.format({'text/plain': function(){
    res.status(200).send(logs)
 }})
 //  res.status(200).send(logs)

   
})
    
router.post('/logs', Request.logRequest, async (req, res) => {
 
    const file = path.join(__dirname, '../middleware/logs.txt')
   const logs =  fs.readFileSync(file,'utf8')
   res.format({'text/plain': function(){
    res.status(200).send(req.body)
 }})
 //  res.status(200).send(logs)

   
})

module.exports =  router;
