viewAllAccounts = () => {
    const doc = document.getElementsByTagName("tbody")[0];

fetch("http://localhost:8000/accounts")
.then(response => response.json())
.then((data) => {
    const accounts = data.accounts;
    let accString = "";
    accounts.forEach((acc, index) => {
        // let {name, email, phone, balance} = acc;
        let currentAcc = `<tr>
        <td>${index + 1}</td>
        <td>${acc.name}</td>
        <td>${acc.email}</td>
        <td>${acc.phone}</td>
        <td>${acc.balance}</td>
        <td><button class="btn" onclick="fromAccount('${acc._id}')">Transfer</button></td>
        </tr>`;
        accString += currentAcc;
    });
    doc.innerHTML = accString;
});
}


const fromAccount = (from_id) => {
    console.log(from_id);
    localStorage.setItem("from-id", from_id);
    location.href = "transfer_to.html";
}

viewAllAccounts();