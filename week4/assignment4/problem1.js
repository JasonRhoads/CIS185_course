// Problem 1: Temperature Converter Suite
// Your Name: Jason Rhoads
// Date: 10/16/2025

// Complete these functions

function celsiusToFahrenheit(celsius) {
    // Convert Celsius to Fahrenheit
    // Formula: (C × 9/5) + 32
    return (celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    // Convert Fahrenheit to Celsius
    // Formula: (F - 32) × 5/9
    return (fahrenheit - 32) * 5 / 9;
}

function getTemperatureDescription(fahrenheit) {
    // Return description based on temperature:
    // Below 32: "Freezing"
    // 32-50: "Cold"
    // 51-70: "Cool"
    // 71-85: "Warm"
    // Above 85: "Hot"
    if (fahrenheit < 32) {
        return "Freezing";
    } 
    else if (fahrenheit <= 50) {
        return "Cold";
    }
    else if (fahrenheit <= 70) {
        return "Cool";
    } else if (fahrenheit <= 85) {
        return "Warm";
    } else if(fahrenheit > 85) {
        return "Hot";
    } else {
        return "Invalid temperature given. please run again with valid temperature";
    }
}

//Tests
// console.log(celsiusToFahrenheit(0));
// console.log(celsiusToFahrenheit(100));
// console.log(celsiusToFahrenheit(-40));
// console.log(fahrenheitToCelsius(32));
// console.log(fahrenheitToCelsius(68));
// console.log(fahrenheitToCelsius(212));
// console.log(getTemperatureDescription(25));
// console.log(getTemperatureDescription(75));
// console.log(getTemperatureDescription(95));