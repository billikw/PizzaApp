"use strict";

/* SELECTORS */
//Modals:
let welcomeText = document.querySelector("#welcomeText");
let sizeModal = document.querySelector("#size");
let crustModal = document.querySelector("#crust");
let toppingsModal = document.querySelector("#toppings");
let optionsModal = document.querySelector("#options");
//Buttons:
let startButton = document.querySelector("#btnStart");
let twelveInchButton = document.querySelector("#btn12inch");
let fourteenInchButton = document.querySelector("#btn14inch");
let thinButton = document.querySelector("#btnThin");
let thickButton = document.querySelector("#btnThick");


/* LISTENERS */
startButton.addEventListener("click", revealModal("size"));
twelveInchButton.addEventListener("click", revealModal("crust",null,12));
fourteenInchButton.addEventListener("click", revealModal("crust",null,14));
thinButton.addEventListener("click", revealModal("toppings","thin"));
thickButton.addEventListener("click", revealModal("toppings","thick"));


/* PIZZA GLOBAL */
var pizza;

/* PIZZA BUILDER */
function pizzaObject(crust, size, toppings, extraOptions) {
   this.crust = crust;
   this.size = size;
   this.toppings = toppings;
   this.extraOptions = extraOptions;
}

/* FUNCTIONS */

function revealModal(modal, pizzaThickness, pizzaSize, pizzaToppings, pizzaOptions) {

    switch (modal) {

        case "size":
            sizeModal.classList.remove("inactive");
            pizza = new pizzaObject();
            console.log('Loading Size modal');
            console.log(pizza);
            break;

        case "crust":
            //Set size:
            pizzaSize === 12 ? pizza.size = 12 : pizza.size = 14;
            //Hide the size modal:
            sizeModal.classList.add("inactive");
            //Display the crust modal:
            crustModal.classList.remove("inactive");
            console.log('Loading Crust modal');
            break;

        case "toppings":
            //Set base style:
            pizzaThickness === "thin" ? pizza.crust = "thin" : pizza.crust = "thick";
            //Hide the crust modal:
            crustModal.classList.add("inactive");
            //Display the toppings modal:
            toppingsModal.classList.remove("inactive");
            break;

        case "options":
            optionsModal.classList.remove("inactive");
            toppingsModal.classList.add("#inactive");
            console.log('Loading Options modal');
            break;

        default: console.log("No value sent! No action taken"); pizza = undefined; console.log(pizza);
    }
}

/* DEFAULT STATES */