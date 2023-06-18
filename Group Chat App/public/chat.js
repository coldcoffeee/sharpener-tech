const host = window.location.protocol + "//" + window.location.host;

/*****************************FRONTEND******************************/

const showGroupsButton = document.getElementById("showGroups");
const showUsersButton = document.getElementById("showUsers");
const groupsDiv = document.getElementById("groups");
const usersDiv = document.getElementById("users");
const chatBox = document.getElementById("chatBox");

let USER_TOGGLE = true;

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
    if (groupId === -1) return null;
    const res = await axios.get(host + "/chat/all", {
      headers: {
        groupId,
      },
    });

    const { messages, groupId: receivedId } = res.data;

    chatBox.innerHTML = "";
    for (const message of messages) {
      showMessage(message.message);
      console.log(message.message);
    }
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
      groupId: 2,
    });

    document.getElementById("message").value = "";
    // fetchMessages(2);
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("send").onclick = sendMessage;

setInterval(async () => {
  await fetchMessages(2);
}, 1000);
