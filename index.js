const express=require("express")
var dns = require('dns');
const fs = require('fs');
const app=express()
app.use(express.json())

let products = require("./products.json");



app.post("/getmeip",(req,res)=>{
    var ip = dns.lookup(req.body.sitename, function (err, addresses) {
      console.log(addresses);
      res.send(addresses)
    });
     
})


const save = () => {
    fs.writeFile(
      "./products.json",
      JSON.stringify(products, null, 2),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };



//get
app.get("/products",(req,res)=>{
    //let rawdata = fs.readFileSync(products);
    res.json(products)
})

//create
app.post("/products/create",(req, res) => {
    products.push(req.body);
    save();
    res.send("sucess")
  });

//delete
app.delete("/products/:productId", (req, res) => {
      products = products.filter(ele => ele.id !== Number(req.params.productId));
      save();
      res.send(products)
  });

//update
app.put("/products/:productId", (req, res) => {
    products = products.map((ele) => {
        if (ele.id === Number(req.params.productId)) {
          return req.body;
        } else {
          return ele;
        }
      });
      save();
    
      res.send({
        status: "success",
        stateInfo: req.body,
      });


    });

  


app.listen(3000,()=>{
    console.log("welcome")
})


