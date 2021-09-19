const createAccount = (e) => {
    e.preventDefault();
    const doc = document.getElementsByClassName("inputs");
    const account_details = {
        "name": doc[0].value,
        "email": doc[1].value,
        "phone": doc[2].value,
        "balance": doc[3].value,
    };
    fetch("http://localhost:8000/create", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(account_details)
    })
    .then(response => response.json())
    .then((res) => {
        console.log(res);
        document.getElementsByClassName("msg")[0].innerText = res.msg;
        document.getElementsByClassName("msg")[0].style.color = res.color;
        document.getElementsByClassName("msg")[0].style.visibility = "visible"
        if (res.color === "green")
        {
            setTimeout(function() {location.href = "./transfer_from.html"}, 3000);
        }
    });
}