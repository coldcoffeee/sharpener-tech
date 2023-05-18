document.loginForm.onsubmit = async (event) => {
  try {
    event.preventDefault();
    const details = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const response = await axios.post("http://localhost:8080/login", details);
    if (response.status === 201) {
      await console.log(response.data);
      window.alert(response.data.message);
      window.location = response.data.redirect;
    } else throw new Error(response.data.message);
  } catch (err) {
    window.alert(err.response.data.message);
  }
  document.loginForm.reset();
};
