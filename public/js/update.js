//    // public/js/update.js
//    const form = document.getElementById("form1");
//    const email = document.querySelector('input[name="email"]');
//    const error = document.getElementById("error");
//    const success = document.getElementById("success");
//    const userId = "<%= user.id %>"; // This will be rendered by your server-side EJS
   
//    form.addEventListener("submit", (event) => {
//        // event.preventDefault(); // Prevent the default form submission
   
//        const updatedUser = {
//            email: email.value // Capture the email input value
//        };
//        console.log("Updated User Data:", updatedUser); // Log for debugging
//        console.log("Email being sent:", updatedUser.email);
//        console.log("User ID:", userId); // Log the user ID for debugging
   
//        fetch(`/users/update/${userId}`, {  // Correct path
//            method: "POST",
//            body: JSON.stringify(updatedUser),
//            headers: {
//                "Content-Type": "application/json",
//            },
//        })
//        .then(res => res.json())
//        .then(data => {
//            if (data.status === "error") {
//                success.style.display = "none";
//                error.style.display = "block";
//                error.innerText = data.error;
//            } else {
//                error.style.display = "none";
//                success.style.display = "block";
//                success.innerText = data.success;
//            }
//        })
//        .catch(err => {
//            console.error('Error:', err);
//            error.style.display = "block";
//            error.innerText = "An error occurred. Please try again.";
//        });
//    });