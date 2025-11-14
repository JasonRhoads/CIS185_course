# Project Name: Kids in Command
## CIS 185 - Midterm Project
## Author: Jason Rhoads
## Date: 11/13/2025

---

## 1. Project Description
Kids in Command is a dashboard type of interface that helps answer kids most common questions
while allowing them to chose the layout and color scheme of their choice. 
They can also see how many days until their birthday and major holidays

## 2. Target Audience
Kids between the ages of 6 - 12 who ask their parents to check their phone 
to see the weather of when something is coming up

## 3. Main Features
- Feature 1: Users choose their favorite colors
- Feature 2: See the weather in their area using a weather API 
- Feature 3: Know what day it is and how many days until the weekend
- Feature 4: Can add events like vacations and family holidays

## 4. Technologies Used
- HTML5 (semantic structure) 
- CSS3 (styling, animations) 
- JavaScript (dynamic html, form validation)

## 5. File Structure
- index.html - main dynamic page
- help.html - help page that has not been completed, not currently linked to.  
- css/style.css - Main stylesheet 
- scripts/ - JavaScript directorty contains component type files
- main.js - main JavaScript file that connects all of the other files together
- settings-menu.js - side menu that has all of the user customizations
- *-widget.js - the api/programming for each widget that has been implemented
- grid-demo.js - the code used for the inital demo section before a user signs up
- command-center.js - the command center that houses the widgets after user sign up
- us-holidays.json - JSON file that contains the most commong US holidays
- script.js - original script file before components were seperated into files, not currently in use
- images/ - contains wire frames for the project

## 6. Challenges Faced
This was the most AI I have used in a project. After getting a response, I would implement the code
and make any changes that were necessary. The AI would give me some CSS that would not alway fit the way I envisioned
the project. To fix this I took some stylings and ideas from the previous assignments to get the design how I want.
When the AI would give me a potential fix it did not always work and so I had to look into the code and inspector to find 
out what was happening. 
Everytime I would enter a new prompt in ChatGPT it would process it and freeze. 
I would have to wait for the page to become unresponsive and kill it before reloading.
Having the AI guide me vs me guiding the AI was a big challenge. After every answer to a prompt, the AI would ask me questions on what it should do next and give a list of options. Sometimes I went with them but most of the time I told it to do something else. 

## 7. AI Tools Used
ChatGPT: 
 - Created a JSON file with a list of common US holidays.
 - Help with button functionality to change the grid layout.
 - Help with weather api call and data display.
 - Help with current date and count down to weekend with progress bar
 - Help with holiday countdown list
 - File structure. Main script file was getting too long so broke it down into components
 - CSS clean up. 


## 8. Future Improvements
- Allow users to drag and drop widgets.
- Build out help page with some sort of tutorial.
- Allow users to enter in ZIP codes instead of coordinates  
- Create presets for other users to see what I prefer and what my kids prefer

## 9. Credits
- [weather.gov](https://api.weather.gov/) The weather api I used 
- [w3schools](https://www.w3schools.com/cssref/pr_grid-template-areas.php) Learning about grid layouts
- [Codepen](https://codepen.io/jasonrhoads1/pen/VYeGGQJ) I was messing around with changing layouts
- [Lucid Chart](https://lucid.app/) used to create wire frames
- ChatGPT: The rest of my usage was with ChatGPT