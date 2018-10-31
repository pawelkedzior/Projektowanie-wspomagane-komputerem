var cialo = d3.select("body")
var wymiary = [[800, 800]]
var obraz = cialo.append("center").selectAll("svg").data(wymiary).enter().append("svg")
  .attr("width", function(d){return d[0]})
  .attr("height", function(d){return d[1]})
  .attr("id","Obrazek1")

function bezBabelkow(e) {
	nacisniete=false;
    if (!e) {
        var e = window.event;
    }
    e.cancelBubble = true; 
    if (e.stopPropagation) {
        e.stopPropagation();
    }
}  

var kolorTrojkata="brown";
var kolorKola="brown";
var kolorKwadratu="brown"
var zjechane=false;
var zjechaneTr=false;
var nacisniete=false;
var zrodlo=null;
var polozenieZrodlaX;
var polozenieZrodlaY;
var kierunek;
var numer=1

function CzyZjechane(e)
{
	if(e.type==="mouseout")
	{
		if(nacisniete)
		{
			var Xwektora=e.screenX-polozenieZrodlaX;
			var Ywektora=e.screenY-polozenieZrodlaY;
			if(Ywektora>Xwektora)
			{
				if(Ywektora>(Xwektora*(-1)))
					kierunek="PD";
				else
					kierunek="ZA";
			}
			else
			{
				if(Ywektora>(Xwektora*(-1)))
					kierunek="WS";
				else
					kierunek="PN";
			}
			zjechane=true;
		}
	}
	else if (e.type==="mouseup"&&zjechane)
	{
		Kwadraty(e);
		nacisniete=false;
		zjechane=false;
	}
}

function ZnajdzPolozenie(e)
{
	if(this.lastElementChild.style.fill==="black")
	{
		polozenieZrodlaX=e.screenX;
		polozenieZrodlaY=e.screenY;
		zrodlo=this;
		nacisniete=true;
	}
}

function TrojkatKoniec(e)
{
	d3.select(this).select("circle").remove()
	this.removeEventListener("dblclick", TrojkatKoniec)
	this.removeEventListener('mouseout', TrojkatyIKolko, false)
	this.removeEventListener('mousedown', TrojkatyIKolko, false)
	zjechaneTr=false;
}

function KwadratKoniec(e)
{
	d3.select(this).select("circle").remove()
	this.removeEventListener('dblclick',KwadratKoniec)
	this.removeEventListener('click', KwadratITrojkaty, false)
	this.removeEventListener('mouseup', bezBabelkow, false)
	this.removeEventListener('mouseout',CzyZjechane)
	this.removeEventListener('mousedown', ZnajdzPolozenie)
	nacisniete=false;
	zjechane=false;
}

function Kwadraty(e)
{
	var polX=zrodlo.firstChild.x.baseVal.value;
	var polY=zrodlo.firstChild.y.baseVal.value;
	switch(kierunek)
	{
	case "PN":
		polY-=40;
	break;
	case "PD":
		polY+=40;
	break;
	case "WS":
		polX+=40;
	break;
	case "ZA":
		polX-=40;
	break;
	}
	var nowy=obrazek.append("g")
		.attr("id",numer)
	nowy.append("rect")
		.attr("x",polX)
		.attr("y",polY)
		.attr("width",40)
		.attr("height",40)
		.style("fill",kolorKwadratu)
	var znacznik=nowy.append("circle")
		.attr("cx",polX+20)
		.attr("cy",polY+20)
		.attr("r",5)
		.style("fill","black")
	var grupa=document.getElementById(numer)
	grupa.addEventListener('dblclick',KwadratKoniec)
	grupa.addEventListener('click', KwadratITrojkaty, false)
	grupa.addEventListener('mouseup', bezBabelkow, false)
	grupa.addEventListener('mouseout',CzyZjechane)
	grupa.addEventListener('mousedown', ZnajdzPolozenie)
	numer++;
}

function KwadratITrojkaty(e)
{
	if(zjechane)
	{
		var polX=zrodlo.firstChild.x.baseVal.value;
		var polY=zrodlo.firstChild.y.baseVal.value;
		switch(kierunek)
		{
		case "PN":
		case "PD":
			var nowy=obrazek.append("g")
				.attr("id",numer)
			nowy.append("polygon")
				.attr("points",function()
						{return polX+","+polY+" "+(polX+40)+","+polY+" "+(polX+20)+","+(polY-40)})
				.style("fill",kolorTrojkata)
				.style("stroke",kolorTrojkata)
			var znacznik=nowy.append("circle")
				.attr("cx",polX+20)
				.attr("cy",polY-10)
				.attr("r",5)
				.style("fill","black")
			var grupa=document.getElementById(numer)
			grupa.addEventListener('dblclick', TrojkatKoniec)
			grupa.addEventListener('mouseout', TrojkatyIKolko, false)
			grupa.addEventListener('mousedown', TrojkatyIKolko, false)
			numer++;
			var nowy=obrazek.append("g")
				.attr("id",numer)
			nowy.append("polygon")
				.attr("points",function()
						{return polX+","+(polY+40)+" "+(polX+40)+","+(polY+40)
							+" "+(polX+20)+","+(polY+80)})
				.style("fill",kolorTrojkata)
				.style("stroke",kolorTrojkata)
			var znacznik=nowy.append("circle")
				.attr("cx",polX+20)
				.attr("cy",polY+50)
				.attr("r",5)
				.style("fill","black")
			var grupa=document.getElementById(numer)
			grupa.addEventListener('dblclick', TrojkatKoniec)
			grupa.addEventListener('mouseout', TrojkatyIKolko, false)
			grupa.addEventListener('mousedown', TrojkatyIKolko, false)
			numer++;		
			zjechane=false;
			nacisniete=false;
		break;
		case "WS":
		case "ZA":
			var nowy=obrazek.append("g")
				.attr("id",numer)
			nowy.append("polygon")
				.attr("points",function()
						{return polX+","+polY+" "+polX+","+(polY+40)+" "+(polX-40)+","+(polY+20)})
				.style("fill",kolorTrojkata)
				.style("stroke",kolorTrojkata)
			var znacznik=nowy.append("circle")
				.attr("cx",polX-10)
				.attr("cy",polY+20)
				.attr("r",5)
				.style("fill","black")
			var grupa=document.getElementById(numer)
			grupa.addEventListener('dblclick', TrojkatKoniec)
			grupa.addEventListener('mouseout', TrojkatyIKolko, false)
			grupa.addEventListener('mousedown', TrojkatyIKolko, false)
			numer++;
			
			var nowy=obrazek.append("g")
				.attr("id",numer)
			nowy.append("polygon")
				.attr("points",function()
					{return (polX+40)+","+polY+" "+(polX+40)+","
						+(polY+40)+" "+(polX+80)+","+(polY+20)})
				.style("fill",kolorTrojkata)
				.style("stroke",kolorTrojkata)
			var znacznik=nowy.append("circle")
				.attr("cx",polX+50)
				.attr("cy",polY+20)
				.attr("r",5)
				.style("fill","black")
			var grupa=document.getElementById(numer)
			grupa.addEventListener('dblclick', TrojkatKoniec)
			grupa.addEventListener('mouseout', TrojkatyIKolko, false)
			grupa.addEventListener('mousedown', TrojkatyIKolko, false)
			numer++;
			zjechane=false;
			nacisniete=false;
		break;
		}
		KwadratKoniec.apply(this);
	}
}

function TrojkatyIKolko(e)
{
	if(e.type==="mouseout")
	{
		if(zjechaneTr)
		{
			var polX=this.lastElementChild.cx.baseVal.value;
			var polY=this.lastElementChild.cy.baseVal.value;
			TrojkatKoniec.apply(this);
			var kierX=polX%40;
			var kierY=polY%40;
			var kier;
			if(kierX===20)
			{
				if(kierY===10)
				{
					kier="PD"
				}
				else
				{
					kier="PN"
				}
			}
			else
			{
				if(kierX===10)
				{
					kier="WS"
				}
				else
				{
					kier="ZA"
				}
			}
			switch(kier)
			{
			case "PN":
				obrazek.append("circle")
					.attr("cx",polX)
					.attr("cy",polY-50)
					.attr("r",19)
					.style("fill",kolorKola)
					.style("stroke",kolorKola)
				obrazek.append("polygon")
					.attr("points",function()
						{return polX+","+(polY-70)+" "+(polX-20)+","
							+(polY-110)+" "+(polX+20)+","+(polY-110)})
					.style("fill",kolorTrojkata)
					.style("stroke",kolorTrojkata)
			break;
			case "PD":
				obrazek.append("circle")
					.attr("cx",polX)
					.attr("cy",polY+50)
					.attr("r",19)
					.style("fill",kolorKola)
					.style("stroke",kolorKola)
				obrazek.append("polygon")
					.attr("points",function()
						{return polX+","+(polY+70)+" "+(polX-20)+","
							+(polY+110)+" "+(polX+20)+","+(polY+110)})
					.style("fill",kolorTrojkata)
					.style("stroke",kolorTrojkata)
			break;
			case "ZA":
				obrazek.append("circle")
					.attr("cx",polX-50)
					.attr("cy",polY)
					.attr("r",19)
					.style("fill",kolorKola)
					.style("stroke",kolorKola)
				obrazek.append("polygon")
					.attr("points",function()
						{return (polX-70)+","+polY+" "+(polX-110)+","
							+(polY-20)+" "+(polX-110)+","+(polY+20)})
					.style("fill",kolorTrojkata)
					.style("stroke",kolorTrojkata)
			break;
			case "WS":
				obrazek.append("circle")
					.attr("cx",polX+50)
					.attr("cy",polY)
					.attr("r",19)
					.style("fill",kolorKola)
					.style("stroke",kolorKola)
				obrazek.append("polygon")
					.attr("points",function()
						{return (polX+70)+","+polY+" "+(polX+110)+","
							+(polY-20)+" "+(polX+110)+","+(polY+20)})
					.style("fill",kolorTrojkata)
					.style("stroke",kolorTrojkata)
			break;
			}
		}
		zjechaneTr=false;
	}
	else if(e.type==="mousedown")
	{
		zjechaneTr=true;
	}
}

function RysujSiatke(obrazek)
{
	var wymiary=obrazek.data()
	wymiary=wymiary[0]
	var siatka = obrazek.append("g").attr("id","siatka")
	var x;
	var y;
	for (x=40;x<wymiary[0];x=x+40)
	{
		siatka.append("line")
			.attr("x1",x)
			.attr("x2",x)
			.attr("y1",0)
			.attr("y2",wymiary[1])
			.attr("stroke","#C0C0C0")
			.attr("stroke-weight",1)
	}
	for (y=40;y<wymiary[1];y=y+40)
	{
		siatka.append("line")
			.attr("y1",y)
			.attr("y2",y)
			.attr("x1",0)
			.attr("x2",wymiary[0])
			.attr("stroke","#C0C0C0")
			.attr("stroke-weight",1)
	}
	return siatka
}

var siatka=RysujSiatke(obraz)
var obrazek=obraz.append("g").attr("id","obrazek")

var nowy=obrazek.append("g")
	.attr("id",numer)
nowy.append("rect")
	.attr("x",400)
	.attr("y",400)
	.attr("width",40)
	.attr("height",40)
	.style("fill",kolorKwadratu)
var znacznik=nowy.append("circle")
	.attr("cx",420)
	.attr("cy",420)
	.attr("r",5)
	.style("fill","black")
var grupa=document.getElementById(numer)
grupa.addEventListener('dblclick',KwadratKoniec)
grupa.addEventListener('click', KwadratITrojkaty, false)
grupa.addEventListener('mouseup', bezBabelkow, false)
grupa.addEventListener('mouseout',CzyZjechane)
grupa.addEventListener('mousedown', ZnajdzPolozenie)
numer++;

document.getElementById("Obrazek1").addEventListener('mouseup',CzyZjechane)

var legenda=d3.select("body").append("fieldset")
legenda.append("h2").text("Legenda")
legenda.append("h3").text("Produkcje:")
legenda.append("p").text("1. Dorysuj kwadrat - Ustaw kursor na kwadracie źródłowym, " +
		"naciśnij przycisk myszy i bez puszczania przesuń w stronę, " +
		"po której chcesz ujrzeć nowy kwadrat. Potem puść przycisk myszy.")
legenda.append("p").text("2. Kwadrat z trójkątami po bokach - Postępuj podobnie " +
		"jak w przypadku dorysowania kwadratu, jednak przed puszczeniem przycisku " +
		"wróć na obszar kwadratu. Trójkąty pojawią sie po przeciwległych bokach " +
		"w kierunku pionowym lub poziomym (w zależności od wskazanego kierunku).")
legenda.append("p").text("3. Trójkąt-koło-trójkąt - kliknij trójkąt i wyjedź poza jego obszar.")
legenda.append("p").text("4. Trójkąt-zakończenie - kliknij dwukrotnie trójkąt.")
legenda.append("p").text("5. Kwadrat-zakończenie - kliknij dwukrotnie kwadrat.")
legenda.append("p").text("Produkcje są dostępne tylko na figurach z czarnym kółkiem.")
legenda.append("p").text("W razie niepowodzenia powtórz czynność lub naciśnij figurę ponownie.")
