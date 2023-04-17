const nameField = document.getElementById("name");
const descriptionField = document.getElementById("description");
const priceField = document.getElementById("price");
const quantityField = document.getElementById("quantity");

const table = document.querySelector("table");

const URL =
  "https://crudcrud.com/api/5b38c4a6134d410b8f79a242fda2e280/inventory/";

function generateRow({ name, description, price, quantity, id }) {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.setAttribute("scope", "col");
  if (table.lastElementChild.children.length > 0)
    th.textContent =
      parseInt(
        table.lastElementChild.lastElementChild.firstElementChild.textContent
      ) + 1;
  else th.textContent = 1;
  tr.appendChild(th);

  const tdItem = document.createElement("td");
  tdItem.textContent = name;
  tr.appendChild(tdItem);

  const tdDescription = document.createElement("td");
  tdDescription.textContent = description;
  tr.appendChild(tdDescription);

  const tdPrice = document.createElement("td");
  tdPrice.textContent = price;
  tr.appendChild(tdPrice);

  const tdQuantity = document.createElement("td");
  tdQuantity.textContent = quantity;
  tr.appendChild(tdQuantity);

  const tdBtn1 = document.createElement("td");
  const btn1 = document.createElement("button");
  btn1.setAttribute("class", "btn btn-success");
  btn1.textContent = "Buy 1";
  btn1.id = "1";
  tdBtn1.appendChild(btn1);
  tr.appendChild(tdBtn1);

  const tdBtn2 = document.createElement("td");
  const btn2 = document.createElement("button");
  btn2.setAttribute("class", "btn btn-success");
  btn2.textContent = "Buy 2";
  btn2.id = "2";
  tdBtn2.appendChild(btn2);
  tr.appendChild(tdBtn2);

  const tdBtn3 = document.createElement("td");
  const btn3 = document.createElement("button");
  btn3.setAttribute("class", "btn btn-success");
  btn3.textContent = "Buy 3";
  btn3.id = "3";
  tdBtn3.appendChild(btn3);
  tr.appendChild(tdBtn3);

  const tdId = document.createElement("td");
  tdId.textContent = id;
  tdId.hidden = true;
  tr.appendChild(tdId);

  return tr;
}

document.getElementById("add").addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const entry = {
      name: nameField.value,
      description: descriptionField.value,
      price: priceField.value,
      quantity: quantityField.value,
    };

    const response = await axios.post(URL, entry);

    entry.id = response.data._id;

    table.children[1].appendChild(generateRow(entry));
    addListeners();
    nameField.value = "";
    descriptionField.value = "";
    priceField.value = "";
    quantityField.value = "";
  } catch (err) {
    console.log("Error while adding: " + err);
  }
});

function addListeners() {
  document.querySelectorAll("tr").forEach((tr) => {
    tr.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        if (event.target.classList.contains("btn")) {
          const amt = event.target.id;
          const row = event.target.parentNode.parentNode;
          const quantityCell = row.children[4];
          quantityCell.textContent -= amt;
          const id = row.children[8].textContent;
          const entry = {
            name: row.children[1].textContent,
            description: row.children[2].textContent,
            description: row.children[2].textContent,
            price: row.children[3].textContent,
            quantity: row.children[4].textContent,
          };
          if (quantityCell.textContent > 0) {
            const response = await axios.put(URL + id, entry);
          } else {
            const response = await axios.delete(URL + id);
            row.remove();
            serialize();
          }

          console.log(entry);
          console.log(id);
        }
      } catch (err) {
        console.log("Error while buying: " + err);
      }
    });
  });
}

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function serialize() {
  let count = 1;
  console.log("here");
  Array.from(table.children[1].children).forEach((row) => {
    row.children[0].textContent = count++;
  });
}

window.onload = async () => {
  const response = await axios.get(URL);
  response.data.forEach((record) => {
    record.id = record._id;
    console.log(record);
    table.children[1].appendChild(generateRow(record));
  });
  addListeners();
};
