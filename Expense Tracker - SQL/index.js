const listGroup = document.querySelector(".list-group");
const descriptionField = document.getElementById("description");
const categoryField = document.getElementById("category");
const priceField = document.getElementById("price");

function appendExpense({ id, price, description, category }) {
  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item");

  const div = document.createElement("div");
  div.setAttribute("class", "text-left mb-3");
  div.textContent = price + " " + description + " " + category;
  li.appendChild(div);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-danger");
  btnDelete.textContent = "Delete";
  btnDelete.onclick = deleteExpense;
  li.appendChild(btnDelete);

  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("class", "btn btn-primary mx-3");
  btnEdit.textContent = "Edit";
  btnEdit.onclick = edit;
  li.appendChild(btnEdit);

  const idDiv = document.createElement("div");
  idDiv.textContent = id;
  idDiv.classList.add("d-none");
  li.appendChild(idDiv);

  listGroup.appendChild(li);
}

async function deleteExpense() {
  try {
    const id = this.parentElement.lastElementChild.textContent;
    const res = await axios.delete("http://localhost:8080/" + id);
    console.log(res);
    if (res.status === 201) {
      this.parentElement.remove();
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
    } = await axios.get("http://localhost:8080/");
    for (const obj of entries) appendExpense(obj);
  } catch (err) {}
};

async function postExpense() {
  const expense = {
    price: priceField.value,
    description: descriptionField.value,
    category: categoryField.value,
  };
  try {
    const res = await axios.post("http://localhost:8080/", expense);
    if (res.status === 201) {
      expense.id = res.data.id;
      appendExpense(expense);
      descriptionField.value = "";
      categoryField.value = "";
      priceField.value = "";
      window.alert(res.data.message);
    } else throw new Error("res.data.message");
  } catch (err) {
    window.alert(err);
  }
}

function edit() {
  console.log(this.parentElement.children);
  const [price_, description_, category_] =
    this.parentElement.children[0].textContent.split(" ");
  const id = this.parentElement.children[3].textContent;
  priceField.value = price_;
  descriptionField.value = description_;
  categoryField.value = category_;
  const addBtn = document.getElementById("add");
  const editBtn = document.getElementById("edit");

  addBtn.disabled = true;
  editBtn.disabled = false;

  editBtn.onclick = async () => {
    const newExpense = {
      id: id,
      price: priceField.value,
      description: descriptionField.value,
      category: categoryField.value,
    };

    try {
      const res = await axios.put("http://localhost:8080/", newExpense);
      if (res.status === 201) {
        this.parentElement.children[0].textContent =
          priceField.value +
          " " +
          descriptionField.value +
          " " +
          categoryField.value;
        window.alert(res.data.message);
      } else throw new Error(res.data.message);
    } catch (err) {
      window.alert(err);
    }

    priceField.value = "";
    descriptionField.value = "";
    categoryField.value = "";

    editBtn.onclick = null;
    editBtn.disabled = true;
    addBtn.disabled = false;
  };
}
