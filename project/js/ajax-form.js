document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);

    // Send the form data using Fetch API
    fetch('/php/store_contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Display the server response in the confirmation div
        document.getElementById("confirmation").innerHTML = data;
        // Optionally, reset the form after successful submission
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("confirmation").innerHTML = "An error occurred: " + error;
    });
});
