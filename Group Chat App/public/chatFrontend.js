const showGroupsButton = document.getElementById("showGroups");
const showUsersButton = document.getElementById("showUsers");
const groupsDiv = document.getElementById("groups");
const usersDiv = document.getElementById("users");

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
});
