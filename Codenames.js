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
	console.log(turnColor);
	gameCode += turnColor;
	while(i<=25){
		word = getWord();
		document.getElementById(i).innerHTML=currentList[word];
		i++;
	}
	console.log("test");
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
	console.log("test2");
	var num;
	var usedNum = [];
	if(turnColor==0){
		console.log("test3");
		while(redWords.length<9){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				redWords.push(num);
			}
			console.log(num);
		}
		while(blueWords.length<8){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				blueWords.push(num);
			}
			console.log(num);
		}
	}
	else{
		console.log("test3");
		while(redWords.length<8){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				redWords.push(num);
			}
			console.log(num);
		}
		while(blueWords.length<9){
			num = Math.floor(Math.random() * 25)+1;
			if(!usedNum.includes(num)){
				usedNum.push(num);
				blueWords.push(num);
			}
			console.log(num);
		}
	}
	console.log(redWords);
	console.log(blueWords);
	while(neutralWords.length<7){
		num = Math.floor(Math.random() * 25)+1;
		if(!usedNum.includes(num)){
			usedNum.push(num);
			neutralWords.push(num);
		}
	}
	console.log(neutralWords);
	i=1;
	console.log(deathWord);
	while(i<=25 && deathWord==-1){
		if(!usedNum.includes(i)){
			deathWord = i;
		}
		else{
			i++;
		}
	}
	console.log(deathWord);
		
}
function getWord(){
	word = Math.floor(Math.random() * currentList.length);
	
	if(words.includes(word)){
		return getWord();
	}
	else{
		return word;
	}
}
function seedStart(){
	currentList=defaultList;
	gameCode = prompt("Enter the game code");
	var code = gameCode.split(" ");
	console.log(code);
	document.getElementById("startPage").style.display = "none";
	document.getElementById("gamePage").style.display = "initial";
	turnColor = code[0];
	i=1;
	while(i<=26){
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
		console.log(i);
		console.log(currentList[parseInt(code[i].substr(1),16)]);
		i++;
	}
}
function getCode(){
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