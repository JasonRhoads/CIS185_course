# Manual vs Bootstrap Implementation

**Student Name:** Jason Rhoads  
**Course:** CIS 185 
**Assignment Two:** Manual vs Bootstrap Implementation  
**Date:** 10/16/2025

## Project Overview
Create two version of my portfolio. A manual response design and a Bootstrap responsive design

## Version 1: Manual Responsive Design
### `@media` queries, Flexible images, Viewport Units, Css Grid and Flexbox
**Purpose:** Have tags apply when the screen is at a specific size  
**How I used it:** There are 3 media queries used for mobile tablet and desktop

**Why it's useful:** This creates the proper experience for users on any device

### Example
```css
.main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 7svh;
    width: 100%;
}

.main-nav a, button, .footer-nav a, .nav-item a {
    color: #f1f1f1;
    display: block;
    text-decoration: none;
    padding: 0px 15px;
    font-size: 2rem;
    transition: all 0.5s ease-in-out;
}
.nav-links {
    display: flex;
    justify-content: space-evenly;
    transition: all 0.5s ease-in-out;
}

.main-nav div a ~ a {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
}
.menu-toggle {
    display: none;
    color: #f1f1f1;
    font-size: 1.8rem;
    cursor: pointer;
}

.about img {
        max-width: 500px;
    }

@media screen and (max-width: 767px) { 
    section {
        min-width: 320px;
        max-width: 767px;
    }

    .main-nav {
        min-width: 320px;
        max-width: 767px;
        width: 100%;
    }

    .nav-links {
        background-color: #2e2e2e;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 60px;
        min-width: 320px;
        max-width: 767px;
        width: 100%;
        opacity: 0;
        text-align: right;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        visibility: hidden;
    }

    .nav-links a {
        padding-right: 10%;
    }
    
    .main-nav div a ~ a {
        border-top: 1px solid #f1f1f1;
        border-left: none;
    }

    .nav-links.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .menu-toggle {
        display: block; /* show hamburger icon */
        padding-right: 10%;
        transition: all 0.5s ease-in-out;
    }
}
```

## Version 2: Bootstrap Responsive Design
### Containers, columns, utilities
**Purpose:** Apply bootstrap styles through set classes  
**How I used it:** I removed the regular classes and used bootstrap classes

**Why it's useful:** This creates a standard set of classes to use that will adjust accoring to the screen size without having to use explicit media queries.

### Example
```html
    <section class="container-fluid text-center p-5 bg-white text-dark w-100" id="hero">
        <div class="row align-items-center">
            <div class="col-md-5">
            <img
                src="images/JasonRhoads.JPG"
                alt="Portrait of Jason Rhoads"
                class="img-fluid rounded-circle"
            >
            </div>
            <div class="col-md-7">
                <h1>Jason Rhoads</h1>
                <p class="lead m-auto w-75">
                    A passionate software developer who loves turning ideas into functional applications.
                    When he’s not coding in C# or experimenting with JavaScript frameworks, Jason enjoys
                    exploring emerging tech trends and finding creative ways to solve problems.
                </p>
            </div>
        </div>
    </section>
```

## Learning Outcomes

This assignemnt helped me learn:

1. **Media Queries** - Getting the design just right for every screen size
2. **Interactive Elements** - CSS hover and animations to create unique effects that are appropriate for screen size.
3. **Bootstrap Styling** - How to style elements with bootstrap to get the design how I want.
4. **CSS integration** - Trying to keep the styling I created in version one to apply buy have bootstrap deal with the responsiveness and structure

## Challenges Encountered

- **Bootstrap**: I had to look into a tutorial and a lot of classes to find the right ones
- **Bootstrap Media Queries**: I still had to use a manual media query with bootstrap to get the page to have some animations. 
- **Design**: Making sure the design looks good and similar for both versions on all 3 screen sizes 

## Resources Used

- [Get Started with Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Fontawesome](https://fontawesome.com/icons)
- [W3Schools Media Queries](https://www.w3schools.com/css/css3_mediaqueries.asp)

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
