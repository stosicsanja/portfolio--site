function sendMail() {
  var params = {
    from_name: document.getElementById("from_name").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_l61tvaj";
  const templateID = "template_7szjlfi";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("from_name").value = "";
      document.getElementById("email_id").value = "";
      document.getElementById("message").value = "";
      console.log(res);
    })
    .catch((err) => console.log(err));
}

/*Validation  */

const form = document.getElementById("form");
const nameInput = document.getElementById("from_name");
const email = document.getElementById("email_id");
const messsageInput = document.getElementById("message");
const allSuccess = document.getElementById("all_success");
console.log(form, nameInput, email, messsageInput, allSuccess);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;

  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  console.log(errorDisplay, inputControl);
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const nameValue = nameInput.value.trim();
  const emailValue = email.value.trim();
  const messageValue = messsageInput.value.trim();

  if (nameValue === "") {
    setError(nameInput, "Name is required");
  } else {
    setSuccess(nameInput);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (messageValue === "") {
    setError(messsageInput, "Message is required");
  } else {
    setSuccess(messsageInput);
  }

  if (
    nameInput.value === "" ||
    email.value === "" ||
    messsageInput.value === ""
  ) {
    danger.style.display = "block";
  } else if (!isValidEmail(emailValue)) {
    danger.style.display = "none";

    allSuccess.style.display = "none";
  } else {
    allSuccess.style.display = "block";
    document.getElementById("btn-submit").addEventListener("click", sendMail());
  }

  setTimeout(() => {
    danger.style.display = "none";
    allSuccess.style.display = "none";
  }, 10000);
};
