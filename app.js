"use strict";

/* SELECTORS */

//IDs:
    //Modals:
    const _welcomeText = "welcomeText";
    const _size = "size";
    const _crust = "crust";
    const _toppings = "toppings";
    const _options = "options";
    const _warningMaxToppings = "warningMaxToppings";
    //Buttons:
    const _btnStart = "btnStart";
    const _btn12inch = "btn12inch";
    const _btn14inch = "btn14inch";
    const _btnThick = "btnThick";
    const _btnThin = "btnThin";
    const _btnNext = "btnNext";
    const _btnPepperoni = "btnPepperoni";
    const _btnRedOnion = "btnRedOnion";
    const _btnMixedPeppers = "btnMixedPeppers";
    const _btnCheese = "btnCheese";


//Query Selectors: 
    //Modals:
    const welcomeText = document.querySelector(`#${_welcomeText}`);
    const sizeModal = document.querySelector(`#${_size}`);
    const crustModal = document.querySelector(`#${_crust}`);
    const toppingsModal = document.querySelector(`#${_toppings}`);
    const optionsModal = document.querySelector(`#${_options}`);
    const maxToppingsWarning = document.querySelector(`#${_warningMaxToppings}`);
    //Buttons:
    const startButton = document.querySelector(`#${_btnStart}`);
    const twelveInchButton = document.querySelector(`#${_btn12inch}`);
    const fourteenInchButton = document.querySelector(`#${_btn14inch}`);
    const thinButton = document.querySelector(`#${_btnThin}`);
    const thickButton = document.querySelector(`#${_btnThick}`);
    const nextButton = document.querySelector(`#${_btnNext}`);
    const pepperoniButton = document.querySelector(`#${_btnPepperoni}`);
    const redOnionButton = document.querySelector(`#${_btnRedOnion}`);
    const mixedPeppersButton = document.querySelector(`#${_btnMixedPeppers}`);
    const cheeseButton = document.querySelector(`#${_btnCheese}`);


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
// Topping buttons:
pepperoniButton.addEventListener("click", function(){
    addTopping("pepperoni"),
    btnToppingSelected(_btnPepperoni)
});
redOnionButton.addEventListener("click", function(){
    addTopping("red onion");
    btnToppingSelected(_btnRedOnion);
});
mixedPeppersButton.addEventListener("click", function(){
    addTopping("mixed peppers");
    btnToppingSelected(_btnMixedPeppers);
});
cheeseButton.addEventListener("click", function(){
    addTopping("cheese");
    btnToppingSelected(_btnCheese);
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
    pizza.toppings = undefined;
}
function showToppings(){
    showModal(_toppings);
    //Clean Up:
    pizza.toppings = undefined;
    hideModal(_warningMaxToppings);
    remover(hideModal,[_options]);
    remover(btnUnselected,[_btnPepperoni,_btnRedOnion,_btnMixedPeppers,_btnCheese]);
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
// Activate toppings button:
function btnToppingSelected(id){
    document.getElementById(id).classList.replace("btnUnselected","btnToppingClicked");
}
// Reset buttons:
function btnUnselected(id){
    document.getElementById(id).classList != "btnToppingClicked" 
    ? document.getElementById(id).classList.replace("btnSelected","btnUnselected")
    : document.getElementById(id).classList.replace("btnToppingClicked", "btnUnselected");
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
function addTopping(t){
    if (pizza.toppings == undefined){
        pizza.toppings = []
    }
    pizza.toppings.length <= 4
    ? pizza.toppings.push(t)
    : showModal(_warningMaxToppings);
}