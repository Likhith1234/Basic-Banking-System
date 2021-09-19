const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    "name": String,
    "email": {
        unique: true,
        type: String
    },
    "phone": {
        unique: true,
        type: String
    },
    "balance": String
});

const historySchema = mongoose.Schema({
    "from": String,
    "to": String,
    "amount": String
}, { timestamps: true});

const accountModel = mongoose.model("accounts", accountSchema);
const historyModel = mongoose.model("histories", historySchema);

module.exports = {
    accountModel: accountModel,
    historyModel: historyModel
}