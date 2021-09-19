navBarImport = () => {
    let doc = document.getElementsByTagName("header")[0];
    doc.innerHTML = `<div class="logo"><h1>GRIPBank</h1></div>
        <ul class="navbar">
            <li><a href="./index.html" class="nav-links">Home</a></li>
            <li><a href="./create.html" class="nav-links">Create Account</a></li>
            <li><a href="./transfer_from.html" class="nav-links">Transfer Money</a></li>
            <li><a href="./history.html" class="nav-links">Transaction History</a></li>
        </ul>
        <button class="ham">
            <div></div>
            <div></div>
            <div></div>
        </button>`;
}

navBarImport();