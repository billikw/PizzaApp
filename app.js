
/* MODAL SELECTORS */
let welcomeText = document.querySelector("#welcomeText");
let sizeModal = document.querySelector("#size");
let crustModal = document.querySelector("#crust");
let optionsModal = document.querySelector("#options");
let startButton = document.querySelector("#btnStart");
let twelveInchButton = document.querySelector("#btn12inch");
let fourteenInchButton = document.querySelector("#btn14inch");



/* LISTENERS */
startButton.addEventListener("click", revealModal("size"));
twelveInchButton.addEventListener("click", revealModal);
fourteenInchButton.addEventListener("click", revealModal);


/* PIZZA TEMPORARY VARIABLES */
let crust;
let size;
let toppings;
let extraOptions;
var pizza;

/* PIZZA BUILDER */
function pizzaObject(crust, size, toppings, extraOptions) {
   this.crust = crust;
   this.size = size;
   this.toppings = toppings;
   this.extraOptions = extraOptions;
}

/* FUNCTIONS */

function revealModal(modal) {
    switch (modal) {
        case "size": 
        sizeModal.classList.remove("inactive")
        pizza = new pizzaObject()
        console.log('Loaded Size modal');
        case "crust": crustModal.classList.remove("inactive"); console.log('Loaded Crust modal');
        case "options": optionsModal.classList.remove("inactive");
        default: console.log("No value sent! No action taken");
    }
    console.log('Loaded Crust modal');
}

/* DEFAULT STATES */