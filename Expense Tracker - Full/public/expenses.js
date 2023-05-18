const expensesBody = document.querySelector(".expenses-body");
const leaderboardsBody = document.querySelector(".leaderboards-body");
const descriptionField = document.getElementById("description");
const categoryField = document.getElementById("category");
const amountField = document.getElementById("amount");
const host = window.location.protocol + "//" + window.location.host;

async function updateLeaderboards() {
  try {
    const res = await axios.get(host + "/leaderboards");
    leaderboardsBody.innerHTML = "";
    // for (const entry of res.data.entry) {
    //   console.log(entry);
    //   const obj = {
    //     rank: i++,
    //     name: entry.user.name,
    //     totalExpenses: entry.totalExpense,
    //   };
    //   appendToLeaderboards(entry);
    // }
    console.log(res.data);
    for (let i = 1; i <= res.data.result.length; i++) {
      if (res.data.result[i - 1].totalExpense === 0) continue;
      const obj = {
        rank: i,
        name: res.data.result[i - 1]["name"],
        totalExpenses: res.data.result[i - 1].totalExpense,
      };
      appendToLeaderboards(obj);
    }
    // console.log(res.data.result[0]);
  } catch (err) {
    window.alert(err);
  }
}

function appendToLeaderboards({ rank, name, totalExpenses }) {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.setAttribute("scope", "row");
  th.classList.add("w-25");
  th.textContent = rank;

  const tdName = document.createElement("td");
  tdName.classList.add("w-50");
  tdName.textContent = name;

  const tdTotalExpenses = document.createElement("td");
  tdTotalExpenses.classList.add("w-25");
  tdTotalExpenses.textContent = totalExpenses;

  tr.appendChild(th);
  tr.appendChild(tdName);
  tr.appendChild(tdTotalExpenses);

  leaderboardsBody.appendChild(tr);
}

function appendExpense({ id, amount, description, category }) {
  const tr = document.createElement("tr");

  const tdId = document.createElement("td");
  tdId.setAttribute("class", "d-none");
  tdId.textContent = id;
  tr.appendChild(tdId);

  const tdCategory = document.createElement("td");
  tdCategory.setAttribute("class", "w-25");
  tdCategory.textContent = category;
  tr.appendChild(tdCategory);

  const tdDescription = document.createElement("td");
  tdDescription.setAttribute("class", "w-25");
  tdDescription.textContent = description;
  tr.appendChild(tdDescription);

  const tdAmount = document.createElement("td");
  tdAmount.setAttribute("class", "w-25");
  tdAmount.textContent = amount;
  tr.appendChild(tdAmount);

  const tdBtn = document.createElement("td");
  tdBtn.setAttribute("class", "w-25");
  tr.appendChild(tdBtn);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn btn-light");
  btnDelete.textContent = "Delete";
  btnDelete.onclick = deleteExpense;
  tdBtn.appendChild(btnDelete);

  expensesBody.appendChild(tr);
}

async function deleteExpense() {
  try {
    const id = this.parentElement.parentElement.firstElementChild.textContent;
    const res = await axios.delete(host + "/expense/" + id);
    console.log(res);
    if (res.status === 201) {
      this.parentElement.parentElement.remove();
      window.alert(res.data.message);
      await updateLeaderboards();
    } else throw new Error(req.data.message);
  } catch (err) {
    window.alert(err);
  }
}

window.onload = async () => {
  try {
    const {
      data: { entries },
    } = await axios.get(host + "/expense/all");
    for (const obj of entries) appendExpense(obj);

    const res = await axios.get(host + "/premium");
    if (res.data.isPremiumUser) {
      document.getElementById("btnPremium").style.display = "none";
      document.querySelector("h1").textContent += "+";
      await updateLeaderboards();
    } else {
      document.querySelector(".lower").setAttribute("class", "d-none");
    }
  } catch (err) {
    console.log(err);
    window.alert(err);
  }
};

async function postExpense() {
  const expense = {
    amount: amountField.value,
    description: descriptionField.value,
    category: categoryField.value,
  };
  try {
    const res = await axios.post(host + "/expense", expense);
    if (res.status === 201) {
      expense.id = res.data.id;
      appendExpense(expense);
      descriptionField.value = "";
      categoryField.value = "";
      amountField.value = "";
      window.alert(res.data.message);
      await updateLeaderboards();
    } else throw new Error("res.data.message");
  } catch (err) {
    window.alert(err);
  }
}

// function edit() {
//   console.log(this.parentElement.children);
//   const [price_, description_, category_] =
//     this.parentElement.children[0].textContent.split(" ");
//   const id = this.parentElement.children[3].textContent;
//   amountField.value = price_;
//   descriptionField.value = description_;
//   categoryField.value = category_;
//   const addBtn = document.getElementById("add");
//   const editBtn = document.getElementById("edit");

//   addBtn.disabled = true;
//   editBtn.disabled = false;

//   editBtn.onclick = async () => {
//     const newExpense = {
//       id: id,
//       price: priceField.value,
//       description: descriptionField.value,
//       category: categoryField.value,
//     };

//     try {
//       const res = await axios.put("http://localhost:8080/", newExpense);
//       if (res.status === 201) {
//         this.parentElement.children[0].textContent =
//           priceField.value +
//           " " +
//           descriptionField.value +
//           " " +
//           categoryField.value;
//         window.alert(res.data.message);
//       } else throw new Error(res.data.message);
//     } catch (err) {
//       window.alert(err);
//     }

//     priceField.value = "";
//     descriptionField.value = "";update
//     categoryField.value = "";

//     editBtn.onclick = null;
//     editBtn.disabled = true;
//     addBtn.disabled = false;
//   };
// }
document.expenseForm.onsubmit = async (event) => {
  event.preventDefault();
  postExpense();
};

// window.onload = async () => {
//   const res = await axios.get(host + "/premium");
//   console.log(res);
//   if (res.data.isPremiumUser) {
//     document.getElementById("btnPremium").style.display = "none";
//     document.querySelector("h1").textContent += "+";
//   }
// };

document.getElementById("btnPremium").onclick = async () => {
  try {
    const response = await axios.post(host + "/premium", {});

    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        const res = await axios.put(host + "/premium", {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        });

        window.alert("You are a Premium User Now");
        window.location.reload();

        // document.getElementById("btnPremium").style.display = "none";
        // document.getElementById("message").innerHTML =
        //   "You are a premium user ";
        // localStorage.setItem("token", res.data.token);
        // showLeaderboard();
      },
    };
    const payment = new Razorpay(options);
    payment.open();
    // e.preventDefault();

    payment.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  } catch (err) {
    window.alert(err);
  }
};
