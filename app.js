"use strict";

/* SELECTORS */

//IDs:
    //Modals:
    const _welcomeText = "welcomeText";
    const _size = "size";
    const _crust = "crust";
    const _toppings = "toppings";
    const _options = "options";
    //Buttons:
    const _btnStart = "btnStart";
    const _btn12inch = "btn12inch";
    const _btn14inch = "btn14inch";
    const _btnThick = "btnThick";
    const _btnThin = "btnThin";

//Query Selectors: 
    //Modals:
    const welcomeText = document.querySelector(`#${_welcomeText}`);
    const sizeModal = document.querySelector(`#${_size}`);
    const crustModal = document.querySelector(`#${_crust}`);
    const toppingsModal = document.querySelector(`#${_toppings}`);
    const optionsModal = document.querySelector(`#${_options}`);
    //Buttons:
    const startButton = document.querySelector(`#${_btnStart}`);
    const twelveInchButton = document.querySelector(`#${_btn12inch}`);
    const fourteenInchButton = document.querySelector(`#${_btn14inch}`);
    const thinButton = document.querySelector(`#${_btnThin}`);
    const thickButton = document.querySelector(`#${_btnThick}`);


/* LISTENERS */
//Start Modal:
startButton.addEventListener("click", function(){
    startPizza()
    pizza = new pizzaObject();
    toggleResetBtn();
});
//Size Modal:
twelveInchButton.addEventListener("click", function(){
    showCrust(),
    pizza.size = 12;
    btnUnselected(_btn14inch),
    btnSelected(_btn12inch)
});
fourteenInchButton.addEventListener("click", function(){
    showCrust(),
    pizza.size = 14;
    btnUnselected(_btn12inch),
    btnSelected(_btn14inch)
});
//Crust Modal:
thinButton.addEventListener("click", function(){
    showToppings(),
    pizza.crust = "thin";
    btnSelected(_btnThin),
    btnUnselected(_btnThick)
});
thickButton.addEventListener("click", function(){
    showToppings(),
    pizza.crust = "thick";
    btnSelected(_btnThick),
    btnUnselected(_btnThin)
});


/* PIZZA GLOBAL */
var pizza;
var basket = [];

/* PIZZA BUILDER */
function pizzaObject(crust, size, toppings, extraOptions) {
   this.crust = crust;
   this.size = size;
   this.toppings = toppings;
   this.extraOptions = extraOptions;
}

/* FUNCTIONS */

function startPizza(){
    showModal(_size);
    //Clean up:
    pizza = undefined;
    remover(hideModal,[_crust,_toppings,_options]);
    remover(btnUnselected,[_btn12inch,_btn14inch,_btnThick,_btnThin]);
}
function showCrust(){
    showModal(_crust);
    //Clean Up:
    remover(hideModal,[_toppings,_options]);
    remover(btnUnselected,[_btnThick,_btnThin]);
    pizza.crust = undefined;
}
function showToppings(){
    showModal(_toppings);
    //Clean Up:
    remover(hideModal,[_options]);
}
function showOptions(){
    showModal(_options);
}
function resetState(){
    btnUnselectAll([_btn12inch,_btn14inch,_btnThick,_btnThin]);
}
// Add class:
function hideModal(id) {
    document.getElementById(id).classList.add("inactive");
}
// Remove class:
function showModal(id) {
    document.getElementById(id).classList.remove("inactive");
}
// Activate button:
function btnSelected(id){
    document.getElementById(id).classList.replace("btnUnselected","btnSelected");
}
// Reset buttons:
function btnUnselected(id){
    document.getElementById(id).classList.replace("btnSelected","btnUnselected");
}
// Resets all modals or buttons:
function remover(btnOrModal,arr){
    for (let i=0; i<arr.length; i++){
        btnOrModal(arr[i]);
    }
}
// Toggle the Start/Reset button:
function toggleResetBtn(){
    startButton.classList == "btnUnselected" 
    ? (startButton.classList.replace("btnUnselected", "btnReset"), startButton.innerHTML = "Start again?") 
    : (startButton.classList.replace( "btnReset","btnUnselected"), startButton.innerHTML = "Let's Start!", hideModal(_size))
}