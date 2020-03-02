console.log('Hello TypeScript');

const button = document.querySelector('button')!; // <- This "!" sign is very useful

button.addEventListener('click', (e) => {
    console.log(e);
});