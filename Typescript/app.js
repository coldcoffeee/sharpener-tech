"use strict";
const num1Element = document.getElementById("a");
//getElemById returns HTML element which is not guaranteed to have a .value attribute,
//if we as developers are sure that the elem we get is an input element and has a value,
//we can type infer using as keyword
const num2Element = document.getElementById("b");
const buttonElement = document.querySelector("button"); //we could add ! at end too
// function addNums(num1: number, num2: number) {
function addNums(num1, num2) {
    //union types: either number or string
    //   return num1 + num2;
    //type guard
    if (typeof num1 === "string" && typeof num2 === "string")
        return num1 + "" + num2;
    else
        return +num1 + +num2;
}
//error because optional chaining ? is used on rhs to return null if element doesn't exist by short circuiting to null, on LHS it is meaningless
//buttonElement?.onclick = () => {};
//two ways to resolve this
// if(buttonElement)
// buttonElement.onclick = () => {};
//better way: use non null assertion operator ! to tell TS that the value will never be null
buttonElement.onclick = () => {
    const num1 = num1Element === null || num1Element === void 0 ? void 0 : num1Element.value; // this would give error if we didn't type infer to HTMLInputElement above
    const num2 = num2Element === null || num2Element === void 0 ? void 0 : num2Element.value;
    //const result = addNums(num1, num2); //this gives error as .value returns a string so we typecast it to number
    const result = addNums(+num1, +num2);
    const numArray = [];
    const anotherNumArray = [];
    numArray.push(result);
    console.log(result);
};
function printVal(obj) {
    //explicitly define object's attributes
    console.log(obj.val);
}
const myProm = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Works!"), 1000);
});
myProm.then((res) => console.log(res));
