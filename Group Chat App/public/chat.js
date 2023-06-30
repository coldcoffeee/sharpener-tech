const host = window.location.protocol + "//" + window.location.host;

/*****************************FRONTEND******************************/

const showGroupsButton = document.getElementById("showGroups");
const showUsersButton = document.getElementById("showUsers");
const groupsDiv = document.getElementById("groups");
const usersDiv = document.getElementById("users");
const chatBox = document.getElementById("chatBox");

let USER_TOGGLE = true;
let GROUP_TOGGLE = true;
let GROUP_ID = 0;
// let lastMessageId = null;

// onload = async () => {
//   try {
//     const res = await axios.get(host + "/chat/groups");
//     const { messages } = res.data;
//     const storedMessages = {};
//     for (const messageObj of messages) {
//       if (storedMessages[messageObj.groupId]) {
//         storedMessages[messageObj.groupId].push(messageObj.message);
//       } else {
//         storedMessages[messageObj.groupId] = [messageObj.message];
//       }
//       localStorage.setItem(messageObj.groupId, messageObj.id);
//     }
//     // console.log(storedMessages);
//     localStorage.setItem("storedMessages", JSON.stringify(storedMessages));
//     // console.log(localStorage.getItem("storedMessages"));
//   } catch (err) {
//     console.error(err);
//   }
// };

onload = () => {
  loadGroup(null, GROUP_ID);
};

showGroupsButton.addEventListener("click", () => {
  groupsDiv.classList.toggle("hidden");
  groupsDiv.classList.toggle("w-3/12");
  groupsDiv.classList.toggle("lg:w-3/12");
  groupsDiv.classList.toggle("md:w-1/2");
  groupsDiv.classList.toggle("sm:w-full");

  usersDiv.classList.add("hidden");
  usersDiv.classList.remove("w-3/12");
  usersDiv.classList.remove("lg:w-3/12");
  usersDiv.classList.remove("md:w-1/2");
  usersDiv.classList.remove("sm:w-full");

  if (GROUP_TOGGLE) {
    USER_TOGGLE = true;
    appendGroups();
    GROUP_TOGGLE = false;
  } else GROUP_TOGGLE = true;
});

showUsersButton.addEventListener("click", () => {
  usersDiv.classList.toggle("hidden");
  usersDiv.classList.toggle("w-3/12");
  usersDiv.classList.toggle("lg:w-3/12");
  usersDiv.classList.toggle("md:w-1/2");
  usersDiv.classList.toggle("sm:w-full");

  groupsDiv.classList.add("hidden");
  groupsDiv.classList.remove("w-3/12");
  groupsDiv.classList.remove("lg:w-3/12");
  groupsDiv.classList.remove("md:w-1/2");
  groupsDiv.classList.remove("sm:w-full");

  if (USER_TOGGLE) {
    appendActiveUsers();
    GROUP_TOGGLE = true;
    USER_TOGGLE = false;
  } else USER_TOGGLE = true;
});

async function appendActiveUsers() {
  try {
    if (GROUP_ID === 0) {
      usersDiv.innerHTML = `
      <div class="bg-gray-950 rounded flex p-4 items-center mb-3">
        <span class="title-font font-medium text-white w-full text-center">
          Please select a group to see participants!
        </span>
      </div>`;
      return;
    }
    const response = await axios.get(host + "/chat/activeUsers", {
      headers: {
        groupId: GROUP_ID,
      },
    });
    const activeUsers = response.data.users;
    const admins = response.data.admins;

    const adminIds = admins.map((admin) => admin.id);

    usersDiv.innerHTML = `
    <div class="bg-gray-950 rounded flex p-4 items-center mb-3">
      <span class="title-font font-medium text-white w-full text-center">
        Users
      </span>
    </div>`;
    for (const user of activeUsers) {
      usersDiv.innerHTML += `<div class="bg-gray-800 rounded flex p-4 items-baseline mb-3">
      <span class="title-font font-medium text-white w-full text-center">
      <p>${user.name}</p>
      <p class="text-xs w-full text-center font-small text-gray-600">${
        adminIds.includes(user.id) ? "Admin" : ""
      }</p>
      </span>
      <span class="text-xs w-full text-center">
      ${user.email}
      </span>
      </div>`;
    }
  } catch (err) {
    console.log(err);
  }
}

async function appendGroups() {
  try {
    const res = await axios.get(host + "/group/all");

    const { userGroups: groups } = res.data;

    groupsDiv.innerHTML = `
    <div class="bg-gray-950 rounded flex p-4 items-center mb-3">
            <button
              class="text-white h-full bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full text-center"
              onclick="createNewGroup()"
            >
              New Group
            </button>
          </div>
    `;

    for (const group of groups) {
      groupsDiv.innerHTML += `
      <div class="hover:cursor-pointer focus:outline-none hover:bg-gray-600 bg-gray-800 rounded flex p-4 items-center mb-3" onclick="loadGroup(this, ${group.id})">
          <span class="title-font font-medium text-white w-full text-center">
            ${group.name}
          </span>
      </div>
      `;
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadGroup(element, groupId) {
  if (groupId === 0) {
    document.getElementById("groupName").textContent = "Chatster";
    chatBox.textContent =
      "Please select a group or create one to begin chatting!";
    document.getElementById("ipHandler").style.display = "none";
  } else {
    document.getElementById("groupName").textContent =
      element.lastElementChild.textContent;
    chatBox.textContent = "";
    document.getElementById("ipHandler").style.display = "";
    await loadGroupchat(groupId);
    chatBox.scrollTop = chatBox.scrollHeight;

    GROUP_ID = groupId;
    await appendAdminTools();
    showGroupsButton.click();
  }
}

function showMessage(message, name, createdAt) {
  chatBox.innerHTML += `
  <div class="bg-gray-800 rounded text-start p-4 my-3 mx-3">
  <span class="text-white">${name}:&nbsp</span>${message}
  <p class="text-xs text-gray-400 mt-1">${createdAt}</p>
</div>
  `;
}

/*****************************BACKEND******************************/

async function fetchMessages(groupId) {
  try {
    if (groupId <= 0) return null;

    let storedMessages = JSON.parse(localStorage.getItem("storedMessages"));

    let lastMessageId = localStorage.getItem(groupId);

    if (!lastMessageId) lastMessageId = 0;

    const res = await axios.get(host + "/chat/all", {
      headers: {
        groupId,
        lastMessageId,
      },
    });

    const { messages } = res.data;

    if (messages.length > 0)
      localStorage.setItem(groupId, messages[messages.length - 1].id);
    else return;

    if (!storedMessages) storedMessages = { groupId: [] };
    if (!storedMessages[groupId]) storedMessages[groupId] = [];
    for (const message of messages) {
      const dateTime = message.createdAt.split("T");
      console.log(dateTime);
      storedMessages[groupId].push([
        message["user.name"],
        message.message,
        `${getLocalTime(dateTime[1].split(".")[0])}  ${dateTime[0]}`,
      ]);
      console.log(storedMessages[groupId]);
      showMessage(
        message.message,
        message["user.name"],
        storedMessages[groupId][storedMessages[groupId].length - 1][2]
      );
    }
    await localStorage.setItem(
      "storedMessages",
      JSON.stringify(storedMessages)
    );
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.error(err);
  }
}

function getLocalTime(gmtTimeString) {
  const gmtTime = new Date(`1970-01-01T${gmtTimeString}Z`);
  return gmtTime.toLocaleTimeString();
}

async function sendMessage() {
  try {
    const message = document.getElementById("message").value;
    if (!message) return;

    const res = await axios.post(host + "/chat/saveMessage", {
      message,
      groupId: GROUP_ID,
    });

    document.getElementById("message").value = "";
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("send").onclick = sendMessage;

setInterval(async () => {
  await fetchMessages(GROUP_ID);
}, 1000);

async function loadGroupchat(groupId) {
  chatBox.innerHTML = "";
  const storedMessages = JSON.parse(localStorage.getItem("storedMessages"));
  if (!storedMessages || !storedMessages[groupId]) return;
  for (const message of storedMessages[groupId]) {
    showMessage(message[1], message[0], message[2]);
  }
}

document.getElementById("message").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// window.addEventListener("DOMContentLoaded", () => {
// });

document.getElementById("overlay").onclick = clearNewGroupForm;
document.getElementById("adminOverlay").onclick = clearUpdateGroupForm;
document.getElementById("closeForm").onclick = clearNewGroupForm;

function clearNewGroupForm() {
  const modal = document.getElementById("modal");
  const groupNameField = document.getElementById("group-name");
  const usersList = document.getElementById("usersList");

  usersList.innerHTML = "";
  groupNameField.value = "";

  // if (modal.classList.contains("z-10")) modal.classList.toggle("z-10");
  if (modal.classList.contains("-z-10")) return;

  modal.classList.toggle("z-10");
  modal.classList.toggle("-z-10");
}

async function createNewGroup() {
  try {
    // console.log("Here");
    const modal = document.getElementById("modal");
    modal.classList.toggle("-z-10");
    modal.classList.toggle("z-10");
    await appendAllUsers();
    document.getElementById("closeForm").focus();
  } catch (err) {
    console.error(err);
  }
}

async function submitNewGroupData() {
  const groupNameField = document.getElementById("group-name");
  try {
    const addCheckboxes = document.querySelectorAll('input[name^="user-add"]');
    const adminCheckboxes = document.querySelectorAll(
      'input[name^="user-admin"]'
    );

    if (addCheckboxes.length != adminCheckboxes.length)
      throw new Error("Don't mess with the code buddy!");

    // addCheckboxes.forEach(function (checkbox) {
    //   const checkboxName = checkbox.name;
    //   const isChecked = checkbox.checked;

    //   // Do something with the "Add" checkbox value
    //   if (isChecked) {
    //     console.log(`Add checkbox ${checkboxName} is selected`);
    //   } else {
    //     console.log(`Add checkbox ${checkboxName} is not selected`);
    //   }
    // });

    const groupName = groupNameField.value;

    if (groupName.length < 1 || groupName.length > 30) {
      groupNameField.value = "";
      groupNameField.classList.toggle("placeholder-red-600");
      groupNameField.setAttribute(
        "placeholder",
        "Enter a name 1 - 30 characters long."
      );
      setTimeout(() => {
        groupNameField.classList.toggle("placeholder-red-600");
        groupNameField.setAttribute("placeholder", "");
      }, 3000);
      throw new Error("Invalid group name!");
    }

    const participants = [];
    const admins = [];

    for (let i = 0; i < addCheckboxes.length; i++) {
      if (addCheckboxes[i].checked) {
        participants.push(addCheckboxes[i].value);
        if (adminCheckboxes[i].checked) admins.push(adminCheckboxes[i].value);
      }
    }

    const res = await axios.post(host + "/group/create", {
      groupName,
      participants,
      admins,
    });

    const groupId = res.data.id;
    clearNewGroupForm();
    showGroupsButton.click();
    GROUP_ID = groupId;
    loadGroup({ lastElementChild: { textContent: groupName } }, groupId);
  } catch (err) {
    groupNameField.value = "";
    groupNameField.classList.toggle("placeholder-red-600");
    groupNameField.setAttribute(
      "placeholder",
      "Something went wrong, please try again later."
    );
    setTimeout(() => {
      groupNameField.classList.toggle("placeholder-red-600");
      groupNameField.setAttribute("placeholder", "");
      clearNewGroupForm();
    }, 3000);
    console.error(err);
  }
}

async function appendAllUsers() {
  try {
    const usersList = document.getElementById("usersList");

    const res = await axios.get(host + "/group/allUsers");

    const { users } = res.data;
    usersList.innerHTML = "";

    for (const user of users) {
      usersList.innerHTML += `<div
      class="flex items-center justify-between py-2 px-3 bg-gray-700 rounded-md"
    >
      <div class="flex-grow">
        <p class="text-sm font-medium text-white">${user.name}</p>
        <p class="text-xs text-gray-500">
          ${user.email}
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <label for="user${user.id}-add" class="flex items-center">
          <input
            type="checkbox"
            id="user-add${user.id}"
            name="user-add${user.id}"
            class="form-checkbox"
            value="${user.id}"
            onchange="let admin = this.parentElement.nextElementSibling.firstElementChild; admin.disabled = !admin.disabled"
          />
          <span class="ml-2 text-sm text-gray-400">Add</span>
        </label>
        <label for="user-admin${user.id}" class="flex items-center">
          <input
            type="checkbox"
            id="user-admin${user.id}"
            name="user-admin${user.id}"
            value="${user.id}"
            class="form-checkbox"
            disabled
          />
          <span class="ml-2 text-sm text-gray-400">Admin</span>
        </label>
      </div>
    </div>`;
    }
  } catch (err) {
    console.error(err);
  }
}

document
  .getElementById("createGroup")
  .addEventListener("click", submitNewGroupData);

onkeyup = (e) => {
  if (e.key === "Escape") {
    clearNewGroupForm();
    clearUpdateGroupForm();
  }
  if (e.key === "Space") {
    clearNewGroupForm();
    clearUpdateGroupForm();
  }
  console.log(e.target);
};

document.getElementById("modal").addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitNewGroupData();
});

async function appendAdminTools(groupName) {
  try {
    const res = await axios.get(host + "/group/isAdmin", {
      headers: {
        groupId: GROUP_ID,
      },
    });
    if (res.data.isAdmin) {
      document.getElementById(
        "groupName"
      ).innerHTML = `<h1 class="title-font sm:text-3xl text-xl font-medium text-white mb-3 pb-3" id="groupName">
      ${document.getElementById("groupName").textContent}
      <button class="ml-2" onclick="showAdminTools(document.getElementById('groupName').textContent.trim())" id="editGroup">
        <ion-icon name="settings-sharp" class="align-middle text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"></ion-icon>
      </button>
    </h1>
      `;
    }
  } catch (err) {
    console.error(err);
  }
}

function clearUpdateGroupForm() {
  const modal = document.getElementById("adminModal");
  const groupNameField = document.getElementById("group-name-admin");
  const usersList = document.getElementById("usersListAdmin");

  usersList.innerHTML = "";
  groupNameField.value = "";

  // if (modal.classList.contains("z-10")) modal.classList.toggle("z-10");
  if (modal.classList.contains("-z-10")) return;

  modal.classList.toggle("z-10");
  modal.classList.toggle("-z-10");
}

async function showAdminTools(groupName) {
  try {
    const adminModal = document.getElementById("adminModal");
    const groupNameField = document.getElementById("group-name-admin");

    await showCurrentParticipants();
    groupNameField.value = groupName;
    adminModal.classList.toggle("-z-10");
    adminModal.classList.toggle("z-10");

    document.getElementById("closeAdminForm").focus();
  } catch (err) {
    console.error(err);
  }
}

async function showCurrentParticipants() {
  try {
    const usersList = document.getElementById("usersListAdmin");

    const res = await axios.get(host + "/group/currentUsers", {
      headers: {
        groupId: GROUP_ID,
      },
    });

    const { users, participants, admins } = res.data;

    const adminIds = new Set(admins.map((admin) => admin.id));
    const participantIds = new Set(
      participants.map((participant) => participant.id)
    );

    usersList.innerHTML = "";

    for (const user of users) {
      usersList.innerHTML += `<div
      class="flex items-center justify-between py-2 px-3 bg-gray-700 rounded-md"
    >
      <div class="flex-grow">
        <p class="text-sm font-medium text-white">${user.name}</p>
        <p class="text-xs text-gray-500">
          ${user.email}
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <label for="user${user.id}-add" class="flex items-center">
          <input
            type="checkbox"
            id="update-user-add${user.id}"
            name="update-user-add${user.id}"
            class="form-checkbox"
            value="${user.id}"
            onchange="let admin = this.parentElement.nextElementSibling.firstElementChild; admin.disabled = !admin.disabled"
          />
          <span class="ml-2 text-sm text-gray-400">Add</span>
        </label>
        <label for="user-admin${user.id}" class="flex items-center">
          <input
            type="checkbox"
            id="update-user-admin${user.id}"
            name="update-user-admin${user.id}"
            value="${user.id}"
            class="form-checkbox"
            disabled
          />
          <span class="ml-2 text-sm text-gray-400">Admin</span>
        </label>
      </div>
    </div>`;
    }

    for (const listItem of usersList.childNodes) {
      const participantCheckbox =
        listItem.lastElementChild.firstElementChild.firstElementChild;
      const adminCheckbox =
        listItem.lastElementChild.lastElementChild.firstElementChild;

      const id = participantCheckbox.value;

      if (participantIds.has(parseInt(id))) {
        participantCheckbox.click();
        if (adminIds.has(parseInt(id))) {
          adminCheckbox.click();
        }
      } else {
        console.log(Array.from(participantIds), id);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("updateGroup").addEventListener("click", async () => {
  const groupNameField = document.getElementById("group-name-admin");
  try {
    const addCheckboxes = document.querySelectorAll(
      'input[name^="update-user-add"]'
    );
    const adminCheckboxes = document.querySelectorAll(
      'input[name^="update-user-admin"]'
    );

    if (addCheckboxes.length != adminCheckboxes.length)
      throw new Error("Don't mess with the code buddy!");

    // addCheckboxes.forEach(function (checkbox) {
    //   const checkboxName = checkbox.name;
    //   const isChecked = checkbox.checked;

    //   // Do something with the "Add" checkbox value
    //   if (isChecked) {
    //     console.log(`Add checkbox ${checkboxName} is selected`);
    //   } else {
    //     console.log(`Add checkbox ${checkboxName} is not selected`);
    //   }
    // });

    const groupName = groupNameField.value;

    if (groupName.length < 1 || groupName.length > 30) {
      groupNameField.value = "";
      groupNameField.classList.toggle("placeholder-red-600");
      groupNameField.setAttribute(
        "placeholder",
        "Enter a name 1 - 30 characters long."
      );
      setTimeout(() => {
        groupNameField.classList.toggle("placeholder-red-600");
        groupNameField.setAttribute("placeholder", "");
      }, 3000);
      throw new Error("Invalid group name!");
    }

    const participants = [];
    const admins = [];

    for (let i = 0; i < addCheckboxes.length; i++) {
      if (addCheckboxes[i].checked) {
        participants.push(addCheckboxes[i].value);
        if (adminCheckboxes[i].checked) admins.push(adminCheckboxes[i].value);
      }
    }

    const res = await axios.put(host + "/group/update", {
      groupName,
      participants,
      admins,
      groupId: GROUP_ID,
    });

    const groupId = res.data.id;
    clearUpdateGroupForm();
    showGroupsButton.click();
    GROUP_ID = groupId;
    loadGroup({ lastElementChild: { textContent: groupName } }, groupId);
  } catch (err) {
    groupNameField.value = "";
    groupNameField.classList.toggle("placeholder-red-600");
    groupNameField.setAttribute(
      "placeholder",
      "Something went wrong, please try again later."
    );
    setTimeout(() => {
      groupNameField.classList.toggle("placeholder-red-600");
      groupNameField.setAttribute("placeholder", "");
      clearNewGroupForm();
    }, 3000);
    console.error(err);
  }
});

async function deleteGroup() {
  try {
    await axios.put(host + "/group/delete", { groupId: GROUP_ID });
    clearUpdateGroupForm();
    showGroupsButton.click();
    loadGroup(null, 0);
  } catch (err) {
    console.error(err);
  }
}
