// Problem 2: Fall Leaf Counter
// Your Name: Jason Rhoads
// Date: 10/16/2025

// Complete these functions
function countLeaves(days) {
    // Each day, leaves fall following this pattern:
    // Day 1: 10 leaves
    // Day 2: 20 leaves (doubles)
    // Day 3: 30 leaves (+10 from day 2)
    // Day 4: 40 leaves (+10 from day 3)
    // Pattern: First day doubles, then +10 each day
    if (days < 1)
        return "Invalid number of days. Please try again with a number of 1 or greater.";
    else if (!Number.isInteger(days))
        return "Invalid entry. Please enter a whole number ex 1-10";
    let total = 0;
    let dayCounter = 0;
    let leafString = "(";
    let leafCounter = 0;
    // Use a for loop to calculate total
    while (dayCounter < days) {
        dayCounter++;
        switch (dayCounter) {
            case 1:
                leafCounter = 10;
                total = leafCounter;
                leafString += `${leafCounter}`;
                break;
            case 2: 
                leafCounter *= 2;
                total = total + leafCounter;
                leafString += ` + ${(leafCounter)}`;
                break;
            default:
                leafCounter += 10;
                total = total + leafCounter;
                leafString += ` + ${leafCounter}`;
                break;
        }
    }

    days === 1 ? leafString = "" : leafString += ")"
    return (`${total} ${leafString}`).trim();
}

function categorizeLeafColors(leaves) {
    // leaves is an array of color strings
    // Count each color and return an object
    
    let colorCount = {};
    // Loop through array and count colors
    
    leaves.forEach(leaf => {
        // Check to see if the color of leaf already is in colorCount
        if (leaf in colorCount)
            //leaf already there so increase count by 1
            colorCount[leaf] += 1;
        else 
            //new leaf color. set value to 1
            colorCount[leaf] = 1;
    });


    return colorCount;
}


// Tests
console.log(countLeaves(-1));
console.log(countLeaves(1));
console.log(countLeaves(2));
console.log(countLeaves(3.1));
console.log(countLeaves(4));
console.log(countLeaves(5));
console.log(countLeaves(10));

console.log(categorizeLeafColors(["red", "yellow", "red", "brown"]));
console.log(categorizeLeafColors(["orange", "orange", "orange"]));
console.log(categorizeLeafColors([]));