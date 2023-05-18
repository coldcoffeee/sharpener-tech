const tbody = document.querySelector("tbody");
const descriptionField = document.getElementById("description");
const categoryField = document.getElementById("category");
const amountField = document.getElementById("amount");

function appendExpense({ id, amount, description, category }) {
  const tr = document.createElement("tr");

  const tdId = document.createElement("td");
  tdId.setAttribute("class", "d-none");
  tdId.textContent = id;
  tr.appendChild(tdId);

  const tdCategory = document.createElement("td");
  tdCategory.setAttribute("class", "w-25");
  tdCategory.textContent = category;
  tr.appendChild(tdCategory);

  const tdDescription = document.createElement("td");
  tdDescription.setAttribute("class", "w-25");
  tdDescription.textContent = description;
  tr.appendChild(tdDescription);

  const tdAmount = document.createElement("td");
  tdAmount.setAttribute("class", "w-25");
  tdAmount.textContent = amount;
  tr.appendChild(tdAmount);

  const tdBtn = document.createElement("td");
  tdBtn.setAttribute("class", "w-25");
  tr.appendChild(tdBtn);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-light");
  btnDelete.textContent = "Delete";
  btnDelete.onclick = deleteExpense;
  tdBtn.appendChild(btnDelete);

  //   const btnEdit = document.createElement("button");
  //   btnEdit.setAttribute("class", "btn btn-primary mx-3");
  //   btnEdit.textContent = "Edit";
  //   btnEdit.onclick = edit;
  //   li.appendChild(btnEdit);

  //   const idDiv = document.createElement("div");
  //   idDiv.textContent = id;
  //   idDiv.classList.add("d-none");
  // li.appendChild(idDiv);
  tbody.appendChild(tr);
}

async function deleteExpense() {
  try {
    const id = this.parentElement.parentElement.firstElementChild.textContent;
    const res = await axios.delete("http://localhost:8080/expense/" + id);
    console.log(res);
    if (res.status === 201) {
      this.parentElement.parentElement.remove();
      window.alert(res.data.message);
    } else throw new Error(req.data.message);
  } catch (err) {
    window.alert(err);
  }
}

window.onload = async () => {
  try {
    const {
      data: { entries },
    } = await axios.get("http://localhost:8080/expense/all");
    for (const obj of entries) appendExpense(obj);
  } catch (err) {
    console.log(err);
    window.alert(err);
  }
};

async function postExpense() {
  const expense = {
    amount: amountField.value,
    description: descriptionField.value,
    category: categoryField.value,
  };
  try {
    const res = await axios.post("http://localhost:8080/expense", expense);
    if (res.status === 201) {
      expense.id = res.data.id;
      appendExpense(expense);
      descriptionField.value = "";
      categoryField.value = "";
      amountField.value = "";
      window.alert(res.data.message);
    } else throw new Error("res.data.message");
  } catch (err) {
    window.alert(err);
  }
}

// function edit() {
//   console.log(this.parentElement.children);
//   const [price_, description_, category_] =
//     this.parentElement.children[0].textContent.split(" ");
//   const id = this.parentElement.children[3].textContent;
//   amountField.value = price_;
//   descriptionField.value = description_;
//   categoryField.value = category_;
//   const addBtn = document.getElementById("add");
//   const editBtn = document.getElementById("edit");

//   addBtn.disabled = true;
//   editBtn.disabled = false;

//   editBtn.onclick = async () => {
//     const newExpense = {
//       id: id,
//       price: priceField.value,
//       description: descriptionField.value,
//       category: categoryField.value,
//     };

//     try {
//       const res = await axios.put("http://localhost:8080/", newExpense);
//       if (res.status === 201) {
//         this.parentElement.children[0].textContent =
//           priceField.value +
//           " " +
//           descriptionField.value +
//           " " +
//           categoryField.value;
//         window.alert(res.data.message);
//       } else throw new Error(res.data.message);
//     } catch (err) {
//       window.alert(err);
//     }

//     priceField.value = "";
//     descriptionField.value = "";
//     categoryField.value = "";

//     editBtn.onclick = null;
//     editBtn.disabled = true;
//     addBtn.disabled = false;
//   };
// }
document.expenseForm.onsubmit = async (event) => {
  event.preventDefault();
  postExpense();
};
