var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

var UserSchema=new Schema({
    firstname: {type: String ,lowercase: true,required: true},

    lastname: {type: String ,lowercase: true,required: true},

    password: {type: String, required: true},

    email: {type : String , required: true,lowercase :true,unique: true}
});

UserSchema.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password,null,null,function(err,hash){
        user.password=hash
    });
    next();
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User',UserSchema);