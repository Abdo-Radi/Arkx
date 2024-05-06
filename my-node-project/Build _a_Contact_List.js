const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const contacts = [];

function addContact() {
  rl.question('Enter name: ', (name) => {
    rl.question('Enter phone number: ', (phoneNumber) => {
      contacts.push({ name, phoneNumber });
      console.log('Contact added successfully!');
      showMenu();
    });
  });
}

function viewContacts() {
  if (contacts.length === 0) {
    console.log('No contacts found.');
  } else {
    console.log('Contacts:');
    contacts.forEach(contact => console.log(`${contact.name}: ${contact.phoneNumber}`));
  }
  showMenu();
}

function searchContact() {
  rl.question('Enter name to search: ', (name) => {
    const foundContact = contacts.find(contact => contact.name === name);
    if (foundContact) {
      console.log(`Contact found: ${foundContact.name}: ${foundContact.phoneNumber}`);
    } else {
      console.log('Contact not found.');
    }
    showMenu();
  });
}

function showMenu() {
  console.log('\nMenu:');
  console.log('1. Add a contact');
  console.log('2. View all contacts');
  console.log('3. Search for a contact');
  console.log('4. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        addContact();
        break;
      case '2':
        viewContacts();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        showMenu();
    }
  });
}

console.log('Welcome to the Contacts App!');
showMenu();

rl.on('close', () => {
  console.log('Exiting...');
  process.exit(0);
});
