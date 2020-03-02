console.log('Hello TypeScript');

const button = document.querySelector('button');

if (button) {
    // Ok to do this
    button.addEventListener('click', (e) => {
        console.log(e);
    });
}