var mongoose= require("mongoose")

var addressSchema= new mongoose.Schema({
    title: String,
    image: String,
    description: String
});
module.exports= mongoose.model("address", addressSchema);