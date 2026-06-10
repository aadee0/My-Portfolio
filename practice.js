
document.addEventListener('DOMContentLoaded', function () {
   
    console.log("Java Script saying Hii!");


    const heading = document.querySelector('#home h1');
    // Light mode switch
    const modeBtn = document.getElementById('mode-btn');

    modeBtn.addEventListener('click', function () {
        
        //Toggle light body
        document.body.classList.toggle('light');

        //Update button text on current mode
        if (document.body.classList.contains('light')) {
            //change text
            modeBtn.textContent = '🌚Dark Mode';
        } else {
            modeBtn.textContent = '💡Light Mode';            
        }
    });

    //Typewriter Effect

    const fullName = 'This is my practice time';
    const nameElement = document.querySelector('#home h1');
    const cursor = '|';

    nameElement.textContent = '';
    let letterIndex = 0;

    function typeLetter() {
        if (letterIndex < fullName.length) {
            nameElement.textContent += fullName[letterIndex];
            letterIndex++;
            setTimeout(typeLetter, 120);
        } else {
            let isTypingDone = true;
            blinkCursor();
        }
    }
     typeLetter();


     // Scroll Progress Bar
    const progressBar = document.createElement('div');

    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.width = '0';
    progressBar.style.background = '#178582';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s';

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;

        const total = document.body.scrollHeight - window.innerHeight;

        const percentage = (scrolled / total) * 100;

        progressBar.style.width = percentage + '%';
    });

    // Keypress easter egg — 
    // press a secret key to change the page title and h1
    document.addEventListener('keydown', function (event) {
        console.log('Key pressed: ', event.key);
        if (event.key === 'e' || event.key === 'E') {
            document.title = 'Gotten Morgen!';
            heading.textContent = 'Milch, bitte!';
        }
        if (event.key === 'r' || event.key === 'R') {
            document.title = 'Practice Site';
            heading.textContent = 'This is my practice time';
        }
    });

    //Click a about/work card — it flashes your accent colour then resets after 800ms 
    const aboutItem = document.querySelectorAll('#about li');
    const workItem = document.querySelectorAll('#work li');

    aboutItem.forEach(function (item) {
        item.addEventListener('click', function () {
            this.style.background = '#178582';
            this.style.color = '#ccc';
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
            }, 800);
        });
    });

    workItem.forEach(function (item) {
        item.addEventListener('click', function () {
            this.style.background = '#0FFCBE';
            this.style.color = '#111111';
            setTimeout(() => {
                item.style.background = '';
                item.style.color = '';
            }, 600);
        });
    });

    // Tooltip creation
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Click to Flash!';
    tooltip.style.position = 'fixed';
    tooltip.style.background = '#0d9488';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '5px';
    tooltip.style.padding = '6px 12px';
    tooltip.style.fontSize = '12px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';  //hidden by default
    document.body.appendChild(tooltip);

    aboutItem.forEach(function (item) {
        item.addEventListener('mouseover', function (event) {
            console.log(event.clientX);
            tooltip.style.top = event.clientY + 10 + 'px';
            tooltip.style.left = event.clientX + 10 + 'px';
            tooltip.style.display = 'block'; //show tooltip
        });
        item.addEventListener('mouseout', function () {
            tooltip.style.display = 'none'; // hide tooltip
        });
    });

    
});