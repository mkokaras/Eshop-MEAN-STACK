var mongoose = require('mongoose');
const { Schema } = mongoose;

var CartSchema = new Schema(
    {
      email: {type: String,lowercase: true,required: true},

      size: {type : String,lowercase: true,required: true},
      
      products: [
        {
            brand: String,
            size: String,
            name: String,
            quantity: Number,
            price:  Number,
            link: String
        }
      ]
    });


module.exports=mongoose.model('Cart',CartSchema);