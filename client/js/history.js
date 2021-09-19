const viewHistory = () => {
    const doc = document.getElementsByTagName("tbody")[0];
    fetch("http://localhost:8000/history")
    .then(response => response.json())
    .then((data) => {
        const histories = data.histories;
        let historyString = "";
        histories.forEach((history, index) => {
            let currentHistory = `<tr>
            <td>${index + 1}</td>
            <td>${history.from}</td>
            <td>${history.to}</td>
            <td>${history.amount}</td>
            <td>${history.createdAt}</td>
            </tr>`;
            historyString += currentHistory;
        });
        doc.innerHTML = historyString;
    });
}

viewHistory();