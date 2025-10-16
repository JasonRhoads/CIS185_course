# Personal Portfolio Page

**Student Name:** Jason Rhoads  
**Course:** CIS 185 
**Assignment Two:** Personal Portfolio Page  
**Date:** 10/09/2025

## Project Overview
Create a single-page personal portfolio.
Use external CSS file (no inline/embedded styles).
Include at least 3 sections (header, about, projects).
Use Flexbox OR Grid for layout.
Follow accessibility guidelines (proper contrast).
Include custom CSS variables for colors/spacing.
README should indicate where and how Flexbox, Grid, are impliment.

## HTML Elements Implemented
### `<header>` `<main>` `<section>` `<footer>`
**Purpose:** Seperate the page into semantic sections  
**How I used it:** 
 - `<header>` at the top of the page with the navigation `<nav>` 
 - `<main>` shows the main content of the page
 - `<section>` divides the `<main>` into content sections
 - `<footer>` the bottom of the page with navigation and some additional information

**Why it's useful:** Using semantic tages is helpful for human readability and accessability for screen readers 

## CSS Elements Implemented
### 1. `flex` 
**Purpose:** Control the flow of content in one direction  
**How I used it:** 
 - top navigation to seperate the home icon and the links 
 - hero section to center and align the text in the hero section
 - cards - the order of cards as well as the content of the cards 

**Why it's useful:** This helps control how the content of a section will look horizontally or vertically


### Example
```css
.main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.hero {
    align-items: center;
    background: #f1f1f1;
    display: flex;
    justify-content: center;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    justify-content: center;
    margin: auto;
    max-width: 90%;
    padding: 60px 0;
    width: 100%;
}
```

### 2. `grid` 
**Purpose:** Control the flow of content in two directions
**How I used it:** 
 - body - the basic structure of the page
 - hero - creates a 1 row by 2 column grid
 - about - a simple 1 row by 2 column grid
 - footer - a 2 column grid the first column is one row and the second column is 4 rows
 
**Why it's useful:** This helps control how the content of a section will look both horizontally and vertically 

 #### Example
 ```css
    body {
        display: grid;
        grid-template-rows: auto 1fr auto; 
        grid-template-columns: 1fr;  
    }

    .hero-container {
        display: grid;
        grid-template-columns: repeat(2, 600px); /* 2 columns */
        grid-template-rows: 1fr; /* 1 row initially */
        gap: 10px;
        padding: 140px 0;
    }

    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 10px;
        align-content: center;
        justify-content: center;
        justify-self: center;
    }

    footer p {
        align-content: center;
        grid-row: 1 / 3; /* spans all 3 rows */
        padding: 10px;
    }
 ```

 ### 3. Styles
**Purpose:** Create a unique experience for users  
**How I used it:** I have animations, hover effects, and button effects

**Why it's useful:** If I can create a unique experience then users will stay on the page longer and try to work with me


### Example
```css
    .hero:hover .hero-img, #hero:hover img{
        animation: rotate 2s;
        animation-iteration-count: 1;
        border-radius: 0% !important;
        z-index: 11;
    }

    @keyframes rotate {
        0% {transform: rotate(0deg);}
        10% {transform: rotate(10deg);}
        50% {transform: rotate(-10deg);}
        100% {transform: rotate(0deg);}
    }

    .grid-container, #about div{
        scale: 0.8;
        transition: all 0.5s ease-in-out;
    }

    .about:hover .grid-container, #about:hover div {
        scale: .95;
    }

    .main-nav a:hover, 
    button:hover, 
    .footer-nav a:hover, 
    nav-item:hover, .btn:hover, 
    .bootstrap footer a:hover,
    .navbar-brand:hover {
        background: white;
        color: black;
        box-shadow: 0 0 5px   white,
                    0 0 25px  white,
                    0 0 50px  white,
                    0 0 200px white;
        -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
    }
```

## Learning Outcomes

This assignemnt helped me learn:

1. **Semantic HTML importance** - Structuing the DOM in a human readable and accessable way.
2. **Interactive Elements** - CSS hover and animations to create unique effects.
3. **CSS Styling** - How to style elements so they stand out from other sites.
4. **CSS Integration** - How to link an external style sheet as well as one from the web.

## Challenges Encountered

- **Grid**: I had to look into a tutorial to be able to incorporate grid effectively
- **Accessibility**: Making sure the colors have enough contrast
- **Design**: Making sure the CSS elements work how I envision. 

## Resources Used

- [W3Schools HTML Tutorial](https://www.w3schools.com/html/default.asp)
- [MDN Grid Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)
- [W3Schools Box Shadow](https://www.w3schools.com/cssref/css3_pr_box-shadow.php)

## Files Included

- `index.html` - Main HTML file with all implemented elements
- `css\styles.css` - External CSS file
- `images\` - Multiple images
- `README.md` - This documentation file

## How to View

1. Clone this repository
2. Have access to all of the related files
3. Open `index.html` in any modern web browser
4. Interact with the various elements to see their functionality

---