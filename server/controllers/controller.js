const { accountModel, historyModel } = require("../models/model.js");

const rupees = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
});

const min_balance = rupees.format(1000);

const createAccount = (req, res) => {
    const acc = req.body;
    const accObj = new accountModel(acc);
    try {
        accObj.save()
        .then(() => {res.json({"msg": "Account created", "color": "green"})})
        .catch((err) => {
            res.json({"msg": "Account with the entered email/phone\n is already exits", "color": "red"})
        });
    } catch (error) {
        res.json(`Error is: ${error.message}`);
    }
}

const viewAllAccounts = async (req, res) => {
    const accounts = await accountModel.find();
    accounts.forEach(account => {
        account.balance = rupees.format(account.balance)
    });
    res.json({accounts: accounts});
}

const fetchAccount = async (id) => {
    let acc = await accountModel.findOne({"_id": id});
    if (acc === null) return -1;
    return acc;
}

const fetchAccountController = async (req, res) => {
    const id = req.params.id;
    if (id === null) return -1;
    let result = await fetchAccount(id.slice(1,id.length));
    if (result === -1) return res.json(`Account does not exists`);
    return res.json(result);
}

const transferMoney = async (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const amount_to_be_transfered = req.body.amount;
    const from_acc = await fetchAccount(from);
    const to_acc = await fetchAccount(to);
    if ( from_acc === -1) return res.json({"msg": "Account does not exists", "color": "red"});
    if ( Number(from_acc.balance) < Number(amount_to_be_transfered) ) return res.json({"msg": "Insufficient Funds", "color": "red"});
    if ( (Number(from_acc.balance) <= min_balance) || (Number(from_acc.balance) === Number(amount_to_be_transfered)) ) return res.json({"msg": `Minimum balance of ${min_balance} should be maintained`, "color": "red"});
    else {
        try {
            await accountModel.updateOne({_id: from}, {balance: from_acc.balance-amount_to_be_transfered});
            await accountModel.updateOne({_id: to}, {balance: Number(to_acc.balance)+Number(amount_to_be_transfered)});
            res.json({"msg": `Amount transferred from ${from_acc.name} to ${to_acc.name}`, "color": "green"});
            const history = {"from": from_acc.name, "to": to_acc.name, "amount": amount_to_be_transfered};
            const historyObj = new historyModel(history);
            historyObj.save()
            .catch((err) => console.log(`History Error Message: ${err.message}`));
        } catch (error) {
            console.log(error.message);
        }
    }
}

const viewHistory = async (req, res) => {
    const histories = await historyModel.find();
    return res.json({histories: histories});
}

module.exports = {
    createAccount: createAccount,
    viewAllAccounts: viewAllAccounts,
    fetchAccountController: fetchAccountController,
    transferMoney: transferMoney,
    viewHistory: viewHistory
}