var mongoose = require('mongoose');
const { Schema } = mongoose;

var PaymentSchema = new Schema({
    firstname: {type: String ,lowercase: true,required: true},

    lastname: {type: String ,lowercase: true,required: true},

    shippingaddress: {type: String, lowercase:true ,required: true},

    phonenumber: {type: String, lowercase:true, required: true},

    postalcode: {type: String, lowercase:true ,required: true},

    products: []

});

module.exports=mongoose.model('Payment',PaymentSchema);