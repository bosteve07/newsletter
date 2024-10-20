// const express = require("express"); 
const express = require("express");
const app = express(); 
const bodyParser = require("body-parser"); 
// const request   = require("request")


//Helps to use external files needed in the index file
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var fName = req.body.fName; 
    var lName = req.body.sName; 
    var email = req.body.email;
    // console.log(fName, lName, email);

    const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "e8e57d079a9f7896c73fa03537f04ade",
  server: "us8",
});

const run = async () => {
  const response = await client.lists.batchListMembers("923415923a", {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: fName,
            LNAME: lName,

        }
    }],
  });
  console.log(response.statusCode);
  if (response.statusCode == undefined || response.statusCode ==200 ) {
    res.send("Congratulation, You have signed up sucessfully")
} else{
    res.send("Oh, sorry, failed subscription!")
}
};

 run();



})




// Mailchimp API - 
// e8e57d079a9f7896c73fa03537f04ade-us8

// AudienceID
// 923415923a
app.listen(3000, function(){
    console.log("Server is running on port 3000");
})