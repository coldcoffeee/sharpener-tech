document.loginForm.onsubmit = async (event) => {
  try {
    event.preventDefault();
    const details = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const response = await axios.post("http://localhost:8080/login", details);
    console.log(response.data);
    document.loginForm.reset();
  } catch (err) {
    console.log(err);
  }
};
