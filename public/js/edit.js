document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("editForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updateData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch("/api/users/update", {
        method: "POST",
        body: JSON.stringify(updateData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "error") {
            document.getElementById("success").style.display = "none";
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerText = data.error;
        } else {
            document.getElementById("error").style.display = "none";
            document.getElementById("success").style.display = "block";
            document.getElementById("success").innerText = data.success;
        }
    });
});
});