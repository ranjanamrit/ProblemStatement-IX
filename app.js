var express = require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose= require("mongoose");
var methodOverride= require("method-override");
var Product= require("./models/product");
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://amrit:amritranjan@internshaalaproject-y6qeo.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology: true,useFindAndModify: false})
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


app.get("/",function(req,res){
    res.redirect("/products")
});
//showing all products

app.get("/products", function(req, res){
    Product.find({}, function(err, product){
        if(err){
            console.log("Err1")
        }else{
            res.render("product", { product:product}); 
        };
    });
});
//Adding new address
app.get("/products/new",function(req,res){
    res.render("newproduct")
});
app.post("/products",function(req,res){
    
    Product.create(req.body.product, function(err, newProduct){
        if(err){
            console.log("Err2")//This is not the way of error handling. In live project either we flash message or do anything which direct the user to correct the error made by them.
        }else{
            res.redirect("/products");
        }
    });
});
//EDIT FORM
app.get("/products/:id/edit",function(req,res){
    Product.findById(req.params.id, function(err, foundProduct){
            res.render("editproduct", {product: foundProduct});
        });
    });
//UPDATED PAGE
app.put("/products/:id",function(req,res){
    Product.findByIdAndUpdate(req.params.id, req.body.product,function(err, updatedProduct){
        if(err){
            res.redirect("/products/"+req.params.id+"/edit");
        }else{
            res.redirect("/products");
        };
    });
});
//delete product
app.delete("/products/:id",function(req,res){
    Product.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/products/"+ req.params.id);
        }else {
            res.redirect("/products");
        };
    });
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
})