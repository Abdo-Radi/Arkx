async function fetchUserData() {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const { users } = await response.json();

    const processedData = processUserData(users);
    const totalAge = summarizeAge(processedData);

    console.log('Processed Users:');
    processedData.forEach(user => console.log(`- Name: ${user.name}, Age: ${user.age}`));
    console.log(`Total Age of Male Users: ${totalAge}`);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

function processUserData(users) {
  return users
    .filter(user => user.gender === 'male')
    .map(({ firstName, lastName, age }) => ({ name: `${firstName} ${lastName}`, age }));
}

function summarizeAge(users) {
  return users.reduce((totalAge, user) => totalAge + user.age, 0);
}

// Call the fetchUserData function to initiate the process
fetchUserData();

  
  