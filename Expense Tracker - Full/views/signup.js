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
    if (response.status === 201) window.alert("Sign Up successful!");
    else window.alert(response.data.message);
  } catch (err) {
    console.log(err);
  }
  document.signupForm.reset();
};
