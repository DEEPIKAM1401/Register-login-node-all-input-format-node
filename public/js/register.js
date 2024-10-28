// form.addEventListener("submit", ()=>{
//     const selected = document.querySelectorAll('input[name="skills"]:checked');
//     let selectedValues = [];
//     selected.forEach((checkbox)=>{
//         selectedValues.push(checkbox.value);
//     });
//     const register = {
//         email: email.value,
//         password:password.value,
//         course:course.value,
//         gender:document.querySelector('input[name="gender"]:checked').value,
//         skills:selectedValues,
        
//     }
//     fetch("/api/register",
//     {
//         method:"POST",
//         body : JSON.stringify(register),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>res.json())
//         .then(data=>{
//             if(data.status == "error"){
//                 success.style.display="none";
//                 error.style.display="block";
//                 error.innerText = data.error;
//             }
//             else
//             {
//                 error.style.display="none";
//                 success.style.display="block";
//                 success.innerText = data.success;
//             }
//         })
// });

form.addEventListener("submit", async () => {
    const formData = new FormData();
    const selected = document.querySelectorAll('input[name="skills"]:checked');
    let selectedValues = [];

   

    selected.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
    });

    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("course", course.value);
    formData.append("gender", document.querySelector('input[name="gender"]:checked').value);
    formData.append("skills", selectedValues);
    formData.append("file", document.getElementById('file').files[0]); // Add file

    document.getElementById('file').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const preview = document.getElementById('filePreview');
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result; // Update preview source
            }
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });

    try {
        const res = await fetch("/api/register", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (data.status === "error") {
            success.style.display = "none";
            error.style.display = "block";
            error.innerText = data.error;
        } else {
            error.style.display = "none";
            success.style.display = "block";
            success.innerText = data.success;
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
