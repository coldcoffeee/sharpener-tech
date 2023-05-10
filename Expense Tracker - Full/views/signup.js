// console.log(document.signupForm);
document.signupForm.onsubmit = async (event) => {
  event.preventDefault();
  try {
    const details = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const response = await axios.post("http://localhost:8080/signup", details);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
  document.signupForm.reset();
};
