var redWords = [];
var blueWords = [];
var neutralWords = [];
var deathWord = -1;
var shownWords = [];
var i=1;
var currentList = defaultList;
var gameCode="";
var align;
var word;
var turnColor;
var colorShown = false;
var words = [];
function randomStart(){
	document.getElementById("startPage").style.display = "none";
	document.getElementById("gamePage").style.display = "initial";
	turnColor = Math.floor(Math.random() * 2);
	gameCode += turnColor;
	while(i<=25){
		word = getWord();
		document.getElementById(i).innerHTML=currentList[word];
		i++;
	}
	getAlign();
	if(turnColor == 0){
		document.getElementById("currentTurn").innerHTML = "Current turn: Red";
		document.getElementById("currentTurn").style.color = "red";
	}
	else{
		document.getElementById("currentTurn").innerHTML = "Current turn: Blue";
		document.getElementById("currentTurn").style.color = "blue";
	}
}
function getAlign(){
	var num;
	var usedNum = [];
	if(turnColor==0){
		while(redWords.length<9){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				redWords.push(num);
			}
		}
		while(blueWords.length<8){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				blueWords.push(num);
			}
		}
	}
	else{
		while(redWords.length<8){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				redWords.push(num);
			}
		}
		while(blueWords.length<9){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				blueWords.push(num);
			}
		}
	}
	while(neutralWords.length<7){
		num = Math.floor(Math.random() * 25)+1;
		if(!usedNum.includes(num)){
			usedNum.push(num);
			neutralWords.push(num);
		}
	}
	i=1;
	while(i<=25 && deathWord==-1){
		if(!usedNum.includes(i)){
			deathWord = i;
		}
		else{
			i++;
		}
	}
		
}
function getWord(){
	word = Math.floor(Math.random() * currentList.length);
	
	if(words.includes(word)){
		return getWord();
	}
	else{
		words.push(word);
		return word;
	}
}
function seedStart(){
	currentList=defaultList;
	gameCode = prompt("Enter the game code");
	var code = gameCode.split(" ");
	document.getElementById("startPage").style.display = "none";
	document.getElementById("gamePage").style.display = "initial";
	turnColor = code[0];
	i=1;
	while(i<=25){
		if(code[i].charAt(0)==0){
			redWords.push(i);
			document.getElementById(i).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		else if(code[i].charAt(0)==1){
			blueWords.push(i);
			document.getElementById(i).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		else if(code[i].charAt(0)==2){
			neutralWords.push(i);
			document.getElementById(i).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		else{
			deathWord = i;
			document.getElementById(i).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		i++;
	}
}
function getCode(){
	i=1;
	while(i<=25){
		if(deathWord == i){
			gameCode += " " + 3;
		}
		else if(neutralWords.includes(i)){
			gameCode += " " + 2;
		}
		else if(blueWords.includes(i)){
			gameCode += " " + 1;
		}
		else{
			gameCode += " " + 0;
		}
		gameCode += words[i-1].toString(16);
		i++;
	}
	navigator.clipboard.writeText(gameCode).then(function() {
		
		alert("Game Code copied to clipboard");
		}, function() {
			alert("error");
			console.log(gameCode);
		});
}
function showColor(){
	if(colorShown){
		i=1;
		while(i<=25){
			if(shownWords.includes(i)){
				i++;
			}
			else{
				document.getElementById(i).style.backgroundColor = "white";
				document.getElementById(i).style.color = "black";
				i++;
			}
		}
		colorShown = false;
	}
	else{
		i=1;
		while(i<=25){
			if(redWords.includes(i)){
				document.getElementById(i).style.backgroundColor = "red";
			}
			else if(blueWords.includes(i)){
				document.getElementById(i).style.backgroundColor = "blue";
				document.getElementById(i).style.color = "white";
			}
			else if(neutralWords.includes(i)){
				document.getElementById(i).style.backgroundColor = "tan";
			}
			else if (i==deathWord){
				document.getElementById(i).style.backgroundColor = "black";
				document.getElementById(i).style.color = "white";
			}
			i++;
		}
		colorShown = true;
	}
}