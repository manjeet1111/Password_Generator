const inputsSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-LengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowerase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-Indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelector("input [type=checkbox]");
const symbols='~!@#$%^&*()_+=[]{}:";/?.,<>';


let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();
//set password length
function handleSlider(){
    inputsSlider.value=passwordLength;
    lengthDisplay.textContent=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
}

function getRndInteger(min,max){
    return Math.floor( Math.random()*(max-min))+min;
}

function generateRandomInteger(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode( getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode( getRndInteger(65,91));
}

function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym)&&
        passwordLength>=6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText='Copied';
    }
    catch(e){
        copyMsg.innerText="Failer";
    }
    //to make copy span visible
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000)
}

inputsSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})