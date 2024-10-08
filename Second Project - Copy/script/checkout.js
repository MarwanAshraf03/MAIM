document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateForm()) {
      displayConfirmation();
    }
  });

  function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const zip = document.getElementById("zip");
    const cardName = document.getElementById("card-name");
    const cardNumber = document.getElementById("card-number");
    const expiryDate = document.getElementById("expiry-date");
    const cvv = document.getElementById("cvv");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const cvvPattern = /^\d{3}$/;

    const fields = [
      { field: name, message: "Please enter your name" },
      {
        field: email,
        message: "Please enter a valid email",
        pattern: emailPattern,
      },
      { field: address, message: "Please enter your address" },
      { field: city, message: "Please enter your city" },
      { field: zip, message: "Please enter your ZIP code" },
      { field: cardName, message: "Please enter the cardholder's name" },
      {
        field: cardNumber,
        message: "Please enter a valid card number",
        pattern: cardNumberPattern,
      },
      { field: expiryDate, message: "Please select an expiry date" },
      { field: cvv, message: "Please enter a valid CVV", pattern: cvvPattern },
    ];

    for (const { field, message, pattern } of fields) {
      if (!field.value || (pattern && !pattern.test(field.value))) {
        alert(message);
        field.focus();
        return false;
      }
    }

    return true;
  }

  function displayConfirmation() {
    alert("Thank you for your order! Your payment has been processed.");
    form.reset();
  }
});
