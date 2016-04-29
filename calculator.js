var log = ["Javascript Calculator", "By Jeremy Reed", "<hr>", ""];
var lastValue = "";
var currentValue = "";
var lastAnswer = "";
var operators = ['+', '-', '*', '/'];
var operatorAllow = false;
var decimalAllow = true;
var newTotal = true;
var viewLog = true;

function getValue() {
	return document.getElementById("total").innerHTML;
}

function clearTotal() {
	document.getElementById("total").innerHTML = "";
	log[log.length-1] = "";
	document.getElementById("log").innerHTML = log.join("<br />");	
	decimalAllow = true;
	newTotal = false;
	return true;
}

function aNumber(x) {
	if (getValue().length<19){
		if (newTotal==true) {
			log.push(lastAnswer);
			clearTotal();
		}
		if (x==".") {
			if (decimalAllow) {
				if (currentValue=="") { 
					document.getElementById("total").innerHTML += "0".toString() + x.toString(); 
				} else {
					document.getElementById("total").innerHTML += x.toString();
				}
				currentValue += x;
				log[log.length-1] = getValue().toString();
				document.getElementById("log").innerHTML = log.join("<br />");
				operatorAllow = true;
				decimalAllow = false;
			}
		} else {
			document.getElementById("total").innerHTML += x.toString();
			currentValue += x;
			log[log.length-1] = getValue().toString();
			document.getElementById("log").innerHTML = log.join("<br />");
			operatorAllow = true;
		}
	}
	return true;
}

function aOperation(x) {
	if (getValue().length<19){
		if (x=="="){
			var equation = getValue().replace("\u00F7", "/").replace("\u00D7", "*");
			
			if (equation) {
				lastAnswer = eval(equation);
				currentValue = "";
				log.push(lastAnswer);
				document.getElementById("total").innerHTML = lastAnswer;		
				log[log.length-2] = log[log.length-2].replace(/(\u00F7|\u00D7|\+|\-)/g, '<span class=\"hl\">$1</span>'); // for some reason this causes = to not continually show results on a new total
				document.getElementById("log").innerHTML = log.join("<br />");
				document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
				decimalAllow = true;
				newTotal = true;
			}
		} else {
			if (operatorAllow) {
				lastValue = getValue();
				currentValue = "";
				document.getElementById("total").innerHTML += x.replace(/\//g, '&divide;').replace(/\*/g, '&times;').toString();		
				log[log.length-1] = getValue().toString();
				document.getElementById("log").innerHTML = log.join("<br />");
				operatorAllow = false;	
			} else {
				if (getValue==""){
				log[log.length-1] = log[log.length-1].slice(0,-1) + x;
				document.getElementById("total").innerHTML = log[log.length-1];		
				document.getElementById("log").innerHTML = log.join("<br />");	
				}
			}
			decimalAllow = true;
			newTotal = false;
		}
	}
	return true;
}

function toggleLog() {
	if (viewLog) {
	document.getElementById("log").style.display= "none";
	document.getElementById("window").style.width= "322px";
	viewLog = false;
	} else {
	document.getElementById("log").style.display= "block";
	document.getElementById("window").style.width= "580px";
		viewLog = true;
	}
	return true;
}