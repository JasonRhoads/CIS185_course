// Problem 5: Array Manipulator
// Your Name: Jason Rhoads
// Date: 10/17/2025

// Complete these functions

function reverseArray(arr) {
    // Return a new array with elements in reverse order
    // Don't use the built-in reverse() method!
    // Don't modify the original array

    // Create new empty array
    let newArr = [];

    // Loop through the array
    for (let i = 0; i < arr.length; i++) {
        // Add each element to the front of the array 
        // causing the array to reverse itself
        newArr.unshift(arr[i])
    }

    return newArr;
}

function removeDuplicates(arr) {
    // Return a new array with duplicates removed
    // Maintain original order of first occurrence

    // Create new empty array
    let newArr = []

    // Loop through the orginal array
    for (let i = 0; i < arr.length; i++) {
        // Check to see if the current value has already been added to newArr
        if (!newArr.includes(arr[i]))
            newArr.push(arr[i])
    }

    return newArr;
}

function rotateArray(arr, positions) {
    // Rotate array to the right by 'positions'
    // Handle positions larger than array length

    // Copy the array into a new array 
    let newArr = arr;

    // Check to see how many rotations need to be done and if 
    // positions is larger than the length of the array get the modulus
    let rotations = positions > arr.length ? positions % arr.length : positions;

    // Loop through the array 
    for (let i = 0; i < rotations; i++) {
        // take the last value of the array and put it in the front of the array
        newArr.unshift(newArr.pop());
    }

    return newArr;
}

function findSecondLargest(numbers) {
    // Find and return the second largest number
    // Return null if array has less than 2 unique values

    //Declare variables
    let sortedNumbers = [];

    // loop through the array to remove duplicate values
    for (let i = 0; i < numbers.length; i++) {
        if (!sortedNumbers.includes(numbers[i]))
            sortedNumbers.push(numbers[i])
    }

    // Sort the array from the high to the lowest
    sortedNumbers.sort((a, b) => b - a);

    // Check to see if there is more than 2 unique values 
    // return null if there is less than 2 unique values
    // return the second value [1] for the second highest number
    return sortedNumbers.length === 1 ? null : sortedNumbers[1];
}


// Tests

// console.log(reverseArray([1, 2, 3, 4]));
// console.log(reverseArray(["a", "b", "c"]));
// console.log(reverseArray([]));
// console.log(removeDuplicates([1, 2, 2, 3, 1, 4]));
// console.log(removeDuplicates(["a", "b", "a", "c"]));
// console.log(rotateArray([1, 2, 3, 4], 1));
// console.log(rotateArray([1, 2, 3, 4], 2));
// console.log(rotateArray([1, 2, 3], 4));
// console.log(findSecondLargest([10, 20, 30, 40]));
// console.log(findSecondLargest([5, 5, 5]));
// console.log(findSecondLargest([100, 50, 100, 75]));


