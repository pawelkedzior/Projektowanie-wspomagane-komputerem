function czyObrazekSkonczony(koleczka)
{
	var kola=koleczka;
	if(kola.length!=0)
	{
		for(i=0;i<kola.length;i++)
		{
			if(kola[i].style.fill==="black")
				return false;
		}
	}
	return true;
}


function polozenieKwadratu(kwadrat)
{
	return [kwadrat.x.baseVal.value/40,kwadrat.y.baseVal.value/40]
}

function polozenieKola(kolo)
{
	return [(kolo.cx.baseVal.value-20)/40,(kolo.cy.baseVal.value-20)/40]
}

function polozenieTrojkata(trojkat)
{
	var punkt1=trojkat.points[0];
	var punkt2=trojkat.points[1];
	var punkt3=trojkat.points[2];
	if(punkt1.x===punkt2.x||punkt3.x===punkt2.x||punkt1.x===punkt3.x)
	{
		if(punkt1.x===punkt2.x)
		{
			if(punkt1.x>punkt3.x)
			{
				return [punkt3.x/40,(punkt3.y-20)/40]
			}
			else
			{
				return [punkt1.x/40,(punkt3.y-20)/40]
			}
		}
		else if(punkt3.x===punkt2.x)
		{
			if(punkt1.x>punkt3.x)
			{
				return [punkt3.x/40,(punkt1.y-20)/40]
			}
			else
			{
				return [punkt1.x/40,(punkt1.y-20)/40]
			}
		}
		else
		{
			if(punkt2.x>punkt3.x)
			{
				return [punkt3.x/40,(punkt2.y-20)/40]
			}
			else
			{
				return [punkt2.x/40,(punkt2.y-20)/40]
			}
		}
	}
	else
	{
		if(punkt1.y===punkt2.y)
		{
			if(punkt1.y>punkt3.y)
			{
				return [(punkt3.x-20)/40,punkt3.y/40]
			}
			else
			{
				return [(punkt3.x-20)/40,punkt1.y/40]
			}
		}
		else if(punkt3.y===punkt2.y)
		{
			if(punkt1.y>punkt3.y)
			{
				return [(punkt1.x-20)/40,punkt3.y/40]
			}
			else
			{
				return [(punkt1.x-20)/40,punkt1.y/40]
			}
		}
		else
		{
			if(punkt2.y>punkt3.y)
			{
				return [(punkt2.x-20)/40,punkt3.y/40]
			}
			else
			{
				return [(punkt2.x-20)/40,punkt2.y/40]
			}
		}
	}
}

function polozenia(figury)
{
	var obliczonePolozenia=[];
	for(i=0;i<figury.length;i++)
	{
		switch(figury[i].tagName)
		{
		case "rect":
			obliczonePolozenia.push(polozenieKwadratu(figury[i]))
		break;
		case "circle":
			if(figury[i].style.fill!="black")
				obliczonePolozenia.push(polozenieKola(figury[i]))
		break;
		case "polygon":
			obliczonePolozenia.push(polozenieTrojkata(figury[i]))
		break;
		}
	}
	return obliczonePolozenia;
}

function znajdzSymetrie(obrazek, polKwadr, polTrojk, polKol)
{
	var lewaGranica=10;
	var prawaGranica=10;
	var dolnaGranica=10;
	var gornaGranica=10;
	
	function wyznaczGranice(polFigur)
	{
		for(i=0;i<polFigur.length;i++)
		{
			var tymczas=polFigur[i];
			if(tymczas[0]<20&&tymczas[0]>-1&&tymczas[1]<20&&tymczas[1]>-1)
			{
				if(tymczas[0]<lewaGranica)
					lewaGranica=tymczas[0];
				if(tymczas[0]>prawaGranica)
					prawaGranica=tymczas[0];
				if(tymczas[1]>dolnaGranica)
					dolnaGranica=tymczas[1];
				if(tymczas[1]<gornaGranica)
					gornaGranica=tymczas[1];
			}
		}
	}
	
	wyznaczGranice(polKwadr);
	wyznaczGranice(polTrojk);
	wyznaczGranice(polKol);
	
	var srodek=[(prawaGranica+lewaGranica)/2,(gornaGranica+dolnaGranica)/2]
	var calkowityPion=(srodek[0]===Math.floor(srodek[0]));
	var calkowityPoziom=(srodek[1]===Math.floor(srodek[1]));
	var gorneFigury=[];
	var dolneFigury=[];
	var poziomeFigury=[];
	var leweFigury=[];
	var praweFigury=[];
	var pionoweFigury=[];
	var nazwaFigury;
	var numerek=1;
	
	function segregujFigury(polFigur)
	{
		for(i=0;i<polFigur.length;i++)
		{
			var tymcz=polFigur[i];
			if(tymcz[0]<srodek[0])
			{
				leweFigury.push([tymcz, nazwaFigury, numerek]);
			}
			else if(tymcz[0]>srodek[0])
			{
				praweFigury.push([tymcz, nazwaFigury, numerek]);
			}
			
			if(calkowityPion&&tymcz[0]===srodek[0])
			{
				pionoweFigury.push([tymcz, nazwaFigury, numerek])
			}
			
			if(calkowityPoziom&&tymcz[1]===srodek[1])
			{
				poziomeFigury.push([tymcz, nazwaFigury, numerek])
			}
			
			if(tymcz[1]<srodek[1])
			{
				gorneFigury.push([tymcz, nazwaFigury, numerek]);
			}
			else if(tymcz[1]>srodek[1])
			{
				dolneFigury.push([tymcz, nazwaFigury, numerek])
			}
			numerek++;
		}
	}
	
	nazwaFigury="Kwadrat"
	segregujFigury(polKwadr);
	nazwaFigury="Trojkąt"
	segregujFigury(polTrojk);
	nazwaFigury="Koło"
	segregujFigury(polKol);
	
	function porownajFigury(figura1, figura2)
	{
		polFigury1=figura1[0];
		polFigury2=figura2[0];
		
		var brakSymetrii=0;
		var symetria=1;
		var teSameFigury=2;
		var stopienPodobienstwa=0;
		
		var spr1=(srodek[1]-polFigury1[1]);
		var spr2=(srodek[1]-polFigury2[1]);
		var spr4=(srodek[0]-polFigury1[0]);
		var spr3=(srodek[0]-polFigury2[0]);
		
		if(((srodek[0]-polFigury1[0])===(polFigury2[0]-srodek[0])&&polFigury1[1]==polFigury2[1])||
			((srodek[1]-polFigury1[1])===(polFigury2[1]-srodek[1])&&polFigury1[0]==polFigury2[0]))
		{
			stopienPodobienstwa+=symetria;
			if (figura1[1]===figura2[1])
				stopienPodobienstwa+=teSameFigury;
		}
		return stopienPodobienstwa;
	}
	
	var czyJestSymetria=0;
	var symetriaPionowa=1;
	var symetriaPozioma=2;
	var pelnaSymetria=0;
	var wartoscPodobienstwa=0;
	for(i=0;i<gorneFigury.length;i++)
	{
		for(j=0;j<dolneFigury.length;j++)
		{
			wartoscPodobienstwa+=porownajFigury(gorneFigury[i],dolneFigury[j]);
		}
	}
	pelnaSymetria=3*Math.max(gorneFigury.length, dolneFigury.length);
	if(wartoscPodobienstwa/pelnaSymetria>0.9)
		czyJestSymetria+=symetriaPozioma;
	pelnaSymetria=0;
	wartoscPodobienstwa=0;
	for(i=0;i<praweFigury.length;i++)
	{
		for(j=0;j<leweFigury.length;j++)
		{
			wartoscPodobienstwa+=porownajFigury(praweFigury[i],leweFigury[j]);
		}
	}
	pelnaSymetria=3*Math.max(leweFigury.length, praweFigury.length);
	if(wartoscPodobienstwa/pelnaSymetria>0.9)
		czyJestSymetria+=symetriaPionowa;
	
	return czyJestSymetria;
}

function zbadajZroznicowanie(liczbaKwadratow, liczbaTrojkatow, liczbaKol)
{
	var zroznicowanie=0;
	var sumaFigur=liczbaKwadratow+liczbaTrojkatow+liczbaKol;
	var procentKol=liczbaKol/sumaFigur;
	var procentTrojk=liczbaTrojkatow/sumaFigur;
	var procentKwadr=liczbaKwadratow/sumaFigur;
	zroznicowanie+=2*procentKol;
	if((procentKwadr>procentTrojk-0.15)&&(procentKwadr<procentTrojk+0.15))
		zroznicowanie+=0.5;
	if((procentKol*2>procentTrojk-0.1)&&(procentKwadr-0.1<procentKol*2))
		zroznicowanie+=0.33;
	if((procentKwadr>procentTrojk*3)||(procentKwadr*3<procentTrojk))
		zroznicowanie-=0.5;
	return zroznicowanie>1?1:(zroznicowanie<0?0:zroznicowanie);
}

function oceń(obrazek)
{
	var wynik=0;
	var obr=d3.select(obrazek)	
	var punktyZaNachodzenieNaSiebie=-15;
	var pomocnicza=obr.selectAll("rect")._groups[0]
	var polozenieKwadratow=polozenia(pomocnicza);
	pomocnicza=obr.selectAll("circle")._groups[0]
	var punktyZaKoniec=czyObrazekSkonczony(pomocnicza)?0:-10000;
	var polozenieKol=polozenia(pomocnicza);
	pomocnicza=obr.selectAll("polygon")._groups[0]
	var polozenieTrojkatow=polozenia(pomocnicza);
	var liczbaNachodzacychNaSiebie=0;
	function porownajPolozenie(polozenieFigur1, polozenieFigur2)
	{
		if(polozenieFigur1!=polozenieFigur2)
			for(i=0;i<polozenieFigur1.length;i++)
			{
				for(j=0;j<polozenieFigur2.length;j++)
				{
					if(polozenieFigur2[j][0]===polozenieFigur1[i][0]&&polozenieFigur2[j][1]===polozenieFigur1[i][1])
					{
						liczbaNachodzacychNaSiebie++;
					}
				}
			}
		else
			for(i=0;i<polozenieFigur1.length;i++)
			{
				for(j=0;j<polozenieFigur2.length;j++)
				{
					if((i!=j)&&polozenieFigur2[j][0]===polozenieFigur1[i][0]&&polozenieFigur2[j][1]===polozenieFigur1[i][1])
					{
						liczbaNachodzacychNaSiebie++;
					}
				}
			}
	}
	porownajPolozenie(polozenieKwadratow, polozenieKwadratow);
	porownajPolozenie(polozenieKwadratow, polozenieTrojkatow);
	porownajPolozenie(polozenieKwadratow, polozenieKol);
	porownajPolozenie(polozenieTrojkatow, polozenieTrojkatow);
	porownajPolozenie(polozenieTrojkatow, polozenieKol);
	porownajPolozenie(polozenieKol, polozenieKol);
	var sumaPunktowZaNachodzenie=punktyZaNachodzenieNaSiebie*liczbaNachodzacychNaSiebie
	wynik=wynik+sumaPunktowZaNachodzenie;
	
	var punktyZaElement=20;
	var punktyZaKwadraty=polozenieKwadratow.length*punktyZaElement;
	var punktyZaKola=polozenieKol.length*punktyZaElement;
	var punktyZaTrojkaty=polozenieTrojkatow.length*punktyZaElement;
	var sumaPunktowZaLiczbe=punktyZaKwadraty+punktyZaKola+punktyZaTrojkaty;
	wynik+=sumaPunktowZaLiczbe+punktyZaKoniec;
	
	var symetrycznosc=znajdzSymetrie(obrazek, polozenieKwadratow, polozenieTrojkatow, polozenieKol);
	var liczbaSymetrii=(((symetrycznosc-symetrycznosc%2)/2)+(symetrycznosc%2));
	
	var punktyZaSymetrie=300;
	var sumaPunktowZaSymetrie=punktyZaSymetrie*liczbaSymetrii;
	wynik+=sumaPunktowZaSymetrie;
	
	var punktyZaRoznorodnoscFigur=200;
	var stopienZroznicowaniaFigur=zbadajZroznicowanie(polozenieKwadratow.length,
			polozenieTrojkatow.length,polozenieKol.length);
	var sumaPunktowZaRoznorodnosc=(stopienZroznicowaniaFigur>0.7)?punktyZaRoznorodnoscFigur:
			((stopienZroznicowaniaFigur<0.3)?0:punktyZaRoznorodnoscFigur*((stopienZroznicowaniaFigur-0.3)/0.4));
	wynik+=Math.floor(sumaPunktowZaRoznorodnosc);
	
	return wynik
}

var strona;
var obrazekIOcena;
var interfejsy;
var interfejsOceny;

function ekranOceny()
{
	strona=d3.select("body").append("div").attr("id","strona")
	obrazekIOcena=strona.append("div").attr("id","gora")
	legenda=strona.append("div").attr("id","dol").style("clear","both")
	var oryginal=d3.select("fieldset")
	var kopia=(oryginal._groups[0])[0].cloneNode(true);
	var cel=(legenda._groups[0])[0].appendChild(kopia);
	oryginal.remove();
	var obraz=obrazekIOcena.append("div").attr("id","lewo").style("width","80%")
		.style("float","left")
	interfejsy=obrazekIOcena.append("div").attr("id","prawo").style("width","20%")
		.style("float","left")
	interfejsOceny=interfejsy.append("fieldset")
	interfejsOceny.append("h2").text("Funkcja oceny")
	interfejsOceny.append("p").attr("id","ocenaksztaltu").text("Wynik za kształt: ")
	interfejsOceny.append("p").attr("id","ocenakoloru").text("Wynik za kolor: ")
	interfejsOceny.append("p").attr("id","ocenasumaryczna").text("Razem: ")
	function klikniecie(e){
		var doOceny=d3.selectAll("svg").select("#obrazek")._groups[0];
		var wyniki=[];
		for(l=0;l<1;l++)
		{
			var u=l;
			wyniki.push(oceń(doOceny[l]));
			var wynikZTeraz=wyniki[u];
			d3.select("#ocenaksztaltu").text("Wynik za kształt: "+wynikZTeraz)
			d3.select("#ocenasumaryczna").text("Razem: "+wynikZTeraz)
		}
	}
	var przycisk=interfejsOceny.append("center").append("form").append("input")
		.attr("type","button").attr("value","Oceń")
	var tymcz=przycisk._groups[0]
	tymcz[0].addEventListener("click",klikniecie)
	oryginal=d3.select("center")
	kopia=(oryginal._groups[0])[0].cloneNode(true);
	cel=(obraz._groups[0])[0].appendChild(kopia);
	oryginal.remove();
	obrazek=obraz.select("#obrazek")
	numer--;
	var grupa=document.getElementById(numer)
	grupa.addEventListener('dblclick',KwadratKoniec)
	grupa.addEventListener('click', KwadratITrojkaty, false)
	grupa.addEventListener('mouseup', bezBabelkow, false)
	grupa.addEventListener('mouseout',CzyZjechane)
	grupa.addEventListener('mousedown', ZnajdzPolozenie)
	numer++;

	document.getElementById("Obrazek1").addEventListener('mouseup',CzyZjechane)
}

ekranOceny();