const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Reading = require('../models/readinModel')


// get all points
router.post('/', (req,res,next) => {
    var data = req.body.data;
    data.map((v,i) => {
        var obj = {
            pm25: v.pm25,
            pm1: v.pm1,
            pm10: v.pm10,
            battery: v.battery,
            location: {
                type:'Point',
                coordinates: [v.lng,v.lat],
            },
            timestamp:v.timestamp,
            savedAt:Date.now(),
            user:v.email
        }
        var reading = new Reading(obj);
        reading.save()
        .then((result) => {
            res.status(200).json({
                message : 'data stored successfully',
                // data:result
            })
            
        })
        .catch((err) => {
            res.status(500).json({
                error:err
            })    
        });
    })
})


module.exports = router;
