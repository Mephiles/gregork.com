var app = require("express")();

app.get("/", function(req, res){
	res.send("HELLO WORLD!");
});

const port = 8081;
app.listen(port, function(){
	console.log(`Listening on port ${port}`);
})
