var StrukturaOgrodu={
		granice:[], 
		drzewa:[], 
		sciezki:[], 
		kwiaty:[],
		dom:[], 
		taras:[], 
		skala:"1m:100px",
		ustawGranice: function(noweGranice)
		{
			this.granice=noweGranice;
		},
		dodajDrzewo: function(noweDrzewo)
		{
			this.drzewa.push(noweDrzewo);
		},
		dodajOdcinekSciezki: function(nowyOdcinek)
		{
			this.sciezki.push(nowyOdcinek);
		},
		umiescKwiaty: function(kolor, graniceKlombu)
		{
			this.kwiaty.push([kolor, graniceKlombu]);
		},
		umiescDom: function(graniceDomu)
		{
			this.dom=graniceDomu;
		},
		umiescTaras: function(graniceTarasu)
		{
			this.taras=graniceTarasu;
		},
		obliczSkale: function(pktyGraniczne)
		{
			var maksY=Math.abs((pktyGraniczne[0]).r*Math.cos((pktyGraniczne[0]).fi*Math.PI/180));
			var maksX=Math.abs((pktyGraniczne[0]).r*Math.sin((pktyGraniczne[0]).fi*Math.PI/180));
			for(var i=1;i<pktyGraniczne.length;i++)
			{
				var y=Math.abs((pktyGraniczne[i]).r*Math.cos((pktyGraniczne[i]).fi*Math.PI/180));
				var x=Math.abs((pktyGraniczne[i]).r*Math.sin((pktyGraniczne[i]).fi*Math.PI/180));
				if(x>maksX)
					maksX=x;
				if(y>maksY)
					maksY=y;
			}
			maksY*=2;
			maksX*=2;
			var pikseliNaMetr=Math.ceil(800/Math.max(maksY,maksX));
			this.skala="1m:"+pikseliNaMetr+"px";
		},
		tworzOgrod: function(czescStrony)
		{
			var ogrod=czescStrony.append("svg").attr("id","projektOgrodu")
					.attr("width",800)
					.attr("height",800);
			this.obliczSkale(this.granice);
			var granice=this.granice;
			var przelicznikSkali=(((this.skala).replace(/1m:/,"")).replace(/px/,""));
			//granice i trawnik
			ogrod.append("polygon")
				.attr("points",function()
					{
						var punktyWStringu="";
						for (var i=0;i<granice.length;i++)
						{
							var polX=(((granice[i]).r*Math.sin((granice[i]).fi/180*Math.PI))*
									przelicznikSkali)+400;
							var polY=(((granice[i]).r*Math.cos((granice[i]).fi/180*Math.PI))*(-1)*
									przelicznikSkali)+400;
							punktyWStringu=punktyWStringu+polX+","+polY+" ";
						}
						return punktyWStringu
					})
				.style("fill","#00CC33")
				.style("stroke","black");
				
			//sciezka
			/*var odcinkiSciezki=this.sciezki;
			for(var j=0;j<odcinkiSciezki.length;j++)
			{
				granice=[];
				var pkt1=(odcinkiSciezki[i]).p1;
				var pkt2=(odcinkiSciezki[i]).p2;
				var szer=(odcinkiSciezki[i]).szerokosc;
				var kartp1=przeliczNaKartezjanskie(pkt1.r,pkt1.fi);
				var kartp2=przeliczNaKartezjanskie(pkt2.r,pkt2.fi);
				var wektorSciezki=[kartp2[0]-kartp1[0],kartp2[1]-kartp1[1]];
				ogrod.append("polygon")
				.attr("points",function()
					{
						var punktyWStringu="";
						for (var i=0;i<granice.length;i++)
						{
							var polX=(((granice[i]).r*Math.sin((granice[i]).fi/180*Math.PI))*
									przelicznikSkali)+400;
							var polY=(((granice[i]).r*Math.cos((granice[i]).fi/180*Math.PI))*(-1)*
									przelicznikSkali)+400;
							punktyWStringu=punktyWStringu+polX+","+polY+" ";
						}
						return punktyWStringu
					})
				.style("fill","#402000")
				.style("stroke","black");
			}*/
			
			//taras
			granice=this.taras;
			ogrod.append("polygon")
				.attr("points",function()
					{
						var punktyWStringu="";
						for (var i=0;i<granice.length;i++)
						{
							var polX=(((granice[i]).r*Math.sin((granice[i]).fi/180*Math.PI))*
									przelicznikSkali)+400;
							var polY=(((granice[i]).r*Math.cos((granice[i]).fi/180*Math.PI))*(-1)*
									przelicznikSkali)+400;
							punktyWStringu=punktyWStringu+polX+","+polY+" ";
						}
						return punktyWStringu
					})
				.style("fill","#999999")
				.style("stroke","black");
				
			//dom
			granice=this.dom;
			ogrod.append("polygon")
				.attr("points",function()
					{
						var punktyWStringu="";
						for (var i=0;i<granice.length;i++)
						{
							var polX=(((granice[i]).r*Math.sin((granice[i]).fi/180*Math.PI))*
									przelicznikSkali)+400;
							var polY=(((granice[i]).r*Math.cos((granice[i]).fi/180*Math.PI))*(-1)*
									przelicznikSkali)+400;
							punktyWStringu=punktyWStringu+polX+","+polY+" ";
						}
						return punktyWStringu
					})
				.style("fill","white")
				.style("stroke","black");
			
			//kwiaty
			klomby=this.kwiaty;
			for(var j=0;j<klomby.length;j++)
			{
				granice=(klomby[j])[1];
				var kolor=(klomby[j])[0];
				var wzoryKlombow=ogrod.append("defs");
				var zoltyWzor=wzoryKlombow.append("pattern").attr("id","yellow")
					.attr("patternUnits","UserSpaceOnUse")
					.attr("x",0)
					.attr("y",0)
					.attr("width",function(){return 4*przelicznikSkali})
					.attr("height",function(){return 4*przelicznikSkali})
					.attr("viewBox",function(){
						return "0 0 "+(4*przelicznikSkali)+" "+(4*przelicznikSkali)});
				zoltyWzor.append("rect").attr("height",function(){return 4*przelicznikSkali})
					.attr("width",function(){return 4*przelicznikSkali})
					.attr("x",0)
					.attr("y",0)
					.style("fill","#663300")
					.style("stroke","none");
				zoltyWzor.append("circle").attr("cx",function(){return 2*przelicznikSkali})
					.attr("cy",function(){return 2*przelicznikSkali})
					.attr("r",function(){return przelicznikSkali})
					.style("fill","yellow")
					.style("stroke","none");
				
				ogrod.append("polygon")
					.attr("points",function()
						{
							var punktyWStringu="";
							for (var i=0;i<granice.length;i++)
							{
								var polX=(((granice[i]).r*Math.sin((granice[i]).fi/180*Math.PI))*
										przelicznikSkali)+400;
								var polY=(((granice[i]).r*Math.cos((granice[i]).fi/180*Math.PI))*(-1)*
										przelicznikSkali)+400;
								punktyWStringu=punktyWStringu+polX+","+polY+" ";
							}
							return punktyWStringu
						})
					.style("fill","#663300")
					.style("stroke","black");
				var maksR=granice[0].r;
				var minR=granice[0].r;
				var maksFi=granice[0].fi;
				var minFi=granice[0].fi;
				for (var i=1;i<granice.length;i++)
				{
					if(granice[i].r>maksR)
						maksR=granice[i].r;
					else if(granice[i].r<minR)
						minR=granice[i].r;
					if(granice[i].fi>maksFi)
						maksR=granice[i].fi;
					else if(granice[i].fi<minFi)
						minR=granice[i].fi;
				}
			}
			//drzewa
			granice=this.drzewa;
			for(var j=0;j<granice.length;j++)
			{
				var kart=przeliczNaKartezjanskie((granice[j]).r,(granice[j]).fi)
				kart[0]=kart[0]*przelicznikSkali+400;
				kart[1]=kart[1]*przelicznikSkali+400;
				ogrod.append("circle")
					.attr("cx", kart[0])
					.attr("cy", kart[1])
					.attr("r",function(){return 3*przelicznikSkali})
					.style("fill","#005500")
					.style("stroke","black");
			}
		}	
}

function przeliczNaKartezjanskie(r,fi)
{
	var kartezjanskie=[];
	var x=r*Math.sin(fi/180*Math.PI);
	var y=r*Math.cos(fi/180*Math.PI)*(-1);
	kartezjanskie.push(x);
	kartezjanskie.push(y);
	return kartezjanskie;
}

function przeliczNaBiegunowe(x,y)
{
	var biegunowe=[];
	biegunowe.push(Math.sqrt(x*x+y*y));
	biegunowe.push(Math.atan(y/x)*180/Math.PI);
	return biegunowe;
	
}

function stworzPunkt(r1, fi1)
{
	var nowyPunkt={
			r:r1,
			fi:fi1
	}
	return nowyPunkt;
}

function stworzOdcinekSciezki(pkt1, pkt2, szer)
{
	var nowyOdcinek={
			p1:pkt1,
			p2:pkt2,
			szerokosc:szer
	}
	return nowyOdcinek;
}

var graniceOgrodu=[];
graniceOgrodu.push(stworzPunkt(120,0));
graniceOgrodu.push(stworzPunkt(130,90));
graniceOgrodu.push(stworzPunkt(140,180));
graniceOgrodu.push(stworzPunkt(125,270));
StrukturaOgrodu.ustawGranice(graniceOgrodu);
var graniceDomu=[];
graniceDomu.push(stworzPunkt(30,90));
graniceDomu.push(stworzPunkt(39.7,131));
graniceDomu.push(stworzPunkt(30,210));
graniceDomu.push(stworzPunkt(15,270));
StrukturaOgrodu.umiescDom(graniceDomu);
var graniceTarasu=[];
graniceTarasu.push(stworzPunkt(15,0));
graniceTarasu.push(stworzPunkt(33.54,63.5));
graniceTarasu.push(stworzPunkt(30,90));
graniceTarasu.push(stworzPunkt(0,0));
StrukturaOgrodu.umiescTaras(graniceTarasu);
var odcinkiSciezki=[];
odcinkiSciezki.push(stworzOdcinekSciezki(stworzPunkt(21.2,45),stworzPunkt(70,25),1));
odcinkiSciezki.push(stworzOdcinekSciezki(stworzPunkt(70,25),stworzPunkt(120,60),1));
for(var j=0;j<odcinkiSciezki.length;j++)
	StrukturaOgrodu.dodajOdcinekSciezki(odcinkiSciezki[i]);
var drzewa=[];
drzewa.push(stworzPunkt(90,97));
drzewa.push(stworzPunkt(40,15));
drzewa.push(stworzPunkt(85,100));
drzewa.push(stworzPunkt(95,189));
drzewa.push(stworzPunkt(100,200));
drzewa.push(stworzPunkt(90,76));
drzewa.push(stworzPunkt(80,89));
drzewa.push(stworzPunkt(95,103));
drzewa.push(stworzPunkt(98,79));
drzewa.push(stworzPunkt(86,203));
drzewa.push(stworzPunkt(70,95));
drzewa.push(stworzPunkt(92,81));
drzewa.push(stworzPunkt(55,7));
drzewa.push(stworzPunkt(46,10));
for (var i=0;i<drzewa.length;i++)
	StrukturaOgrodu.dodajDrzewo(drzewa[i]);
var klomb1=[];
klomb1.push(stworzPunkt(100,0));
klomb1.push(stworzPunkt(90,15));
klomb1.push(stworzPunkt(80,0));
klomb1.push(stworzPunkt(90,345));
var klomb2=[];
klomb2.push(stworzPunkt(80,270));
klomb2.push(stworzPunkt(95,280));
klomb2.push(stworzPunkt(75,305));
var klomb3=[];
klomb3.push(stworzPunkt(80,160));
klomb3.push(stworzPunkt(60,140));
klomb3.push(stworzPunkt(60,155));
klomb3.push(stworzPunkt(80,180));
StrukturaOgrodu.umiescKwiaty("red",klomb1);
StrukturaOgrodu.umiescKwiaty("blue",klomb2);
StrukturaOgrodu.umiescKwiaty("yellow",klomb3);

var projekt=d3.select("body").append("div");
StrukturaOgrodu.tworzOgrod(projekt);