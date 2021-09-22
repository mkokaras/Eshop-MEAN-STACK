var mongoose = require('mongoose');
const { Schema } = mongoose;

var ProductSchema = new Schema({
    brand: {type: String ,lowercase: true,required: true},

    size: {type: String ,lowercase: true,required: true},

    name: {type: String, lowercase:true ,required: true},

    quantity: {type: Number, lowercase:true, required: true},

    price: {type: Number, lowercase:true ,required: true},

    link: {type: String, lowercase:true ,required: true}

});

module.exports=mongoose.model('Product',ProductSchema);