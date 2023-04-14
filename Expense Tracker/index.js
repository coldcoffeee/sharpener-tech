const listGroup = document.querySelector(".list-group");
const descriptionField = document.getElementById("description");
const categoryField = document.getElementById("category");
const priceField = document.getElementById("price");
let ID = localStorage.getItem("id");
if (!ID) {
  localStorage.setItem("id", 1);
  ID = 1;
}

let curr = -1;
let currItm = null;

function delExpense() {
  const id = this.parentNode.lastElementChild.textContent;
  localStorage.removeItem(id);
  this.parentNode.remove();
}

function editExpense() {
  const id = this.parentNode.lastElementChild.textContent;
  curr = id;
  currItm = this.parentNode.firstElementChild;
  const entries = this.parentNode.firstElementChild.textContent.split(" ");
  [priceField.value, descriptionField.value, categoryField.value] = entries;
  document.getElementById("edit").disabled = false;
  document.getElementById("add").disabled = true;
}

document.getElementById("edit").addEventListener("click", (e) => {
  e.preventDefault();
  edit();
});

function edit() {
  const expense = {
    id: parseInt(curr),
    price: priceField.value,
    description: descriptionField.value,
    category: categoryField.value,
  };
  localStorage.setItem(curr, JSON.stringify(expense));
  currItm.textContent =
    expense.price + " " + expense.description + " " + expense.category;
  curr = -1;
  currItm = null;
  this.disabled = true;
  priceField.value = "";
  descriptionField.value = "";
  categoryField.value = "";
  document.getElementById("add").disabled = false;
}

function generateExpense({ id, price, description, category }) {
  const newEntry = document.createElement("li");
  newEntry.classList.add("list-group-item");

  const text = document.createElement("div");
  text.classList.add("text-left", "mb-3");
  text.textContent = price + " " + description + " " + category;

  const delBtn = document.createElement("button");
  delBtn.classList.add("btn", "btn-danger", "mx-2");
  delBtn.textContent = "Delete";
  delBtn.onclick = delExpense;

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-primary");
  editBtn.textContent = "Edit";
  editBtn.onclick = editExpense;

  const idTxt = document.createElement("div");
  idTxt.classList.add("d-none");
  idTxt.textContent = id;

  newEntry.appendChild(text);
  newEntry.appendChild(editBtn);
  newEntry.appendChild(delBtn);
  newEntry.appendChild(idTxt);

  return newEntry;
}

document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault();
  const expense = {
    id: ID++,
    price: priceField.value,
    description: descriptionField.value,
    category: categoryField.value,
  };
  listGroup.appendChild(generateExpense(expense));
  localStorage.setItem(expense.id, JSON.stringify(expense));
  localStorage.setItem("id", ID);
  priceField.value = "";
  descriptionField.value = "";
  categoryField.value = "";
});

window.onload = () => {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === "id") continue;
    listGroup.appendChild(
      generateExpense(JSON.parse(localStorage.getItem(localStorage.key(i))))
    );
  }
};
