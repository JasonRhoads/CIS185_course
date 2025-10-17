// Problem 4: Pattern Generator
// Your Name: Jason Rhoads
// Date: 10/17/2025

// Complete these functions

function createPyramid(height) {
    // Build a centered pyramid of asterisks (*)
    // Example: height = 3 →
    //   *
    //  ***
    // *****
    // Return as a string with \n between lines

    // Guard statement
    if (!height || height <= 0) {
        console.log("Please enter a valid height ex. 1-3");
        return "";
    }

    let pyramidString = "";

    // Start at 1 to represent line 1 and go to equal the height. 
    for (let i = 1; i <= height; i++) {
        // Get the number of spaces based off of the height - line number
        // Get the number of * based off of the line number plus additional *s to make the pyramid
        pyramidString += " ".repeat(height - i) + "*".repeat(i + i - 1) + "\n";
    }

    // // for i = 0
    // for (let i = 0; i < height; i++) {
    //     // Get the number of spaces based off of the height - line number
    //     // Get the number of * based off of the line number plus additional *s to make the pyramid
    //     pyramidString += " ".repeat(height - i - 1) + "*".repeat(2 * i + 1) + "\n";
    // }

    // Remove the last new line. Not sure if this is necessary or not.
    return pyramidString.trimEnd();
}

function createNumberStaircase(steps) {
    // Build a staircase of increasing numbers
    // Example: steps = 5 →
    // 1
    // 12
    // 123
    // 1234
    // 12345

    // Guard statement
    if (!steps || steps <= 0) {
        console.log("Please enter a number of steps ex. 1-5");
        return "";
    }

    // Declare string
    let stepsString = "";

    // Have the index start at 1 for the first step upto inluding the steps value
    for (let i = 1; i <= steps; i++) {
        // Nested loop to add the numbers for each step 
        for (let n = 1; n <= i; n++) {
            stepsString += `${n}`;
        }
        // add new line after step is completed
        stepsString += `\n`;
    }

    // Remove the last new line. Not sure if this is necessary or not.
    return stepsString.trimEnd();
}

function createCheckerboard(size) {
    // Create a checkerboard pattern of X and O
    // Example: size = 4 →
    // XOXO
    // OXOX
    // XOXO
    // OXOX

    // Guard statement
    if (!size || size <= 0) {
        console.log("Please enter a size ex. 1-5");
        return "";
    }

    // Declare string
    let sizeString = "";

    // Loop through the size of the checkerboard
    for (let i = 0; i < size; i++) {
        //Check for an even row
        if (i % 2 === 0) {
            for (let n = 0; n < size; n++) {
                // insert the alternating pattern a number of times equal to size
                n % 2 === 0 ?
                sizeString += "X" :
                sizeString += "O"
            }
        } 
        // Odd Row
        else {
            for (let n = 0; n < size; n++) {
                // insert the alternating pattern a number of times equal to size
                n % 2 === 0 ?
                sizeString += "O" :
                sizeString += "X"
            }
        }
        
        // Add a new line when the row is finished
        sizeString += "\n";
    }


    // Remove the last new line. Not sure if this is necessary or not.
    return sizeString.trimEnd();
}


// console.log(createPyramid(3));
// console.log(createPyramid(4));
// console.log(createNumberStaircase(5));
// console.log(createCheckerboard(4));