let header = document.querySelector('header');

window.addEventListener('scroll', function(){
    let scrollLength = window.scrollY;
    if (scrollLength > 50){
        header.classList.remove('white');
    }
    if (scrollLength < 50){
        header.classList.add('white');
    }
})