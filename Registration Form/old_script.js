const date = new Date();
document.getElementById("date").valueAsDate = date;
let rowToBeDel = null,
  keyToBeDel = -1;
const table = document.querySelector("table");

const generateRow = function ({ name, mail, phone, date, time }) {
  const newRow = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = name;
  newRow.appendChild(tdName);

  const tdMail = document.createElement("td");
  tdMail.textContent = mail;
  newRow.appendChild(tdMail);

  const tdPhone = document.createElement("td");
  tdPhone.textContent = phone;
  newRow.appendChild(tdPhone);

  const tdTiming = document.createElement("td");

  tdTiming.textContent = date + " @ " + time;
  newRow.appendChild(tdTiming);

  const tdButton = document.createElement("td");
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-del");
  btnDelete.onclick = delRow;
  btnDelete.textContent = "X";
  tdButton.appendChild(btnDelete);
  newRow.appendChild(tdButton);

  const tdEdit = document.createElement("td");
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.onclick = edit;
  btnEdit.textContent = "Edit";
  tdButton.appendChild(btnEdit);

  newRow.appendChild(tdButton);
  return newRow;
};

function delRow() {
  localStorage.removeItem(
    parseInt(this.parentElement.parentElement.children[2].textContent)
  );
  this.parentElement.parentElement.remove();
}

const logData = function () {
  const details = {
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    phone: document.getElementById("phone").value,
    date: document
      .getElementById("date")
      .valueAsDate.toISOString()
      .split("T")[0],
    time: document.getElementById("time").value,
  };

  localStorage.setItem(details.phone, JSON.stringify(details));
  table.appendChild(generateRow(details));
};
window.onload = () => {
  for (let i = 0; i < localStorage.length; i++) {
    table.appendChild(
      generateRow(JSON.parse(localStorage.getItem(localStorage.key(i))))
    );
  }
};

function edit() {
  const row = this.parentElement.parentElement;
  const name = row.children[0].textContent;
  const mail = row.children[1].textContent;
  const phone = parseInt(row.children[2].textContent);
  const date = row.children[3].textContent;
  const time = row.children[4].textContent;

  document.getElementById("date").value = date.split(" ")[0];
  document.getElementById("name").value = name;
  document.getElementById("mail").value = mail;
  document.getElementById("phone").value = phone;
  document.getElementById("time").value = date.split(" ")[2];

  document.getElementById("update").disabled = false;

  keyToBeDel = phone;
  rowToBeDel = row;
}

function update() {
  console.log(rowToBeDel);
  rowToBeDel.remove();
  localStorage.removeItem(keyToBeDel);
  const details = {
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    phone: document.getElementById("phone").value,
    date: document
      .getElementById("date")
      .valueAsDate.toISOString()
      .split("T")[0],
    time: document.getElementById("time").value,
  };

  localStorage.setItem(details.phone, JSON.stringify(details));
  table.appendChild(generateRow(details));
  rowToBeDel = null;
  keyToBeDel = -1;
  document.getElementById("update").disabled = true;
  document.getElementById("name").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "9";
}
