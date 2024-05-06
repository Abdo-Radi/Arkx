function addNumbers(num1, num2) {
    return num1 + num2;
   }
function substractNumbers(num1, num2) {
    return num1 - num2;
   }
function multiplyNumbers(num1, num2) {
    return num1 * num2;
   }
function devideNumbers(num1, num2) {
    return num1 / num2;
   }
// Check if command line arguments are provided
if (process.argv.length >= 5) {
    // Get the function name and arguments from the command line
    const operation = process.argv[2];
    const num1 = parseFloat(process.argv[3]);
    const num2 = parseFloat(process.argv[4]);
  
    // Call the appropriate function based on the provided operation
    switch (operation) {
      case 'add':
        console.log(addNumbers(num1, num2));
        break;
      case 'subtract':
        console.log(subtractNumbers(num1, num2));
        break;
      case 'multiply':
        console.log(multiplyNumbers(num1, num2));
        break;
      case 'divide':
        console.log(divideNumbers(num1, num2));
        break;
      default:
        console.log('Invalid operation');
    }
  } else {
    console.log('Usage: node mathOperations.js [add|subtract|multiply|divide] [num1] [num2]');
  }
   
