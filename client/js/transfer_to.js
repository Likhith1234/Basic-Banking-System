const from_id = localStorage.getItem("from-id");
localStorage.removeItem("from-id");

fetch("http://localhost:8000/accounts")
.then(response => response.json())
.then((data) => {
    const accounts = data.accounts
    let allAccounts = "";
    accounts.forEach(acc => {
        if (acc._id === from_id){
            const doc = document.getElementsByTagName("tbody")[0];
            doc.innerHTML = `<tr>
            <td>${acc.name}</td>
            <td>${acc.email}</td>
            <td>${acc.phone}</td>
            <td>${acc.balance}</td>
            </tr>`;
        }
        else{
            let currentAccount = `<option value="${acc._id}">${acc.name}(${acc.balance})</option>`;
            allAccounts += currentAccount;
            document.getElementById("to").innerHTML = allAccounts;
        }
    })});

const transferMoney = (e) => {
    e.preventDefault();
    const to_id = document.getElementById("to").value;
    const amount = document.getElementById("amount").value;
    const transfer_details = {"from": from_id, "to": to_id, "amount": amount};
    fetch("http://localhost:8000/transfer", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(transfer_details)
    })
    .then(response => response.json())
    .then((res) => {
        const doc = document.getElementsByClassName("msg")[0];
        doc.innerText = res.msg;
        doc.style.color = res.color;
        doc.style.visibility = "visible";
        if (res.color === "green")
        {
            setTimeout(() => {location.href="history.html"}, 3000);
        }
    })
}
