document.loginForm.onsubmit = async (event) => {
  try {
    event.preventDefault();
    const details = {
      email: document.getElementById("email").value,
      password: document.getElementById("password"),
    };
    const response = await axios.post("http://localhost:8080/login", details);
    if (response.status === 201) window.alert("Login successful!");
    else throw new Error(response.data.message);
  } catch (err) {
    window.alert(err.response.data.message);
  }
  document.loginForm.reset();
};
