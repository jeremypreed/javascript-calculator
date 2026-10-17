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
			var equation = getValue().replace(/\u00F7/g, "/").replace(/\u00D7/g, "*");
			
			if (equation && operators.indexOf(equation.slice(-1)) == -1) {
				lastAnswer = eval(equation);
				if (isFinite(lastAnswer)) {
					// round off floating point noise, e.g. 0.1+0.2
					lastAnswer = parseFloat(lastAnswer.toPrecision(12));
					operatorAllow = true;
				} else {
					// divide by zero
					lastAnswer = "Error";
					operatorAllow = false;
				}
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
				newTotal = false;
			} else {
				if (getValue() != "" && !newTotal) {
					document.getElementById("total").innerHTML = getValue().slice(0,-1) + x.replace(/\//g, '&divide;').replace(/\*/g, '&times;');
					log[log.length-1] = getValue().toString();
					document.getElementById("log").innerHTML = log.join("<br />");
				}
			}
			decimalAllow = true;
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

function backspace() {
	var value = getValue();
	if (newTotal || value == "") return true;
	value = value.slice(0,-1);
	document.getElementById("total").innerHTML = value;
	currentValue = value.split(/[+\-\u00D7\u00F7]/).pop();
	operatorAllow = currentValue != "";
	decimalAllow = currentValue.indexOf(".") == -1;
	log[log.length-1] = value;
	document.getElementById("log").innerHTML = log.join("<br />");
	return true;
}

document.addEventListener("keydown", function(evt) {
	var key = evt.key;
	if (key >= "0" && key <= "9") {
		aNumber(parseInt(key));
	} else if (key == ".") {
		aNumber(".");
	} else if (operators.indexOf(key) != -1) {
		aOperation(key);
	} else if (key == "Enter" || key == "=") {
		aOperation("=");
	} else if (key == "Backspace") {
		backspace();
	} else if (key == "Escape" || key == "c" || key == "C") {
		clearTotal();
	} else {
		return;
	}
	evt.preventDefault();
});