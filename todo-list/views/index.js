const pendingList = document.querySelector(".list-pending");
const completedList = document.querySelector(".list-completed");

const nameField = document.getElementById("name");
const descriptionField = document.getElementById("description");

const liClassList =
  "list-group-item list-group-item-action list-group-item-dark d-flex justify-content-between align-items-baseline";

function addPending({ id, name, description }) {
  const li = document.createElement("li");
  //   li.classList.add(liClassList);
  li.setAttribute("class", liClassList);

  const divTask = document.createElement("div");
  divTask.textContent = name + " " + description;
  divTask.classList.add("w-50");
  li.appendChild(divTask);

  const divId = document.createElement("div");
  divId.classList.add("d-none");
  divId.textContent = id;
  li.appendChild(divId);

  const btnComplete = document.createElement("button");
  btnComplete.setAttribute("class", "btn btn-success");
  btnComplete.textContent = "Mark as complete";
  btnComplete.onclick = completeTask;
  li.appendChild(btnComplete);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-danger");
  btnDelete.textContent = "Delete";
  btnDelete.onclick = deleteTask;
  li.appendChild(btnDelete);

  pendingList.appendChild(li);
}

function addCompleted({ id, name, description }) {
  const li = document.createElement("li");
  //   li.setAttribute("class", liClassList);
  li.setAttribute("class", liClassList);

  const divTask = document.createElement("div");
  divTask.classList.add("w-50");
  divTask.textContent = name + " " + description;
  li.appendChild(divTask);

  const divId = document.createElement("div");
  divId.classList.add("d-none");
  divId.textContent = id;
  li.appendChild(divId);

  //   const btnDummy = document.createElement("button");
  //   btnDummy.setAttribute("class", "btn opacity-0");
  //   btnDummy.textContent = "O";
  //   li.appendChild(btnDummy);

  completedList.appendChild(li);
}

async function addTask() {
  const task = {
    name: nameField.value,
    description: descriptionField.value,
  };
  try {
    const res = await axios.post(`http://localhost:8080/`, task);
    if (res.status === 201) {
      task.id = res.data.id;
      addPending(task);
      window.alert(res.data.message);
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    window.alert(err);
  }
  nameField.value = "";
  descriptionField.value = "";
}

async function deleteTask() {
  const li = this.parentElement;
  const id = li.children[1].textContent;
  try {
    const res = await axios.delete(`http://localhost:8080/${id}`);
    if (res.status === 201) {
      li.remove();
      window.alert(res.data.message);
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    window.alert(err);
  }
}

async function completeTask() {
  const li = this.parentElement;
  const id = li.children[1].textContent;
  try {
    const res = await axios.put(`http://localhost:8080/`, { id });
    if (res.status === 201) {
      const task = {
        id,
        name: li.children[0].textContent.split(" ")[0],
        description: li.children[0].textContent.split(" ")[1],
      };
      li.remove();
      addCompleted(task);
      window.alert(res.data.message);
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    window.alert(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(`http://localhost:8080/`);
    if (res.status === 201) {
      for (const entry of res.data.entries) {
        if (entry.completed) addCompleted(entry);
        else addPending(entry);
      }
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.log(err);
  }
});
