const date = new Date();
document.getElementById("date").valueAsDate = date;

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
  console.log(localStorage.getItem(details.phone));
};
window.onload = () => {
  for (let i = 0; i < localStorage.length; i++) {
    table.appendChild(
      generateRow(JSON.parse(localStorage.getItem(localStorage.key(i))))
    );
  }
};
