const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    budget:{
        type:Number,
        required:true
    },
    color:{
        type:"String",
        validate: {
            validator: function(value) {
              return /^#([A-Fa-f0-9]{6})$/.test(value);
            },
            message: 'Color code must be a valid hexadecimal color code (e.g., "#FFC0CB").'
        },
        required:true,
        trim:true,
        uppercase:true
    }
},{collection:'budgetcollection'})

module.exports = mongoose.model('budgetcollection',budgetSchema)