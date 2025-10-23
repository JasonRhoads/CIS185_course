// Problem 3: Grade Calculator
// Your Name: Jason Rhoads
// Date: 10/17/2025

// Complete these functions

function calculateAverage(scores) {
    // Calculate and return the average of an array of scores
    // Handle empty array case (return 0)

    //Handle an empty array. Used to avoid getting NaN for an empty array
    if (!scores.length)
        return 0;

    // Guard statement to check to see if the array of scores are numbers and positive
    if (!scores.every(score => typeof score === "number" && score >= 0)) {
        return "Please enter an array of valid scores ex [10, 20, 30, 40]";
    }

    // declare scoreTotal
    let scoreTotal = 0;

    //loop though the scores to get the total
    for (let i = 0; i < scores.length; i++) {
        scoreTotal += scores[i];
    }

    //divide the total by the number of scores to get the average
    return scoreTotal / scores.length;

}

function dropLowestScore(scores) {
    // Return a new array with the lowest score removed
    // If multiple lowest scores exist, remove only one
    // Don't modify the original array!
    
    //Guard statement to see if scores is empty.
    if (!scores.length)
        return [];

    // Guard statement to check to see if the array of scores are numbers and positive
    if (!scores.every(score => typeof score === "number" && score >= 0)) {
        return "Please enter an array of valid scores ex [10, 20, 30, 40]";
    }

    //declare variables
    //set the lowestScore to the first valuse of the array;
    let lowestScore = scores[0];

    //copy the scores array into NewScores
    let newScores = scores;

    //Loop through the array to find the lowest score
    for (let i = 1; i < scores.length; i++) {
        if (scores[i] < lowestScore) {
            lowestScore = scores[i];
        }
    }

    //Get the index of the lowest score
    let index = newScores.indexOf(lowestScore);

    //remove the lowest score. still maintain the order of remaining numbers.
    newScores.splice(index, 1);

    return newScores;

}

function getLetterGrade(score) {
    // Return letter grade based on score

    //Guard statement to make sure a score is a valid number and within range
    // Had to set it up this way due it not working as one condition
    if (typeof score === "number") {
        if (score < 0 || score > 100) {
            return "Please enter a valid score. 0 - 100";
        }
    }
    else {
        return "Please enter a valid score. 0 - 100";
    }
    //Declare the letter and percents
    let letterGrade = ["A", "B", "C", "D", "F"];
    let gradePercent = [90, 80, 70, 60, 0];

    // Loop through gradePercent to see where their score lies
    // return appropriate grade
    // Ex. loop though gradePercent and see if score is greater or equal to 90
    // If this is true return the letterGrade of the same index
    // On the second iteration the score is 89 or less and then 80 is checked etc. 
    for (let i = 0; i < gradePercent.length; i++) {
        if (score >= gradePercent[i]) {
            return letterGrade[i];
        }
    }

}

function curveGrades(scores, curveAmount) {
    // Add curveAmount to each score
    // Cap all scores at 100 (no score above 100)
    // Return new array, don't modify original

    // Guard statement to see if scores is empty.
    if (!scores.length) {
        return "Please enter an array of scores ex [10, 20, 30, 40]";
    }   

    // Guard statement to check to see if the array of scores are numbers and positive
    if (!scores.every(score => typeof score === "number" && score >= 0)) {
        return "Please enter an array of valid scores ex [10, 20, 30, 40]";
    }

    // Guard statement to make sure a curve amount was entered and is valid
    // Had to set it up this way because was not working as an && or || test condition
    if (typeof curveAmount === "number") {
        if (curveAmount < 0) 
            return "Please enter a curve amount. ie 0 - 10";
    }
    else
        return "Please enter a curve amount. ie 0 - 10";

    // Declare variables
    let newScores = scores;

    //loop through new scores to add the curve value
    for (let i = 0; i < newScores.length; i++) {
        //check to see if the new value is over 100. if it is then set it to 100
        //otherwise add the curve amount.
        newScores[i] + curveAmount >= 100 ?
            newScores[i] = 100 :
            newScores[i] += curveAmount;
    }

    return newScores;

}
//Tests

// console.log(calculateAverage([80, 90, 70]));
// console.log(calculateAverage([100, 50, 75]));
// console.log(calculateAverage([]));
// console.log(calculateAverage([100, -50, 75]));
// console.log(calculateAverage(["A", 50, 75]));
// console.log(dropLowestScore([80, 90, 70, 85]));
// console.log(dropLowestScore([50, 50, 75, 100]));
// console.log(dropLowestScore(["a", 90, 70, 85]));
// console.log(dropLowestScore([50, 50, -75, 100]));
// console.log(getLetterGrade(95));
// console.log(getLetterGrade(82));
// console.log(getLetterGrade(58));
// console.log(getLetterGrade("A"));
// console.log(getLetterGrade(-58));
// console.log(curveGrades([85, 95, 70], 10));
// console.log(curveGrades([90, 96, 80], 5));
// console.log(curveGrades([90, -96, 80], 5));
// console.log(curveGrades(["A", 1, 2], 10));
// console.log(curveGrades([90, 96, 80], -5));
// console.log(curveGrades([90, 96, 80], "a"));