function generujKsztalt(obraz)//przekaż wybrany selectem element svg
{
	var idObrazka=(obraz._groups[0])[0].id
	var genotyp=[idObrazka,[]]
	var idProdukcji=1;
	obrazek=obraz.append("g").attr("id","obrazek");
	numer=1;
	var poczatek=obrazek.append("g").attr("id",numer);
	poczatek.append("rect")
		.attr("x",400)
		.attr("y",400)
		.attr("width",40)
		.attr("height",40)
		.style("fill",kolorKwadratu)
	var znacznik=poczatek.append("circle")
		.attr("cx",420)
		.attr("cy",420)
		.attr("r",5)
		.style("fill","black")
	var grupaPoczatkowa=document.getElementById(numer)
	grupaPoczatkowa.addEventListener('dblclick',KwadratKoniec)
	grupaPoczatkowa.addEventListener('click', KwadratITrojkaty, false)
	grupaPoczatkowa.addEventListener('mouseup', bezBabelkow, false)
	grupaPoczatkowa.addEventListener('mouseout',CzyZjechane)
	grupaPoczatkowa.addEventListener('mousedown', ZnajdzPolozenie)
	numer++;
	
	var wylosowanaLiczbaProdukcji=(Math.floor(Math.random()*26)+5);
	function losujZrodloProdukcji()
	{
		var string=""+(Math.floor(Math.random()*(numer-1))+1);
		var tymczasowa=(obrazek.selectAll("g")._groups[0]);
		var doZwrotu;
		for(j=0;j<tymczasowa.length;j++)
		{
			if(tymczasowa[j].id===string)
				doZwrotu=tymczasowa[j];
		}
		return doZwrotu;
	}
	function czyProdukcjaMozliwa(zro, numerProdukcji)
	{
		if(zro.lastElementChild.style.fill!="black")
			return false;
		if(zro.firstElementChild.localName==="rect"&&(numerProdukcji===2||numerProdukcji===5))
			return false;
		if(zro.firstElementChild.localName==="polygon"&&(numerProdukcji===1||numerProdukcji===3
															||numerProdukcji===4))
			return false;
		return true;
	}
	function czyObrazekSkonczony()
	{
		var figury=obrazek.selectAll("g")._groups[0];
		for(j=0;j<figury.length;j++)
		{
			if(figury[j].lastElementChild.style.fill==="black")
				return false;
		}
		return true;
	}
	do
	{	
		var wylosowanaProdukcja=Math.floor(Math.random()*5)+1;	
		zrodlo=losujZrodloProdukcji();
		if(czyProdukcjaMozliwa(zrodlo, wylosowanaProdukcja))
		{
			var nowaProdukcja=["prod"+idProdukcji,[]];
			idProdukcji++;
			nowaProdukcja[1].push(""+zrodlo.id);
			nowaProdukcja[1].push(wylosowanaProdukcja);
			switch(wylosowanaProdukcja)
			{
				case 1:
					KwadratKoniec.apply(zrodlo);
				break;
				case 2:
					TrojkatKoniec.apply(zrodlo);
				break;
				case 3:
					var wylosowanyKierunek=Math.floor(Math.random()*4)
					switch(wylosowanyKierunek)
					{
						case 0:
							kierunek="PN";
						break;
						case 1:
							kierunek="PD";
						break;
						case 2:
							kierunek="ZA";
						break;
						case 3:
							kierunek="WS";
						break;
					}
					Kwadraty.apply(zrodlo);
					nowaProdukcja[1].push(kierunek);
				break;
				case 4:
					zjechane=true;
					var wylosowanyKierunek=Math.floor(Math.random()*2)
					if(wylosowanyKierunek===0)
						kierunek="PN";
					else
						kierunek="WS";
					KwadratITrojkaty.apply(zrodlo);
					nowaProdukcja[1].push(kierunek);
				break;
				case 5:
					var noweE={type:"mouseout"};
					zjechaneTr=true;
					TrojkatyIKolko.apply(zrodlo, [noweE]);
				break;
			}
			genotyp[1].push(nowaProdukcja);
		}
		if(idProdukcji>50)
			break;
	}
	while(!czyObrazekSkonczony());
	return genotyp;
}

function pokazWygenerowanyKsztalt(obraz, genotyp)
{
	obrazek=obraz;
	numer=1;
	var poczatek=obrazek.append("g").attr("id",numer);
	poczatek.append("rect")
		.attr("x",400)
		.attr("y",400)
		.attr("width",40)
		.attr("height",40)
		.style("fill",kolorKwadratu)
	var znacznik=poczatek.append("circle")
		.attr("cx",420)
		.attr("cy",420)
		.attr("r",5)
		.style("fill","black")
	var grupaPoczatkowa=document.getElementById(numer)
	grupaPoczatkowa.addEventListener('dblclick',KwadratKoniec)
	grupaPoczatkowa.addEventListener('click', KwadratITrojkaty, false)
	grupaPoczatkowa.addEventListener('mouseup', bezBabelkow, false)
	grupaPoczatkowa.addEventListener('mouseout',CzyZjechane)
	grupaPoczatkowa.addEventListener('mousedown', ZnajdzPolozenie)
	numer++;
	
	for(k=0;k<genotyp[1].length;k++)
	{
		var produkcja=(genotyp[1])[k];
		var string=((produkcja[1])[0]);
		var zrodelko=(obrazek.selectAll("g")._groups[0]);
		for (p=0;p<zrodelko.length;p++)
		{
			if(zrodelko[p].id===string)
			{
				zrodlo=zrodelko[p];
				break;
			}
		}
		switch((produkcja[1])[1])
		{
			case 1:
				KwadratKoniec.apply(zrodlo);
			break;
			case 2:
				TrojkatKoniec.apply(zrodlo);
			break;
			case 3:
				kierunek=(produkcja[1])[2];
				Kwadraty.apply(zrodlo);
			break;
			case 4:
				zjechane=true;
				kierunek=(produkcja[1])[2];
				KwadratITrojkaty.apply(zrodlo);
			break;
			case 5:
				var noweE={type:"mouseout"};
				zjechaneTr=true;
				TrojkatyIKolko.apply(zrodlo, [noweE]);
			break;
		}
	}
}

function czyPoprawneProdukcje(genotyp)
{
	var kodGenetyczny=genotyp[1];
	var czyProdukcjaMozliwa=[1,0,1,1,0];
	for(var r=0;r<kodGenetyczny.length;r++)
	{
		var numerProdukcji=((kodGenetyczny[r])[1])[1];
		if(!(czyProdukcjaMozliwa[numerProdukcji-1]>0))
			return -r;
		czyProdukcjaMozliwa=mozliweProdukcje(czyProdukcjaMozliwa, numerProdukcji);
	}
	return true;
}

function poprawEwentualneBledyZrodla(genyProdukcyjne)
{
	var produkcjeIZrodla=[];
	for (var i=0;i<genyProdukcyjne.length;i++)
	{
		produkcjeIZrodla.push((genyProdukcyjne[i])[1]);
	}
	var wyprodukowaneWezly=[];
	var wezel=["kwadrat",1];
	var idWezla=2;
	wyprodukowaneWezly.push(wezel);
	dostepneWezly=[true]
	for (var i=0;i<genyProdukcyjne.length;i++)
	{
		var kolejnaProdukcja=produkcjeIZrodla[i];
		var nrZr=(kolejnaProdukcja[0]);
		var numerZrodla=parseInt(nrZr,10);
		if(!dostepneWezly[numerZrodla-1]||
				((wyprodukowaneWezly[numerZrodla-1])[0]=="kwadrat"&&
						(kolejnaProdukcja[1]==2||kolejnaProdukcja[1]==5))||
				((wyprodukowaneWezly[numerZrodla-1])[0]=="trójkąt"&&
						(kolejnaProdukcja[1]==1||kolejnaProdukcja[1]==3||kolejnaProdukcja[1]==4)))
		{
			var przedrostek="";
			for(var j=0;j<wyprodukowaneWezly.length;j++)
			{
				switch(kolejnaProdukcja[1])
				{
				case 1:
				case 3:
				case 4:
					if((wyprodukowaneWezly[j])[0]=="kwadrat"&&
							dostepneWezly[(wyprodukowaneWezly[j])[1]-1])
					{
						(produkcjeIZrodla[i])[0]=przedrostek+(wyprodukowaneWezly[j])[1]-1;
						j=wyprodukowaneWezly.length;
					}
				break;
				case 2:
				case 5:
					if((wyprodukowaneWezly[j])[0]=="trojkąt"&&
							dostepneWezly[(wyprodukowaneWezly[j])[1]-1])
					{
						(produkcjeIZrodla[i])[0]=przedrostek+(wyprodukowaneWezly[j])[1]-1;
						j=wyprodukowaneWezly.length;
					}					
				break;
				}
			}
			nrZr=(kolejnaProdukcja[0]);
			numerZrodla=parseInt(nrZr,10);
			kolejnaProdukcja=produkcjeIZrodla[i];
		}
		switch(kolejnaProdukcja[1])
		{
			case 1:
				dostepneWezly[numerZrodla-1]=false;
			break;
			case 2:
				dostepneWezly[numerZrodla-1]=false;
			break;
			case 3:
				wezel=["kwadrat",idWezla];
				idWezla++;
				wyprodukowaneWezly.push(wezel);
				dostepneWezly.push(true);
			break;
			case 4:
				dostepneWezly[numerZrodla-1]=false;
				wezel=["trojkąt",idWezla];
				idWezla++;
				wyprodukowaneWezly.push(wezel);
				dostepneWezly.push(true);
				wezel=["trojkąt",idWezla];
				idWezla++;
				wyprodukowaneWezly.push(wezel);
				dostepneWezly.push(true);
			break;
			case 5:
				dostepneWezly[numerZrodla-1]=false;
			break;
		}
	}
	for (var i=0;i<genyProdukcyjne.length;i++)
	{
		(genyProdukcyjne[i])[1]=produkcjeIZrodla[i];
	}
	return genyProdukcyjne;
}

function mozliweProdukcje(tablicaMozliwychProdukcji, numerProdukcji)
{
	switch(numerProdukcji)
	{
		case 1:
			tablicaMozliwychProdukcji[0]--;
			tablicaMozliwychProdukcji[2]--;
			tablicaMozliwychProdukcji[3]--;
		break;
		case 2:
			tablicaMozliwychProdukcji[1]--;
			tablicaMozliwychProdukcji[4]--;
		break;
		case 3:
			tablicaMozliwychProdukcji[0]++;
			tablicaMozliwychProdukcji[2]++;
			tablicaMozliwychProdukcji[3]++;
		break;
		case 4:
			tablicaMozliwychProdukcji[0]--;
			tablicaMozliwychProdukcji[2]--;
			tablicaMozliwychProdukcji[3]--;
			tablicaMozliwychProdukcji[1]+=2;
			tablicaMozliwychProdukcji[4]+=2;
		break;
		case 5:
			tablicaMozliwychProdukcji[1]--;
			tablicaMozliwychProdukcji[4]--;
		break;
	}
	return tablicaMozliwychProdukcji;
}

function mutuj(genotyp)
{
	var nowyGenotyp=genotyp;
	do
	{
		
	}
	while(!czyPoprawneProdukcje(nowyGenotyp));
	return nowyGenotyp;
}

function powiel(osobniki)
{
	var zwracaneOsobniki=osobniki;
	for(var n=0;n<3;n++)
	{
		var osobnikDoPowielenia=osobniki[Math.floor(Math.random()*7)];
		osobnikDoPowielenia[0]="Pokolenie"+obecnePokolenie+" Osobnik"+(n+8);
		zwracaneOsobniki.push(osobnikDoPowielenia);
	}
	return zwracaneOsobniki;
}

function krzyzujOsobniki(genotypy)
{
	var noweOsobniki=[];
	for(var k=0;k<7;k++)
	{
		var rodzic1=Math.floor(Math.random()*genotypy.length);
		do
		{
			var rodzic2=Math.floor(Math.random()*genotypy.length);
		}
		while(rodzic2===rodzic1);
		rodzic1=genotypy[rodzic1];
		rodzic2=genotypy[rodzic2];
		var test=rodzic1[1].length>rodzic2[1].length;
		var genotypPotomka=["Pokolenie"+obecnePokolenie+" Osobnik"+(k+1),[]];
		var indeks=0;
		while(indeks<Math.min(rodzic1[1].length, rodzic2[1].length))
		{
			genotypPotomka[1].push((rodzic1[1])[indeks]);
			genotypPotomka[1].push((rodzic2[1])[indeks]);
			indeks++
		}
		while(indeks<Math.max(rodzic1[1].length, rodzic2[1].length))
		{
			test?genotypPotomka[1].push((rodzic1[1])[indeks]):
			genotypPotomka[1].push((rodzic2[1])[indeks]);
			indeks++
		}
		var sprawdzenie=czyPoprawneProdukcje(genotypPotomka);
		while(!(sprawdzenie===true))
		{
			genotypPotomka[1].splice((-sprawdzenie),1);
			sprawdzenie=czyPoprawneProdukcje(genotypPotomka);
		}
		
		for(var i=0;i<genotypPotomka[1].length;i++)
			((genotypPotomka[1])[i])[0]="prod"+(i+1)
		noweOsobniki.push(genotypPotomka);
	}
	noweOsobniki=powiel(noweOsobniki);
	var czyMutowac=Math.floor(Math.random()*1000);
	if (czyMutowac<10)
		noweOsobniki[czyMutowac]=mutuj(noweOsobniki[czyMutowac]);
	var stareNoweOsobniki=noweOsobniki;
	for(var i=0;i<noweOsobniki.length;i++)
	{
		var doZmiany=poprawEwentualneBledyZrodla((noweOsobniki[i])[1]);
		(noweOsobniki[i])[1]=doZmiany;
	}
	return noweOsobniki;
}

function generator(pokolenie)
{
	var nowePokolenie=[];
	var idPokolenia=(uchwytDoGeneracji._groups[0])[0].id;
	if(pokolenie===null||pokolenie===undefined)
	{
		for (i=0;i<10;i++)
		{
			uchwytDoGeneracji.attr("id",idPokolenia+" Osobnik"+(i+1))
			nowePokolenie.push(generujKsztalt(uchwytDoGeneracji));
			uchwytDoGeneracji.select("#obrazek").remove();
		}
	}
	else
	{
		var wyniki=[];
		var maks=[[0,-1],[0,-1],[0,-1],[0,-1],[0,-1]];
		for(var i=0;i<10;i++)
		{
			uchwytDoPokazywania.select("g").remove();
			pokazWygenerowanyKsztalt(uchwytDoPokazywania.append("g").attr("id","obrazek"), 
									pokolenie[i]);
			wyniki.push(oceń((uchwytDoPokazywania.select("#obrazek")._groups[0])[0]));
			if(i<5)
			{
				(maks[i])[0]=wyniki[i];
				(maks[i])[1]=i;
			}
			else
			{
				maks.sort(function(a,b){return a[0]-b[0]})
				if((maks[0])[0]<wyniki[i])
				{
					(maks[0])[0]=wyniki[i];
					(maks[0])[1]=i;
				}
			}
		}
		var doSkrzyzowania=[];
		for(var i=0;i<maks.length;i++)
		{
			doSkrzyzowania.push(pokolenie[(maks[i])[1]])
		}
		nowePokolenie=krzyzujOsobniki(doSkrzyzowania);
	}
	return nowePokolenie;
}

var tabelaPokole;
var obecnePokolenie=1;
var pokolenia=[];

function stworzTabele()
{
	var dol=d3.select("#dol");
	dol.select("fieldset").remove();
	tabelaPokolen=dol.append("center").append("table").style("border", "1px solid black")
							.style("border-collapse","collapse")
							.style("width","90%");
	var naglowki=tabelaPokolen.append("tr");
	naglowki.append("th").text("Pokolenie").style("border", "1px solid black")
				.style("border-collapse","collapse")
				.style("width","10%");
	for (o=1;o<11;o++)
		naglowki.append("th").text("Osobnik nr "+o).style("border", "1px solid black")
					.style("border-collapse","collapse")
					.style("width","8%");
	dodajPokolenieDoTabeli(generator());
}

function dodajPokolenieDoTabeli(pokolenie)
{
	var wiersz=tabelaPokolen.append("tr").style("border", "1px solid black")
				.style("border-collapse","collapse").style("text-align","left");
	wiersz.append("th").text(obecnePokolenie).attr("id","pokolenie"+obecnePokolenie)
						.style("width","10%")
						.style("vertical-align","baseline");
	for (o=0;o<10;o++)
	{
		var komorka=wiersz.append("td").style("border", "1px solid black")
				.style("border-collapse","collapse")
				.style("width","8%")
				.style("vertical-align","baseline")
				.append("ol");
		for (var z=0;z<(pokolenie[o])[1].length;z++)
		{
			komorka.append("li").text((((pokolenie[o])[1])[z])[1]);
		}
	}
	obecnePokolenie++;
	pokolenia.push(pokolenie);
}

function interfejsGenetyki()
{
	d3.select("#siatka").remove();
	stworzTabele();
	var interfejsGenetyczny=interfejsy.append("fieldset");
	interfejsGenetyczny.append("h2").text("Generator");
	var linia=interfejsGenetyczny.append("p").text("Wyświetl osobnika:");
	linia=interfejsGenetyczny.append("div").attr("id","pokolenie");
	linia.append("div").text("Pokolenie: ").style("float","left");
	linia.append("div").style("float","left")
		.append("input").attr("type", "text").attr("name","pokolenie").style("size","5")
					.attr("id","wybranePokolenie").attr("value","1");
	linia=interfejsGenetyczny.append("div").attr("id","osobnik");
	linia.append("div").text("Numer osobnika: ").style("float","left");
	linia.append("div").style("float","left")
		.append("input").attr("type", "text").attr("name","osobnik").style("size","5")
					.attr("id","wybranyOsobnik").attr("value","1");
	
	function pokazOsobnika(e){
		var wybranePokolenie=parseInt((d3.select("#wybranePokolenie")._groups[0])[0].value,10)-1;
		var wybranyOsobnik=parseInt((d3.select("#wybranyOsobnik")._groups[0])[0].value,10)-1;
		uchwytDoPokazywania.select("#obrazek").remove();
		pokazWygenerowanyKsztalt(uchwytDoPokazywania.append("g").attr("id","obrazek"), 
								(pokolenia[wybranePokolenie])[wybranyOsobnik]);
	}
	
	var przycisk=interfejsGenetyczny.append("div").style("clear","both").append("center")
		.append("form").append("input").attr("type","button").attr("value","Pokaż")
	var tymcz=przycisk._groups[0]
	tymcz[0].addEventListener("click",pokazOsobnika)
	
	function krzyzuj(e)
	{
		uchwytDoGeneracji.attr("id","Pokolenie"+obecnePokolenie);
		var nowePokol=generator(pokolenia[obecnePokolenie-2]);
		pokolenia.push(nowePokol);
		dodajPokolenieDoTabeli(nowePokol);
		pokazOsobnika();
	}
	
	przycisk=interfejsGenetyczny.append("div").style("clear","both").append("center")
		.append("form").append("input").attr("type","button").attr("value","Nowe pokolenie")
	tymcz=przycisk._groups[0]
	tymcz[0].addEventListener("click",krzyzuj)
}

var uchwytDoGeneracji=d3.select("body").append("svg")
	.attr("width", 800)
	.attr("height", 800)
	.attr("id","Pokolenie"+obecnePokolenie)
	.style("visibility","hidden")
var uchwytDoPokazywania=d3.select("#Obrazek1");
interfejsGenetyki();