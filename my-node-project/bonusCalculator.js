const fs = require('fs');
const xlsx = require('xlsx');

// Function to calculate bonus based on annual salary
function calculateBonus(annualSalary) {
  if (isNaN(annualSalary)) {
    return { percentage: 0, amount: 0 };
  }

  if (annualSalary < 50000) {
    return { percentage: 5, amount: 0.05 * annualSalary };
  } else if (annualSalary <= 100000) {
    return { percentage: 7, amount: 0.07 * annualSalary };
  } else {
    return { percentage: 10, amount: 0.1 * annualSalary };
  }
}

// Function to process the Excel file and calculate bonuses
function processExcelFile(inputFilePath, outputFilePath) {
  try {
    // Read Excel file
    const workbook = xlsx.readFile(inputFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Process data
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Add headers for bonus information
    data[0].push('Bonus Percentage', 'Bonus Amount');

    // Calculate bonuses for each employee
    for (let i = 1; i < data.length; i++) {
      const annualSalary = parseFloat(data[i][1] || 0); // Handle undefined or non-numeric values
      const bonus = calculateBonus(annualSalary);
      data[i].push(bonus.percentage, bonus.amount.toFixed(2));
    }

    // Create a new workbook for writing
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

    // Write to a new Excel file
    xlsx.writeFile(newWorkbook, outputFilePath);

    console.log(`Bonus calculation completed. Results written to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error processing Excel file: ${error.message}`);
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node bonusCalculator.js <inputFilePath> <outputFilePath>');
  process.exit(1);
}

const inputFilePath = args[0];
const outputFilePath = args[1];

// Check if input file exists
if (!fs.existsSync(inputFilePath)) {
  console.error('Input file does not exist.');
  process.exit(1);
}

// Process the Excel file
processExcelFile(inputFilePath, outputFilePath);




