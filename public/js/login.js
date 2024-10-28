form.addEventListener("submit", ()=>{
    const login = {
        email: email.value,
        password:password.value
    }
    fetch("/api/login",
    {
        method:"POST",
        body : JSON.stringify(login),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        // Check if the response is a redirect
        if (res.redirected) {
            window.location.href = res.url; // Redirect the browser to the new URL
        } else {
            return res.json(); // Otherwise, parse the JSON response
        }
    })
        .then(data=>{
            if(data.status == "error"){
                success.style.display="none";
                error.style.display="block";
                error.innerText = data.error;
            }
            else
            {
                error.style.display="none";
                success.style.display="block";
                success.innerText = data.success;
            }
        })
});