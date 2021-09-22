var mongoose = require('mongoose');
const { Schema } = mongoose;

var RunOutSchema = new Schema({
    description: {type: String ,lowercase: true,required: true},

});

module.exports=mongoose.model('RunOut',RunOutSchema);