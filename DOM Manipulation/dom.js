/**
 * 
parentElement
lastelementchild
lastchild
createchild
firstelementchild
firstchild
nextsibling
nextelementsibling
previoussibling
previouselementsibling
createelement
setAttribute
createtesxtnode
appendchild
 */

const container = document.getElementById("main");

container.parentElement.style.backgroundColor = "green";

// console.log(container.lastElementChild);
container.lastElementChild.style.fontWeight = "bold";

const listGroup = document.querySelector(".list-group");

console.log(listGroup.lastChild);

listGroup.firstElementChild.style.backgroundColor = "yellow";

console.log(listGroup.firstChild);

const listItems = document.querySelectorAll("li");

const item2 = listItems[1];

item2.nextElementSibling.textContent = "Changed third item";

item2.nextSibling.textContent = "whitespace sibling";

item2.previousElementSibling.textContent = "Changed first item";

item2.previousSibling.textContent = "whitespace sibling prev";

const newLi = document.createElement("li");
newLi.textContent = "newly added item";
newLi.setAttribute("style", "color: blue");

listGroup.appendChild(newLi);

document.getElementById("header-title").previousSibling.textContent = "HEllo";

listItems[0].previousSibling.textContent = "HEllo";
//
