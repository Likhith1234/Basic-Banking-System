const router = require("express").Router();
const { createAccount, fetchAccountController, transferMoney, viewAllAccounts, viewHistory } = require("../controllers/controller.js");

router.post("/create", createAccount);
router.get("/accounts", viewAllAccounts);
router.get("/account/:id", fetchAccountController);
router.post("/transfer", transferMoney);
router.get("/history", viewHistory);


module.exports.router = router;
