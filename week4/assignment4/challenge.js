// Challenge: Number System Converter
// Your Name: Jason Rhoads
// Date: 10/17/2025

// Complete these functions

function decimalToBinary(decimal) {
    // Convert decimal number to binary string
    // Don't use toString(2)!

    // Guard statement to see that it is positive and an integer
    // using % 1 to see that there are no decimal places
    if (decimal < 0 || decimal % 1 !== 0) {
       return "Invalid number. Please enter a number between ex 0-255";
    }

    // Declare variables
    let binaryString = ""
    let number = decimal;
    let highestByteValue = 0;

    // Loop through 2 to the power of i untill the highest byte is found.
    for (let i = 0; i < decimal; i++) {
        // Check till decimal is less than 2 ** i and go down to the previous byte
        // ex 2 ** 4 = 16. 10 < 16 = true so byte 3 is the biggest byte for 10. 
        if (decimal <= 2 ** i) {
            highestByteValue = i - 1;
            break
        }
    }

    // Loop through counting down from the highest byte value adding appropriate
    // 1 and 0 until highestbyteValue reaches the end.
    while (highestByteValue >= 0) {
        // number can fit into the highestbytevalue
        // add 1 to binary string and subtract value.
        // reduce highestbytevalue to check the next number
        if (number >= 2 ** highestByteValue) {
            binaryString += "1";
            number -= 2 ** highestByteValue;
            highestByteValue--;
        } 
        // number cannot fit. add 0 to binary string and 
        // reduce highestbytevalue to check the next number
        else {
            binaryString += "0";
            highestByteValue--;
        }
    }

    return binaryString;
}

function binaryToDecimal(binary) {
    // Convert binary string to decimal number
    // Don't use parseInt(binary, 2)!

    // regex expression to only use 0 and 1 and to make sure that a number was not entered
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    if (!(/^[01]+$/.test(binary)) || typeof binary === "number") {
        return `Invalid binary string. ex "101010"`
    }

    // Declare variables
    let number = 0;

    // Loop through the binary string checking for 1s 
    for (let i = 0; i < binary.length; i++) {
        //Check to see if the value is a 1
        if (binary[i] == "1")
            // Calculate the byte size and add it to number.
            // ex with "1010" the first byte is 2 ** 3
            // for the first 1 binary.length is 4 - 0 - 1 = 3
            number += 2 ** (binary.length - i - 1);
    }

    return number;

}

function decimalToHexadecimal(decimal) {
    // Convert decimal to hexadecimal string
    // Use 0-9 and A-F for digits
    // Don't use toString(16)!

    // Guard statement to make sure decimal is an integer between 0 and 255 
    if (decimal > 255 || decimal < 0 || decimal % 1 !== 0) {
        return "Invalid number. Please enter a number between 0-255";
    }

    // create array of hex digits 
    let hexNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

    // Get the first digit by dividing the number by 16 and truncating the decimal
    // 255 / 16 = 15
    let digitOne = Math.trunc(decimal / 16);

    // Get the second digit by taking the remainder
    // 26 % 16 = 10
    let digitTwo = decimal % 16;

    // return the Hex number based off of the digitOne and digitTwo
    // hexNums[15] = "F"
    // hexNums[10] = "A"
    return hexNums[digitOne] + hexNums[digitTwo];
}

// Tests
// console.log(decimalToBinary(10));
// console.log(decimalToBinary(25));
// console.log(decimalToBinary(0));
// console.log(decimalToBinary(-10));
// console.log(decimalToBinary("A"));
// console.log(binaryToDecimal("1010"));
// console.log(binaryToDecimal("11111"));
// console.log(binaryToDecimal("0"));
// console.log(binaryToDecimal("A"));
// console.log(binaryToDecimal(1111));
// console.log(binaryToDecimal("-10"));
// console.log(decimalToHexadecimal(255));
// console.log(decimalToHexadecimal(26));
// console.log(decimalToHexadecimal(16));
// console.log(decimalToHexadecimal(-16));
// console.log(decimalToHexadecimal("A"));

