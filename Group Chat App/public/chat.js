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
    USER_TOGGLE = false;
  } else USER_TOGGLE = true;
});

async function appendActiveUsers() {
  try {
    const response = await axios.get(host + "/chat/activeUsers");
    const activeUsers = response.data;
    usersDiv.innerHTML = `
    <div class="bg-gray-950 rounded flex p-4 items-center mb-3">
      <span class="title-font font-medium text-white w-full text-center">
        Users
      </span>
    </div>`;
    for (const userId in activeUsers) {
      const outerDiv = document.createElement("div");
      outerDiv.className = "bg-gray-800 rounded flex p-4 items-center mb-3";

      const nameSpan = document.createElement("span");
      nameSpan.className =
        "title-font font-medium text-white w-full text-center";
      nameSpan.textContent = activeUsers[userId][0];

      const emailSpan = document.createElement("span");
      emailSpan.className = "text-xs w-full text-center";
      emailSpan.textContent = activeUsers[userId][1];

      const idSpan = document.createElement("span");
      idSpan.className = "hidden";
      idSpan.textContent = userId;

      outerDiv.appendChild(nameSpan);
      outerDiv.appendChild(emailSpan);
      outerDiv.appendChild(idSpan);

      usersDiv.appendChild(outerDiv);
    }
  } catch (err) {
    console.log(err);
  }
}

async function appendGroups() {
  try {
    const res = await axios.get(host + "/group/all");

    const { userGroups: groups } = res.data;

    // groupsDiv.children = [groupsDiv.children[0]];

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
      <div class="bg-gray-800 rounded flex p-4 items-center mb-3" onclick="loadGroup(this, ${group.id})">
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

    // await fetchMessages(groupId);
    GROUP_ID = groupId;
    showGroupsButton.click();
  }
}

function showMessage(message) {
  chatBox.innerHTML += `
  <div class="bg-gray-800 rounded text-start p-4 my-3 mx-3">
  ${message}.
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

    console.log(messages);
    if (!storedMessages) storedMessages = { groupId: [] };
    if (!storedMessages[groupId]) storedMessages[groupId] = [];
    for (const message of messages) {
      storedMessages[groupId].push(message.message);
      showMessage(message.message);
      console.log(message);
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
    showMessage(message);
  }
}

// window.addEventListener("DOMContentLoaded", () => {
// });

async function createNewGroup() {
  try {
    const newGroupForm = document.getElementById("newGroupForm");

    newGroupForm.classList.toggle("-z-10");
    newGroupForm.classList.toggle("z-10");
  } catch (err) {
    console.error(err);
  }
}
