const nameField = document.getElementById("name");
const mailField = document.getElementById("mail");
const phoneField = document.getElementById("phone");

async function deleteRow() {
  const tr = this.parentElement.parentElement;
  try {
    const res = await axios.delete("http://localhost:8080/user/", {
      data: {
        mail: tr.children[1].textContent,
      },
    });
    if (res.status === 201) {
      tr.remove();
      window.alert("Successfully deleted!");
    } else throw new Error(response);
  } catch (err) {
    window.alert(err.response.data.msg);
    console.log(err.response.data.msg);
  }
}

function addRow({ name, mail, phone }) {
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  tdName.textContent = name;
  const tdMail = document.createElement("td");
  tdMail.textContent = mail;
  const tdPhone = document.createElement("td");
  tdPhone.textContent = phone;

  const tdButtons = document.createElement("td");

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-danger");
  btnDelete.textContent = "Delete";
  btnDelete.onclick = deleteRow;
  tdButtons.appendChild(btnDelete);

  tr.appendChild(tdName);
  tr.appendChild(tdMail);
  tr.appendChild(tdPhone);
  tr.appendChild(tdButtons);

  document.querySelector("tbody").appendChild(tr);
}

document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();
  const details = {
    name: nameField.value,
    mail: mailField.value,
    phone: phoneField.value,
  };
  try {
    const response = await axios.post("http://localhost:8080/user/", details);
    if (response.status === 201) {
      addRow(details);
      window.alert("Appointment added!");
    } else throw new Error(response);
  } catch (err) {
    window.alert(err.response.data.msg);
    console.log(err.response.data.msg);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:8080/user/");
    if (res.status === 201) {
      for (const entry of res.data.entries) {
        entry.mail = entry.email;
        addRow(entry);
      }
    }
  } catch (err) {
    window.alert(err.response.data.msg);
    console.log(err.response.data.msg);
  }
});
