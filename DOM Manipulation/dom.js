document.querySelectorAll(".list-group-item").forEach((element) => {
  element.style.fontWeight = "bold";
});

document.querySelectorAll(".list-group-item")[2].style.color = "green";

const li = document.getElementsByTagName("li");

li[1].style.backgroundColor = "green";

li[2].style.opacity = "0";

const items = document.querySelectorAll("li");

items.forEach((e) => {
  e.style.backgroundColor = "green";
});

items[1].style.color = "green";
