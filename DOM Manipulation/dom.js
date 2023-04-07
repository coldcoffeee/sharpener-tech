document.querySelectorAll(".list-group-item").forEach((element) => {
  element.style.fontWeight = "bold";
});

document.querySelectorAll(".list-group-item")[2].style.color = "green";

const li = document.getElementsByTagName("li");

const item5 = document.createElement("li");
item5.textContent = "Item 5";

li[0].parentNode.insertBefore(item5, li[3].nextSibling);

console.log(li);
