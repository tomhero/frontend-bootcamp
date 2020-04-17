// NOTE : Issue on IOS | Performance issue
// window.addEventListener('scroll', () => {
//     console.log('scrolling...');
// });

const scroller = window.requestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000 / 60) };

const elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {
    elementsToShow.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('is-visible');
        } else {
            el.classList.remove('is-visible');
        }
    });

    scroller(loop);
}
loop();


function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

    var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    return (
           (rect.left >= 0)
        && (rect.top >= 0)
        && ((rect.left + rect.width) <= windowWidth)
        && ((rect.top + rect.height) <= windowHeight)
    );
}