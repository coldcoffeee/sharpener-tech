const URL = "https://crudcrud.com/api/bc55c7a946514261b1689c6e054b382f/demo/";

const records = [];
const fields = ["id", "name", "email", "phone", "date", "time"];
const nameField = document.getElementById("name");
const mailField = document.getElementById("mail");
const phoneField = document.getElementById("phone");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");

const table = document.querySelector("table");

/*-UPON LOADING-*/

window.onload = async () => {
  const res = await axios.get(URL);
  for (const record of res.data) table.appendChild(generateRow(record));
};

/* ------------ */

function generateRow({ _id: id, name, mail, phone, date, time }) {
  const row = document.createElement("tr");

  const idCell = document.createElement("td");
  idCell.style.display = "none";
  idCell.textContent = id;
  row.appendChild(idCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const mailCell = document.createElement("td");
  mailCell.textContent = mail;
  row.appendChild(mailCell);

  const phoneCell = document.createElement("td");
  phoneCell.textContent = phone;
  row.appendChild(phoneCell);

  const timingCell = document.createElement("td");
  timingCell.textContent = date + " @ " + time + ":00";
  row.appendChild(timingCell);

  const btnCell = document.createElement("td");

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-del");
  btnDelete.textContent = "X";
  btnDelete.onclick = delRow;
  btnCell.appendChild(btnDelete);
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.textContent = "Edit";
  btnEdit.onclick = edit;
  btnCell.appendChild(btnEdit);

  row.appendChild(btnCell);

  return row;
}

function register() {
  const record = {
    name: nameField.value,
    mail: mailField.value,
    phone: phoneField.value,
    date: dateField.value,
    time: timeField.value,
  };
  postData(record)
    .then((res) => {
      record.id = res.data._id;
    })
    .catch((err) => console.log(err));
  nameField.value = "";
  mailField.value = "";
  phoneField.value = "";
  dateField.value = "";
  timeField.value = "";
}

async function postData(record) {
  try {
    const response = await axios.post(URL, record);
    console.log(response);
    record.id = response.data._id;
    table.appendChild(generateRow(record));
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function delRow() {
  try {
    const row = this.parentNode.parentNode;
    const response = await axios.delete(
      URL + row.firstElementChild.textContent
    );
    row.remove();
  } catch (err) {
    console.log("Error\n\n\n" + err);
  }
}

function edit() {
  try {
    document.getElementById("register").disabled = true;
    document.getElementById("update").disabled = false;

    const children = this.parentNode.parentNode.childNodes;
    const id = this.parentNode.parentNode.firstElementChild.textContent;
    nameField.value = children[1].textContent;
    mailField.value = children[2].textContent;
    phoneField.value = children[3].textContent;
    dateField.value = children[4].textContent.split(" ")[0];
    timeField.value = children[4].textContent.split(" ")[2].split(":")[0];

    async function update() {
      try {
        const record = {
          name: nameField.value,
          mail: mailField.value,
          phone: phoneField.value,
          date: dateField.value,
          time: timeField.value,
        };
        const response = await axios.put(URL + id, record);
        children[0].textContent = record._id;
        children[1].textContent = record.name;
        children[2].textContent = record.mail;
        children[3].textContent = record.phone;
        children[4].textContent = record.date + " @ " + record.time + ":00";
        nameField.value = "";
        mailField.value = "";
        phoneField.value = "";
        dateField.value = "";
        timeField.value = "";
        document.getElementById("register").disabled = false;
        document.getElementById("update").disabled = true;
      } catch (err) {
        console.log("Error\n\n\n" + err);
      }
    }
    document.getElementById("update").onclick = update;
    // document.getElementById("update").removeEventListener("click", () => {});
  } catch (err) {
    console.log("Error\n\n\n" + err);
  }
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
