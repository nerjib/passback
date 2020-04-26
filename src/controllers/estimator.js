const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const moment = require ('moment')
const Request = require('../middleware/requestlog')
const db = require('../db/index');


//const responseTime = require('response-time');
 //const xml = require('xml')
const  Estimator = require('./estimatorCal')

const xml = require ('xml2js')

router.post('/',Request.logRequest, async (req, res) => {
 /*   uid integer not null,
    vehicle_no varchar(200),
    vehicle_type varchar(50),
    driver_no varchar(50),
    no_kd_passenger integer,
    no_male integer,
    no_female integer,
    temp integer,
    time varchar (50),
    date timestamp,
    gps varchar(100)
      vehicleNo: this.state.receivedata[e].vehicleNo,
            driverNo: this.state.receivedata[e].driverNo,
            vehicleType: this.state.receivedata[e].vehicleType,
            kdPassenger: this.state.receivedata[e].kdPassenger,
            malePassenger: this.state.receivedata[e].malePassenger,
            femalePassenger: this.state.receivedata[e].femalePassenger,
            highTemp: this.state.receivedata[e].highTemp,
            time: this.state.receivedata[e].time,
            gps: this.state.receivedata[e].gps,
            uid: this.state.userid
    */

    const inputData = `INSERT INTO
    datatable(vehicle_no,vehicle_type,driver_no,no_kd_passenger,no_male,no_female,temp,time,date,gps,uid,euid,entry_gate,vehicle_from,vehicle_to)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15) RETURNING *`;
  //console.log(req.body)
  const values = [
  req.body.vehicleNo,
  req.body.vehicleType,
  req.body.driverNo,
  req.body.kdPassenger,
  req.body.malePassenger,
  req.body.femalePassenger,
  req.body.highTemp,
  req.body.time,
  moment(new Date()),
  req.body.gps,
  req.body.uid,
  0,
  req.body.entryGate,
  req.body.vehicleFrom,
  req.body.vehicleTo
  ];
  try {
  const { rows } = await db.query(inputData, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  

  

    
   //  const output1 = (Estimator.covid19ImpactEstimator(req.body))
  
//    return res.status(200).send(req.body.vehicleNo);

});


router.post('/passengers',Request.logRequest, async (req, res) => {
  /*   uid integer not null,
     vehicle_no varchar(200),
     vehicle_type varchar(50),
     driver_no varchar(50),
     no_kd_passenger integer,
     no_male integer,
     no_female integer,
     temp integer,
     time varchar (50),
     date timestamp,
     gps varchar(100)
       vehicleNo: this.state.receivedata[e].vehicleNo,
             driverNo: this.state.receivedata[e].driverNo,
             vehicleType: this.state.receivedata[e].vehicleType,
             kdPassenger: this.state.receivedata[e].kdPassenger,
             malePassenger: this.state.receivedata[e].malePassenger,
             femalePassenger: this.state.receivedata[e].femalePassenger,
             highTemp: this.state.receivedata[e].highTemp,
             time: this.state.receivedata[e].time,
             gps: this.state.receivedata[e].gps,
             uid: this.state.userid
     */
 
     const inputData = `INSERT INTO
     passengers(  fulltime,kdaddress,PN,FN,FGN,MN,age,passport, nationality, residence, CV,ID, TC, LV, DS,kdtelephone, HC, HCno, EKD, EKDno, DA, airline,userid, bordername, flumed, antiviral, antibiotics, Paracetamol, bflu, bunwell, bbreathing, bcough, bfever, ill, flu, unwell, breathing, cough, fever, doctor, health,  gender, time )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43) RETURNING *`;
   //console.log(req.body)
   const values = [
    req.body.fulltime,
    req.body.kdaddress,
    req.body.PN.toUpperCase(),
    req.body.FN,
    req.body.FGN,
    req.body.MN,
    req.body.age,
    req.body.passport,
    req.body.nationality,
    req.body.residence, 
    req.body.CV,
    req.body.ID,
    req.body.TC,
    req.body.LV, 
    req.body.DS,
    req.body.kdtelephone, 
    req.body.HC, 
    req.body.HCno, 
    req.body.EKD, 
    req.body.EKDno, 
    req.body.DA, 
    req.body.airline,
    req.body.userid, 
    req.body.bordername, 
    req.body.flumed, 
    req.body.antiviral, 
    req.body.antibiotics, 
    req.body.Paracetamol, 
    req.body.bflu, 
    req.body.bunwell, 
    req.body.bbreathing, 
    req.body.bcough, 
    req.body.bfever, 
    req.body.ill, 
    req.body.flu, 
    req.body.unwell, 
    req.body.breathing, 
    req.body.cough, 
    req.body.fever, 
    req.body.doctor, 
    req.body.health,  
    req.body.gender,
   moment(new Date())
   ];
   try {
   const { rows } = await db.query(inputData, values);
   // console.log(rows);
   
   return res.status(201).send(rows);
   } catch (error) {
   return res.status(400).send(error);
   }
  }) 
router.post('/exit',Request.logRequest, async (req, res) => {
    
    const inputData = `INSERT INTO
    outgoingtable(vehicle_no,vehicle_type,driver_no,time,date,uid,exit_gate)
    VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`;
  //console.log(req.body)
  const values = [
  req.body.vehicleNo,
  req.body.vehicleType,
  req.body.driverNo,
  req.body.time,
  moment(new Date()),
  req.body.uid,
  req.body.exitGate
  ];
  try {
  const { rows } = await db.query(inputData, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
});


router.put('/exit/:vn', async (req, res) => {
    const updateReport = `UPDATE
    datatable SET euid=$1, etime=$2, exit_gate=$3 WHERE vehicle_no=$4 and euid=$5
     RETURNING *`;
  console.log(req.body)
  const values = [
  req.body.uid,
  req.body.time,
  req.body.exitGate,
  req.params.vn.toUpperCase(),
  0
  ];
  try {
  const { rows } = await db.query(updateReport, values);
  // console.log(rows);
  
  return res.status(201).send(rows);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });


  router.get('/allusers',Request.logRequest, async (req, res) => {

    const getAllQ = 'SELECT * FROM users order by id asc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
    //  const output1 = (Estimator.covid19ImpactEstimator(req.body))
 
 });
 router.get('/passengers',Request.logRequest, async (req, res) => {

  const getAllQ = 'SELECT * FROM passengers order by pid desc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
  //  const output1 = (Estimator.covid19ImpactEstimator(req.body))

});

router.get('/passengers/:id',Request.logRequest, async (req, res) => {

  const getAllQ = 'SELECT * FROM passengers where pid=$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ,[req.params.id]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
  //  const output1 = (Estimator.covid19ImpactEstimator(req.body))

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

 router.get('/search/:id',Request.logRequest, async (req, res) => {

    const getAllQ = 'SELECT * FROM datatable WHERE vehicle_no= $1 and euid=$2  order by id desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [(req.params.id).toUpperCase(), 0]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
    //  const output1 = (Estimator.covid19ImpactEstimator(req.body))
 
 });

 router.get('/',Request.logRequest, async (req, res) => {

    const getAllQ = 'SELECT datatable.vehicle_no, datatable.entry_gate,datatable.exit_gate,datatable.vehicle_from,datatable.vehicle_to, datatable.etime, datatable.euid, datatable.vehicle_type, datatable.driver_no, datatable.no_kd_passenger, datatable.no_male, datatable.no_female, datatable.temp, datatable.time, datatable.date,datatable.gps,users.border_name FROM datatable left join users on datatable.uid=users.id order by datatable.date desc';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ);
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
