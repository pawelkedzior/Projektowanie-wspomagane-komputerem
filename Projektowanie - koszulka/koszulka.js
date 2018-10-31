var cialo = d3.select("body")
var obrazek = cialo.append("svg")
  .attr("width", 800)
  .attr("height", 800)
  
obrazek.append("rect").attr("x",100).attr("y",0).attr("width",600).attr("height",500).style("fill","#800080")
obrazek.append("ellipse").attr("cx",400).attr("cy",500).attr("rx",300).attr("ry",300).style("fill","purple")
obrazek.append("circle").attr("cx",400).attr("cy",340).attr("r",200).style("fill","#FFD700")

var daneBel = [[700,80],[80,480],[680,60],[60,460]]
var daneKol = ["g","gl","gp","d","dl","dp","l","lg","ld","p","pg","pd"]
	
var kolkaCz=obrazek.append("g").selectAll("circle")
	.data(daneKol)
	.enter()
	.append("circle")
var jakieKolkaCz=kolkaCz
	.attr("cx", function(d) {
		var zwrot;
		if (d === "g" || d === "d")
			{zwrot = 400}
		else if (d === "gl" || d === "dl")
			{zwrot = 370}
		else if (d === "gp" || d === "dp")
			{zwrot = 430}
		else if (d === "l")
			{zwrot = 170}
		else if (d === "lg" || d === "ld")
			{zwrot = 200}
		else if (d === "p")
			{zwrot = 630}
		else if (d === "pg" || d === "pd")
			{zwrot = 600} 
		return zwrot;			
	})
	.attr("cy", function(d) {
		var zwrot;
		if (d === "g")
			{zwrot = 60}
		else if (d === "gp" || d === "gl")
			{zwrot = 90}
		else if (d === "d")
			{zwrot = 740}
		else if (d === "dp" || d === "dl")
			{zwrot = 710}
		else if (d === "l" || d === "p")
			{zwrot = 290}
		else if (d === "lg" || d === "pg")
			{zwrot = 260}
		else if (d === "ld" || d === "pd")
			{zwrot = 320}
		return zwrot;			
	})
	.attr("r", 40)
	.style("fill", "black")
	
var belki=obrazek.append("g").selectAll("rect")
	.data(daneBel)
	.enter()
	.append("rect")
var jakieBelki=belki
	.attr("height", function(d){
			return d[0]
		})
		.attr("width", function(d){
			return d[1]
		})
		.attr("y", function(d){
			var zwrot;
			if (d[0] > 100)
				{zwrot = 50+((700-d[0])/2)}
			else
				{zwrot = 250+((80-d[0])/2)}
			return zwrot;
		})
		.attr("x", function(d){
			var zwrot;
			if (d[1] > 100)
				{zwrot = 160+((480-d[1])/2)}
			else
				{zwrot = 360+((80-d[1])/2)}
			return zwrot;
		})
		.style("fill",function(d){
			var zwrot;
			if (d[0] === 700 || d[0] === 80)
				{zwrot = "black"}
			else
				{zwrot = "#643200"}
			return zwrot;});
			
var kolkaBr=obrazek.append("g").selectAll("circle")
	.data(daneKol)
	.enter()
	.append("circle")
var jakieKolkaBr=kolkaBr
	.attr("cx", function(d) {
			var zwrot;
			if (d === "g" || d === "d")
				{zwrot = 400}
			else if (d === "gl" || d === "dl")
				{zwrot = 370}
			else if (d === "gp" || d === "dp")
				{zwrot = 430}
			else if (d === "l")
				{zwrot = 170}
			else if (d === "lg" || d === "ld")
				{zwrot = 200}
			else if (d === "p")
				{zwrot = 630}
			else if (d === "pg" || d === "pd")
				{zwrot = 600} 
			return zwrot;			
		})
		.attr("cy", function(d) {
			var zwrot;
			if (d === "g")
				{zwrot = 60}
			else if (d === "gp" || d === "gl")
				{zwrot = 90}
			else if (d === "d")
				{zwrot = 740}
			else if (d === "dp" || d === "dl")
				{zwrot = 710}
			else if (d === "l" || d === "p")
				{zwrot = 290}
			else if (d === "lg" || d === "pg")
				{zwrot = 260}
			else if (d === "ld" || d === "pd")
				{zwrot = 320}
			return zwrot;			
		})
		.attr("r", 30)
		.style("fill", "#643200");
var ozdobneKolka = ["gl","gp","dl","dp"]
var kolkaOz=obrazek.append("g").selectAll("circle")
	.data(ozdobneKolka)
	.enter()
	.append("circle")
var jakieKolkaOz=kolkaOz
		.attr("cx", function(d) {
			var zwrot;
			if (d === "gp")
				{zwrot = 600}
			else if (d === "dp")
				{zwrot = 550}
			else if (d === "gl")
				{zwrot = 200}
			else if (d === "dl")
				{zwrot = 250}
			return zwrot;			
		})
		.attr("cy", function(d) {
			var zwrot;
			if (d === "gp" || d === "gl")
				{zwrot = 90}
			else if (d === "dp" || d === "dl")
				{zwrot = 590}
			return zwrot;			
		})
		.attr("r", 40)
		.style("fill", "black");
var ozdobneKolka2 = ["gl","gp","dl","dp"]
var kolkaOz2=obrazek.append("g").selectAll("circle")
	.data(ozdobneKolka)
	.enter()
	.append("circle")
var jakieKolkaOz2=kolkaOz2
	.attr("cx", function(d) {
			var zwrot;
			if (d === "gp")
				{zwrot = 600}
			else if (d === "dp")
				{zwrot = 550}
			else if (d === "gl")
				{zwrot = 200}
			else if (d === "dl")
				{zwrot = 250}
			return zwrot;			
		})
		.attr("cy", function(d) {
			var zwrot;
			if (d === "gp" || d === "gl")
				{zwrot = 90}
			else if (d === "dp" || d === "dl")
				{zwrot = 590}
			return zwrot;			
		})
		.attr("r", 30)
		.style("fill", "#643200");