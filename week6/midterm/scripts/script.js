//Create a collection of commanders
const commanders = {};

//Check to see if there are commanders saved



//Check to see if the user entered data
const validData = () => {
    if (document.getElementById("user-first-name").value && document.getElementById("user-birthday").value) {
        return true;
    }
    
    if (!document.getElementById("user-first-name").value) {
        // need to create a modle to show that it needs to be entered
        console.log("Please enter a commander name");
    }
    if (!document.getElementById("user-birthday").value) {
        console.log("Please enter a birthday");
    }

    return false;
}

// create a new commander
const createCommander = () => {
    
    if (validData()) {
        let userFirstName     = document.getElementById("user-first-name").value;
        let userBirthday      = document.getElementById("user-birthday").value;
        let userFavoriteColor = document.getElementById("user-favorite-color").value;
        
        //add the commander to the collection of commanders
        commanders[userFirstName] = { 
            "name"          : userFirstName,
            "birthdate"     : userBirthday,
            "favoriteColor" : userFavoriteColor
        }
        
        console.log(commanders);
        
        showCommandCenter(commanders[userFirstName]);
    }
}

const showCommandCenter = (commander) => {
    
    //hide new uers sign up
    document.getElementById("new-user-sign-up").classList.add("hidden");
    document.getElementById("h1-welcome").classList.add("hidden");
    document.getElementById("command-center").classList.remove("hidden");
    console.log(commander);

    //set commander name
    document.getElementById("commander-name").innerText = commander.name;
}



document.getElementById("btn-command").addEventListener('click', () => createCommander());

// Grid demo
const demoGridContainer = document.getElementById("demo");

const demoButtons = document.querySelectorAll(".button-container button");

function changeLayout(layout, btn) {
  demoGridContainer.classList.remove("layout-one", "layout-two", "layout-three");
  demoGridContainer.classList.add(layout);
  
  demoButtons.forEach(b => b.classList.remove("active"));
  
  btn.classList.add("active");
  console.log(layout);
}
  
let btn1 = document.getElementById("layout1");
let btn2 = document.getElementById("layout2");
let btn3 = document.getElementById("layout3");

btn1.addEventListener("click", (e) => changeLayout("layout-one", e.target));
btn2.addEventListener("click", (e) => changeLayout("layout-two", e.target));
btn3.addEventListener("click", (e) => changeLayout("layout-three", e.target));

//Demo widgets

// Get Weather for SPSCC

// Get date and type of day - count days till weekend, show Pica cho

// Open and close the settings side menu

//set variables 
const settingsMenu = document.getElementById("settings-menu");

//tracks if the menu is closed or open
let menuToggle = true;

//check to see if the menu is open or not.
//this allows users to click on the settings button to open and close the menu
document.getElementById("settings-menu-btn").addEventListener("click", () => {
    if (menuToggle) {
        settingsMenu.classList.add("visible", "slide-right");
        menuToggle = !menuToggle;
    } else {
        settingsMenu.classList.remove("visible");
        menuToggle = !menuToggle;
    }
});

//Close the menu from the close button in the menu
document.getElementById("menu-close").addEventListener("click", () => {
    settingsMenu.classList.remove("visible");
    menuToggle = true;
});

//Close the menu when focus is lost, ie. when user clicks off of the menu
// still working on this, does not work yet
// settingsMenu.addEventListener('blur', () => {
//     settingsMenu.classList.remove("visible");
//     menuToggle = true;
//     console.log("blur");
// });

window.onclick = function(event) {
  if (event.target == settingsMenu) {
    settingsMenu.classList.remove("visible");
    menuToggle = true;
    console.log("blur");
  }
}