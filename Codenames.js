var redWords = [];
var blueWords = [];
var neutralWords = [];
var deathWord = -1;
var shownWords = [];
var i=1;
var currentList;
var gameCode="";
var align;
var word;
var turnColor;
var colorShown = false;
var words = [];
var over = false;
function randomStart(){
	redWords = [];
	blueWords = [];
	neutralWords = [];
	deathWord = -1;
	shownWords = [];
	i=1;
	currentList = [];
	gameCode="";
	align = -1;
	word = -1;
	turnColor = -1;
	words = [];
	over = false;
	if(document.getElementById("list").value == "Classic"){
		currentList = defaultList;
	}
	else if(document.getElementById("list").value == "Harry Potter"){
		currentList = harryPotter;
	}
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
		document.getElementById("currentTurn").style.color = "dodgerblue";
	}
	document.getElementById("redTotal").innerHTML = "Red words left: " + redWords.length;
	document.getElementById("blueTotal").innerHTML = "Blue words left: " + blueWords.length;
	document.getElementById("neutralTotal").innerHTML = "Neutral words left: " + neutralWords.length;
	colorShown = true;
	showColor();
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
	gameCode = prompt("Enter the game code");
	var code = gameCode.split(" ");
	document.getElementById("startPage").style.display = "none";
	document.getElementById("gamePage").style.display = "initial";
	turnColor = code[0];
	if(code[1] == 0){
		currentList = defaultList;
	}
	else if(code[1] == 1){
		currentList = harryPotter;
	}
	if(turnColor == 0){
		document.getElementById("currentTurn").innerHTML = "Current turn: Red";
		document.getElementById("currentTurn").style.color = "red";
	}
	else{
		document.getElementById("currentTurn").innerHTML = "Current turn: Blue";
		document.getElementById("currentTurn").style.color = "dodgerblue";
	}
	i=2;
	while(i<=26){
		if(code[i].charAt(0)==0){
			redWords.push(i-1);
			document.getElementById(i-1).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		else if(code[i].charAt(0)==1){
			blueWords.push(i-1);
			document.getElementById(i-1).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		else if(code[i].charAt(0)==2){
			neutralWords.push(i-1);
			document.getElementById(i-1).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		else{
			deathWord = i-1;
			document.getElementById(i-1).innerHTML = currentList[parseInt(code[i].substr(1),16)];
		}
		
		i++;
	}
}
function takeTurn(b){
	if(!over){
		if(deathWord == b){
			if(turnColor==0){
				gameOver(1);
			}
			else{
				gameOver(0);
			}
		}
		else if(shownWords.includes(b)){
			alert("That word has already been selected.Try Again");
		}
		else{
			if(redWords.includes(b)){
				shownWords.push(b);
				redWords.splice(redWords.indexOf(b), 1);
				checkWin();
				document.getElementById(b).style.backgroundColor = "red";
				document.getElementById(b).style.color = "white";
				if(turnColor == 1){
					changeTurn();
				}
			}
			else if(blueWords.includes(b)){
				shownWords.push(b);
				blueWords.splice(blueWords.indexOf(b), 1);
				checkWin();
				document.getElementById(b).style.backgroundColor = "dodgerblue";
				document.getElementById(b).style.color = "white";
				if(turnColor == 0){
					changeTurn();
				}
			}
			else if(neutralWords.includes(b)){
				shownWords.push(b);
				neutralWords.splice(neutralWords.indexOf(b), 1);
				document.getElementById(b).style.backgroundColor = "tan";
				document.getElementById(b).style.color = "white";
				changeTurn();
			}
		}
		document.getElementById("redTotal").innerHTML = "Red words left: " + redWords.length;
		document.getElementById("blueTotal").innerHTML = "Blue words left: " + blueWords.length;
		document.getElementById("neutralTotal").innerHTML = "Neutral words left: " + neutralWords.length;
	}
}
function getCode(){
	gameCode = turnColor + "";
	if(document.getElementById("list").value == "Classic"){
		gameCode += " " + "0";
	}
	else if(document.getElementById("list").value == "Harry Potter"){
		gameCode += " " + "1";
	}
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
function checkWin(){
	if(redWords.length==0){
		gameOver(0);
	}
	else if(blueWords.length==0){
		gameOver(1);
	}
}
function gameOver(winner){
	over = true;
	shownWords = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
	showColor();
	document.getElementById("redTotal").innerHTML = "Red words left: " + redWords.length;
	document.getElementById("blueTotal").innerHTML = "Blue words left: " + blueWords.length;
	document.getElementById("neutralTotal").innerHTML = "Neutral words left: " + neutralWords.length;
	if(winner == 0){
		setTimeout(function() {
			alert("Red Wins!");
		},10)
	}
	else{
		setTimeout(function() {
			alert("Blue Wins!");
		},10)
	}
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
				document.getElementById(i).style.backgroundColor = "dodgerblue";
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
function changeTurn(){
	if(turnColor == 0){
		turnColor = 1;
		document.getElementById("currentTurn").innerHTML = "Current turn: Blue";
		document.getElementById("currentTurn").style.color = "dodgerblue";
	}
	else{
		turnColor = 0;
		document.getElementById("currentTurn").innerHTML = "Current turn: Red";
		document.getElementById("currentTurn").style.color = "red";
	}
}