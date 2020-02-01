//input fields
const firstName= document.getElementById('firstName');
const lastName= document.getElementById('lastName');
const password= document.getElementById('password');
const confirmPassword= document.getElementById('confirmPassword');
const email= document.getElementById('email');

//form
const form = document.getElementById('myForm');

//validation color
const green = '#4CAF50';
const red = '#F44336';

form.addEventListener('submit', function(event){
	//prevent default
	event.preventDefault();
	if(
		validateFirstName() && 
		validateLastName() && 
		validatePassword() && 
		validateConfirmPassword() && 
		validateEmail()
	){
		const name = firstName.value;
		const container = document.querySelector('div.container');
		const loader = document.createElement('div');
		loader.className = 'progress';
		const loadingBar = document.createElement('div');
		loadingBar.className = 'indeterminate';
		loader.appendChild(loadingBar);
		container.appendChild(loader);
		setTimeout(function() {
			const loaderDiv = document.querySelector('div.progress');
			const panel = document.createElement('div');
			panel.className = 'card-panel green';
			const text = document.createElement('text');
			text.className = 'white-text';
			text.appendChild(document.createTextNode(`Your sign up was succesful, ${name}.`));
			panel.appendChild(text);
			container.replaceChild(panel, loaderDiv);
			//proceed button
			const a = document.createElement('a');
			a.className = 'black-text';
			a.appendChild(document.createTextNode(" Click here to proceed."));
			a.href = "members.html";
			//include 'a' in panel
			panel.appendChild(a);
		}, 1000);
		
	}
});

//function passed to the html page
function validateFirstName(){
	//check if empty
	if(checkIfEmpty(firstName)) return;
	//ensure only letters
	if(!checkIfOnlyLetters(firstName)) return;
		return true;
}
function validateLastName(){
	//check if empty
	if(checkIfEmpty(lastName))return;
	//ensure only letters
	if(!checkIfOnlyLetters(lastName)) return;
		return true;
}
function validatePassword(){
	//check if empty
	if(checkIfEmpty(password)) return;
	//check length, (field, min, max)
	if(!meetLength(password, 4, 24)) return;
	//check against char set
	// 1- a
	// 2- a 1
	// 3- A a 1
	// 4- A a 1 @
	if(!containsCharacters(password, 2)) return;
		return true;
}
function validateConfirmPassword(){
	if(password.className != 'valid'){
		setInvalid(confirmPassword, 'Password is not valid');
		return;
	}
	//do they match
	if(password.value != confirmPassword.value){
		setInvalid(confirmPassword, 'Password does not match');
		return;
	}
	else{
		setValid(confirmPassword);
	}
	return true;
}
function validateEmail(){
	if(checkIfEmpty(email)) return;
	if(!containsCharacters(email, 5)) return;
		return true;
}

//utility functions
function setInvalid(field, message){
	field.className = 'invalid';
	field.nextElementSibling.innerHTML = message;
	field.nextElementSibling.style.color = red;
}
function setValid(field, message){
	field.className = 'valid';
	field.nextElementSibling.innerHTML = '';
	field.nextElementSibling.style.color = green;
}
function checkIfOnlyLetters(field){
	if(/^[a-zA-Z ]+$/.test(field.value)){
		setValid(field);
		return true;
	}
	else{
		setInvalid(field, `${field.name} name must contain only letters`);
		return false;
	}
}
function checkIfEmpty(field){
	if(isEmpty(field.value.trim())){
		//set as invalid
		setInvalid(field, `${field.name} must not be empty`);
		return true;
	}
	else{
		//set to valid
		setValid(field);
		return false;
	}
}
function isEmpty(value){
	if(value == '')
		return true;
	else{
		return false;
	}
}
//password check
function meetLength(field, minLength, maxLength){
	if(field.value.length >= minLength && field.value.length < maxLength){
		setValid(field);
		return true;
	}
	else if(field.value.length < minLength){
		setInvalid(field, `${field.name} must be at least ${minLength} characters`);
		return false;
	}
	else{
		setInvalid(field, `${field.name} must not be more than ${maxLength} characters`);
		return false;
	}
}
function containsCharacters(field, code){
	let regEx;
	switch(code){
		case 1:
			//letters
			regEx = /(?=.*[a-zA-Z])/;
			return matchWithRegEx(regEx, field, 'Must have at least 1 letter');
		case 2:
			//letters and numbers
			regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
			return matchWithRegEx(regEx, field, 'Must have at least 1 letter and 1 number');
		case 3:
			//one uppercase, lowercase and number
			regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
			return matchWithRegEx(regEx, field, 'Must have at least 1 uppercase and 1 lowercase');
		case 4:
			//one uppercase, lowercase, number and symbol
			regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
			return matchWithRegEx(regEx, field, 'Must have at least 1 special character');
		case 5:
			//email
			regEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return matchWithRegEx(regEX, field, 'Must have a valid email address');
		default:
			return false;
	}
}
function matchWithRegEx(regEx, field, message){
	if(field.value.match(regEx)){
		setValid(field);
		return true;
	}
	else{
		setInvalid(field, message);
		return false;
	}
}