const events = require('events');
const eventEmitter = new events.EventEmitter();
const fs = require("fs").promises;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function loadUsers() {
  try {
    const rawdata = await fs.readFile("users.json");
    return JSON.parse(rawdata);
  } catch (error) {
    console.error("Error loading users:", error);
    return {};
  }
}

async function saveUsers(users) {
  try {
    const data = JSON.stringify(Object.values(users), null, 2);
    await fs.writeFile("users.json", data);
  } catch (error) {
    console.error("Error saving users:", error);
  }
}

function exitApp() {
  console.log("Exiting application. Goodbye!");
  rl.close();
}

async function addUser() {
  const users = await loadUsers();
  rl.question("Enter name for new user: ", async (name) => {
    const accountID = "ACC" + (Object.keys(users).length + 1001);
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    users[accountID] = { accountID, name, pin, balance: 0.0, transactions: [] };
    console.log(`User ${name} added with accountID: ${accountID} and pin: ${pin}`);
    await saveUsers(users);
    firMain();
  });
}

async function authentication() {
  const users = await loadUsers();
  rl.question("Enter your accountID: ", (accountID) => {
    rl.question("Enter your pin: ", (pin) => {
      const user = Object.values(users).find(u => u.accountID === accountID && u.pin === pin);
      if (user) {
        console.log("Authentication successful!");
        transaction(user);
      } else {
        console.log("Authentication failed.");
        firMain();
      }
    });
  });
}

eventEmitter.on('checkBalance', (user) => console.log(`Your current balance is ${user.balance}`));

eventEmitter.on('deposit', async (user, Amount) => {
  try {
    const users = await loadUsers();
    console.log("Your old balance was " + user.balance);
    user.balance += Amount;
    console.log("Your new balance now is " + user.balance);
    users[user.accountID] = user;
    users[user.accountID].transactions.push({
      type: "Deposit",
      amount: Amount,
      date: new Date().toISOString()
    });
    await saveUsers(users);
  } catch (error) {
    console.error("Error depositing:", error);
  }
});

eventEmitter.on('withdraw', async (user, Amount) => {
  try {
    const users = await loadUsers();
    console.log("Your old balance was " + user.balance);
    user.balance -= Amount;
    console.log("Your new balance now is " + user.balance);
    users[user.accountID] = user;
    users[user.accountID].transactions.push({
      type: "Withdraw",
      amount: Amount,
      date: new Date().toISOString()
    });
    await saveUsers(users);
  } catch (error) {
    console.error("Error withdrawing:", error);
  }
});

eventEmitter.on("viewTransactions", (user) => {
  try {
    console.log(`User ${user.name}'s transactions:`);
    user.transactions.forEach(transaction => {
      const { type, amount, date } = transaction;
      console.log(`Type: ${type}, Amount: ${amount}, Date: ${date}`);
    });
  } catch (error) {
    console.error("Error viewing transactions:", error);
  }
});

function transaction(user) {
  console.log("1. Check balance");
  console.log("2. Deposit Money");
  console.log("3. Withdraw Money");
  console.log("4. View Transaction History");
  console.log("5. Exit");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        console.log("Check balance");
        eventEmitter.emit('checkBalance', user);
        transaction(user);
        break;
      case "2":
        console.log('Make deposit');
        rl.question("Enter amount to deposit: ", (amount) => {
          eventEmitter.emit("deposit", user, Number(amount));
          transaction(user);
        });
        break;
      case "3":
        console.log('Make withdraw');
        rl.question("Enter amount to withdraw: ", (amount) => {
          eventEmitter.emit("withdraw", user, Number(amount));
          transaction(user);
        });
        break;
      case "4":
        console.log("View Transactions");
        eventEmitter.emit("viewTransactions", user);
        transaction(user);
        break;
      case "5":
        exitApp();
        break;
      default:
        console.log("WRONG CHOICE PLEASE TRY AGAIN");
        transaction(user);
    }
  });
}

function firMain() {
  console.log("1. Add user");
  console.log("2. Authentication");
  console.log("3. Exit");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        addUser();
        break;
      case "2":
        authentication();
        break;
      case "3":
        exitApp();
        break;
      default:
        console.log("Invalid choice. Please try again.\n");
        firMain();
    }
  });
}

console.log("Welcome to the Contact Management System!\n");
firMain();
