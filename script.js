console.log("JavaScript is connected!");

// Wrap everything in a DOMContentLoaded event — 
// this tells JS to wait until the full page is loaded before running
document.addEventListener('DOMContentLoaded', function () {

// --------------------------------
// 1. SELECTING ELEMENTS
// --------------------------------

// document.querySelector finds the FIRST element matching a CSS selector
// It's like saying "go find this element on the page and give it to me"

const heading = document.querySelector('#about h1');
const navLinks = document.querySelectorAll('.nav-links a');

// Log them to see what you got
console.log(heading);           //prints h1 element
console.log(navLinks);         // prints all 3 nav links


// --------------------------------
// 2. CHANGING ELEMENTS
// --------------------------------

// Once you have an element, you can change it's content and style
// .textContent = the text inside the tag
// .style.property = any CSS property

heading.style.color = '#ff6b6b';   // temporarily turns name red
setTimeout(() => {
    heading.style.color = '';        // resets after 2 secs
}, 2000);


// -------------------------------------
// 3. REACTING TO USER ACTIONS (EVENTS)
// -------------------------------------

// addEventListener listens for something to happen
// 'click', 'scroll', 'mouseover', 'keydown' - these are event types

navLinks.forEach(link => {
    link.addEventListener('click', function() 
    {
        console.log('You clicked: ' + this.textContent);
    });
});


// Challenge 1
// When the user press 'D' key, change the browser tab title
// When they press 'R', reset it back

document.addEventListener('keydown', function (event) {
    console.log('Key pressed: ', event.key);

    if (event.key === 'd' || event.key === 'D') {
        document.title = 'Hey, come back!';
        heading.textContent = 'I am not';
        heading.style.pointerEvents = 'none';
    }

    if (event.key === 'r' || event.key === 'R') {
        document.title = 'My Portfolio';
        heading.textContent = "Hi, I'm Mohammad Aquib";
        heading.style.pointerEvents = 'auto';
    }
});


// Challenge 2
// Click your h1 name to toggle between your name and a fun message

heading.addEventListener('click', function () {
    if (heading.textContent === 'Hi, I\'m Mohammad Aquib') {
        heading.textContent = 'Future AI engineer!!!';
        heading.style.color = '#7c6df0';
    } else {
        heading.textContent = 'Hi, I\'m Mohammad Aquib';
        heading.style.color = '#ffffff';
    }
});
// To make heading look clickable
heading.style.cursor = 'pointer';


// Challenge 3
// When you click a nav link, highlight it purple
// and remove the highlight from all others

navLinks.forEach(function (link) {
    link.addEventListener('click', function() {
        // First remove highlight from all links
        navLinks.forEach(function (l) {
            l.style.color = '#e0e0e0';
            l.style.fontWeight = '400';
        });

        //Then highlight only the clicked one
        this.style.color = '#7c6df0';
        this.style.fontWeight = '700';
    });
});


// Challenge 4
// Track how many times the contact link is clicked
// and show it on the page

let clickCount = 0; //A variable that persists
const contactLink = document.querySelector('a[href="#contact"]');
const aboutSection = document.querySelector('#about p');

contactLink.addEventListener('click', function () {
    clickCount = clickCount + 1;        //increament

    //update the paragraph text to show the count
    aboutSection.textContent = 'You have clicked Contact ' + clickCount + 'time(s)';

    console.log('Contact clciked', clickCount, 'times');
})


// Challenge 5 - I have to do it my own each and every line(waise baaki bhi maine khud hi kiya hai)
// When you click a project list item, it should:
// 1. Change its background to #7c6df0
// 2. Change its text color to white
// 3. After 1 second, go back to its original colors

const projectItems = document.querySelectorAll('#projects li');

projectItems.forEach(function (item) {
    item.addEventListener('click', function () {
        this.style.background = '#7c6df0';
        this.style.color = '#ffffff';
        setTimeout(() => {
            item.style.background = ''; //arrow functions don't have their own 'this'
            item.style.color = '';
        }, 1000);
    });
 
});


// ---------------------------------------
// TYPEWRITER EFFECT
// ---------------------------------------
// querySelector('#about h1') might be running before the browser has fully loaded your HTML. 
// So it finds nothing, crashes silently, and nothing works.

    

const fullName = "Hi, I'm Mohammad Aquib";     //the text to type out
const nameElement = document.querySelector('#about h1');   // my h1
const cursor = '|';

// step 1 - clear the h1 so it starts empty
nameElement.textContent = '';

// step 2 - keep track of which letter we are on
let letterIndex = 0;

// Step 3 - this function types ONE letter, then calls itself again
function typeLetter() {
    
    // check there are still letters to type
    if (letterIndex < fullName.length) {
        // add the next letter to whatever is already there
        nameElement.textContent += fullName[letterIndex];

        // move to the next letter
        letterIndex++;

        // call this same function again after 120 milliseconds
        setTimeout(typeLetter, 120);
    }else {
      let isTypingDone = true;
      blinkCursor();
    }
}

// to blink cursor after typing and also remove it after 3 seconds
function blinkCursor() {
//     if (!isTypingDone) return;
//     if (nameElement.textContent.endsWith(cursor)) {
//       nameElement.textContent = fullName;
//     } else {
//       nameElement.textContent = fullName + cursor;
//     }
//     setTimeout(blinkCursor, 500);   // In this cursor blinks forever
//   }

//The fix is to use setInterval instead of setTimeout
let visible = true;

//setInterval runs repeatedly every 500ms - unlike setTimeout which runs once
const blink = setInterval(function() {
    if (visible) {
        nameElement.textContent = fullName + cursor; // show cursor    
    } else {
        nameElement.textContent = fullName; //hide cursor
    }
    visible = !visible; //flip between true and false
}, 500);

// stop blinking after 3 seconds and leave name clean
setTimeout(function () {
    clearInterval(blink);      //stops the interval
    nameElement.textContent = fullName; // final clean name
}, 3000);
}

// step 4 - start the effect
typeLetter();

//Challenge 6 - Add progress bar

// step 1 - create the bar element from JavaScript
const progressBar = document.createElement('div');

// Step 2 - style it
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '3px';
progressBar.style.width = '0%';
progressBar.style.background = '#7c6df0';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.1s';

// Step 3 - add it to the page
document.body.appendChild(progressBar);

// Step 4 - update width on scroll
window.addEventListener('scroll', function () {
    
    // how far have we scrolled
    const scrolled = window.scrollY;

    // total scrollable height
    const total = document.body.scrollHeight - window.innerHeight;

    // prcentage scrolled
    const percentage = (scrolled / total) * 100;
    progressBar.style.width = percentage + '%' ;
});


// Challenge 7 - Dark / Light mode toggle

const themeBtn = document.getElementById('theme-btn');

themeBtn.addEventListener('click', function () {
    
    // Toggle the light class of body
    document.body.classList.toggle('light');

    // update button text depending on current mode
    if (document.body.classList.contains('light')) {
        themeBtn.textContent = '🌙 Dark';
    }else {
        themeBtn.textContent = '☀️ Light';
    }
});

});