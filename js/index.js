// Your code goes here
// 1. Change background color on DOMContentLoaded
const changeBgColor = function(elem, newColor) {
    elem.style.backgroundColor = newColor;
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', e => {
        console.log('loaded');
        changeBgColor(document.querySelector('body'), '#39ff14');
    });
} else {
    changeBgColor(document.body, '#39ff14');
}

// 2. Change back to white 5 seconds after page fully loaded
window.addEventListener('load', e => {
    setTimeout(function() {
        changeBgColor(document.querySelector('body'), 'white');
    }, 2500);
});

// 3. Rotate whole page when dblclick anywhere on document
document.querySelector('body').addEventListener('dblclick', e => {
    e.currentTarget.style.transition = 'all 1s';
    e.currentTarget.style.transform = 'rotate(360deg)';
    setTimeout(function() {
        document.body.style.transition = null;
        document.body.style.transform = null;
    }, 1100);
});

// 4. Make entire page disappear on pressing enter
// Make sure body has opacity property
let body = document.querySelector('body');
body.style.opacity = 1;
document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        body.style.opacity = (body.style.opacity === '1') ? '0' : '1';
        e.preventDefault();
    }
});

// 5. Shuffle nav items order on mouseover
/**
 * Randomly shuffle an array according to Fisher-Yates algorithm
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array // ??? it returns the shuffled array
 */
const shuffle = function (array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Select parent nav element and add handler
const nav = document.querySelector('.nav').addEventListener('mouseenter', e => {
    // Select nav items and convert to array
    const target = e.target;
    const links = [...target.querySelectorAll('.nav-link')];
    shuffle(links);
    target.innerHTML = '';
    links.forEach(link => target.appendChild(link));
});

// 6. Tile image as page background on dblclick
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', e => {
        e.stopPropagation();
        if (document.querySelector('body').style.backgroundImage != `url(${e.target.src})`) {
            document.body.style.backgroundImage = `url(${e.target.src})`;
        }
    });

    img.addEventListener('dblclick', e => e.stopPropagation());
});

// 7. Clear with ESC key
document.querySelector('body').addEventListener('keydown', e => {
    if (e.key === 'Escape') document.body.style.backgroundImage = '';
});

// 8. Get text when selected by mouse and alert it
document.querySelectorAll('p').forEach(para => {
    para.addEventListener('mouseup', e => {
        if (e.target.tagName.toLowerCase() === 'p') {
            if (getSelection().toString() != '') {
                alert(getSelection().toString());
            }
        }
    });
    // Keep double click from triggering both alert and above-defined rotation
    para.addEventListener('dblclick', e => e.stopPropagation());
}, true);
