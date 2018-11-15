const mongoose = require('mongoose');

const readingSchema = mongoose.Schema({
    pm25: {
        type:Number
    },
    pm1: {
        type:Number
    },
    pm10: {
        type:Number
    },
    battery: {
        type:Number
    },
    
    location: {
        type:{
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
        }
    },
    timestamp:{
        type:Date
    },
	savedAt:{
		type:Date
	},
    user:{ 
        type:String, 
        // require:true 
    }
})

module.exports = mongoose.model('Reading',readingSchema);
   
