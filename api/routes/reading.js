const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Reading = require('../models/readinModel')


// get all points
router.post('/', (req,res,next) => {

    var obj = {
        pm25: req.body.pm25,
        pm1: req.body.pm1,
        pm10: req.body.pm10,
        battery: req.body.battery,
        location: {
            type:'Point',
            coordinates: [req.body.lon,req.body.lat],
        },
	timestamp:req.body.timestamp,
        savedAt:Date.now(),
        user:req.body.email
    }
    var reading = new Reading(obj);
    reading.save()
    .then((result) => {
        res.status(200).json({
            message : 'data stored successfully',
            // data:result
        })
        
    }).catch((err) => {
        res.status(500).json({
            error:err
        })    
    });
})


module.exports = router;
