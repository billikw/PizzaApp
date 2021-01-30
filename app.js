"use strict";

/* SELECTORS */
//IDs:
    //Modals and Spans:
    const _welcomeText = "welcomeText";
    const _size = "size";
    const _crust = "crust";
    const _toppings = "toppings";
    const _options = "options";
    const _warningMaxToppings = "warningMaxToppings";
    const _warningNoToppings = "warningNoToppings";
    const _currentPizza = "currentPizza";
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
    const _btnAddPizza = "btnAddPizza"; 
    //Modals and Spans:
    const welcomeText = document.querySelector(`#${_welcomeText}`);
    const sizeModal = document.querySelector(`#${_size}`);
    const crustModal = document.querySelector(`#${_crust}`);
    const toppingsModal = document.querySelector(`#${_toppings}`);
    const optionsModal = document.querySelector(`#${_options}`);
    const maxToppingsWarning = document.querySelector(`#${_warningMaxToppings}`);
    const noToppingsWarning = document.querySelector(`#${_warningNoToppings}`);
    const currentPizza = document.querySelector(`#${_currentPizza}`);
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
    const addPizzaButton = document.querySelector(`#${_btnAddPizza}`);
    // Get Element By ID:
    function elem(id) {
        return document.getElementById(id);
    }

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
    btnUnselected(_btnThin);
});
//Options Modal:
nextButton.addEventListener("click", function(){
    btnSelected(_btnNext),
    showOptions()
})
//Topping buttons:
pepperoniButton.addEventListener("click", function(){
    addTopping("pepperoni", _btnPepperoni); 
});
redOnionButton.addEventListener("click", function(){
    addTopping("red onion", _btnRedOnion);
});
mixedPeppersButton.addEventListener("click", function(){
    addTopping("mixed peppers", _btnMixedPeppers);
});
cheeseButton.addEventListener("click", function(){
    addTopping("cheese", _btnCheese);
});
//Add pizza:
addPizzaButton.addEventListener("click", function(){
    addToBasket();
})

/* PIZZA GLOBAL */
var pizza;
var basket = [];

/* PIZZA BUILDER */
function pizzaObject(crust, size, toppings) {
   this.crust = crust;
   this.size = size;
   this.toppings = toppings;
}

/* FUNCTIONS */
function startPizza(){
    showModal(_size);
    //Clean up:
    pizza = undefined;
    remover(hideModal,[_crust,_toppings,_options]);
    remover(btnUnselected,[_btn12inch,_btn14inch,_btnThick,_btnThin,_btnNext]);
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
        hideModal(_warningNoToppings);
        hideModal(_warningMaxToppings);
        remover(hideModal,[_options]);
        remover(btnUnselected,[_btnPepperoni,_btnRedOnion,_btnMixedPeppers,_btnCheese,_btnNext]);
}
function showOptions(){
    if (pizza.toppings == undefined || pizza.toppings.length <1){  
        showModal(_warningNoToppings);
        btnUnselected(_btnNext);
    } else {
        hideModal(_warningNoToppings);
        showModal(_options);
        showPizza();
    }
}
function showPizza(){
    currentPizza.innerHTML = `Your pizza<br/>Size: ${pizza.size}<br/>Crust: ${pizza.crust}<br/>Toppings:${pizza.toppings}</span><br/><br/>`;
    remover(hideModal,[_toppings,_crust,_size]);
}
function addToBasket(){
    basket.push(pizza);
    // Clean up:
    pizza = undefined;
    remover(hideModal,[_options]);
    toggleResetBtn();
}
// Add class:
function hideModal(id) {
    elem(id).classList.add("inactive");
}
// Remove class:
function showModal(id) {
    elem(id).classList.remove("inactive");
}
// Activate button:
function btnSelected(id){
    elem(id).classList.replace("btnUnselected","btnSelected");
}
// Activate toppings button:
function btnToppingSelected(id){
    elem(id).classList.replace("btnUnselected","btnToppingClicked");
}
// Reset buttons:
function btnUnselected(id){
    elem(id).classList != "btnToppingClicked" 
    ? elem(id).classList.replace("btnSelected","btnUnselected")
    : elem(id).classList.replace("btnToppingClicked", "btnUnselected");
}
// Resets all modals or buttons:
function remover(removalFunction,arr){
    for (let i=0; i<arr.length; i++){
        removalFunction(arr[i]);
    }
}
// Toggle the Start/Reset button:
function toggleResetBtn(){
    startButton.classList == "btnUnselected" 
    ? (startButton.classList.replace("btnUnselected", "btnReset"), startButton.innerText = "Start again?") 
    : (startButton.classList.replace( "btnReset","btnUnselected"), startButton.innerText = "Let's Start!", hideModal(_size))
}
// Checks if the toppings key value is an array, then checks if the max length (5) has been reached. If not add the topping to the array and toggle the button style to clicked.
function addTopping(t,b){
    if (pizza.toppings == undefined){
        pizza.toppings = []
    }
    hideModal(_warningNoToppings);
    pizza.toppings.length <= 4
    ? (pizza.toppings.push(` ${t}`), btnToppingSelected(b))
    : showModal(_warningMaxToppings);
}