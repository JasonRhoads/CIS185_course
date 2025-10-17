// Problem 3: Grade Calculator
// Your Name: Jason Rhoads
// Date: 10/17/2025

// Complete these functions

function calculateAverage(scores) {
    // Calculate and return the average of an array of scores
    // Handle empty array case (return 0)
    //Guard statement to see if scores is empty. Used to avoid getting NaN for an empty array
    if (!scores.length)
        return 0;

    let average = 0;
    let scoreTotal = 0;

    //loop though the scores to get the total
    for (let i = 0; i < scores.length; i++) {
        scoreTotal += scores[i];
    }

    //divide the total by the number of scores to get the average
    average = scoreTotal / scores.length;

    return average
}

function dropLowestScore(scores) {
    // Return a new array with the lowest score removed
    // If multiple lowest scores exist, remove only one
    // Don't modify the original array!
    
    //Guard statement to see if scores is empty.
    if (!scores.length)
        return [];

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

    //Guard statement to make sure a score was entered and is valid
    if (!score || score < 0 || score > 100) {
        console.log("Please enter a valid score. 0 - 100")
        return 0;
    }

    //Declare the letter and percents
    let letterGrade = ["A", "B", "C", "D", "F"];
    let gradePercent = [90, 80, 70, 60, 0];

    // Loop through gradePercent to see where their score lies
    // return appropriate grade
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
        console.log("Please enter an array of scores")
        return [];
    }   

    // Guard statement to make sure a curve amount was entered and is valid
    if (!curveAmount || curveAmount < 0) {
        console.log("Please enter a curve amount. ie 0 - 10")
        return 0;
    }

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
// console.log(dropLowestScore([80, 90, 70, 85]));
// console.log(dropLowestScore([50, 50, 75, 100]));
// console.log(getLetterGrade(95));
// console.log(getLetterGrade(82));
// console.log(getLetterGrade(58));
// console.log(curveGrades([85, 95, 70], 10));
// console.log(curveGrades([90, 96, 80], 5));