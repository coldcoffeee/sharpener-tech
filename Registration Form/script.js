const date = new Date();
document.getElementById("date").valueAsDate = date;

const logData = function () {
  const details = {
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").valueAsDate,
    time: document.getElementById("time").value,
  };

  localStorage.setItem(details.phone, JSON.stringify(details));
  console.log(localStorage.getItem(details.phone));
};
