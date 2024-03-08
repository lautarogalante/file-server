const downloadCont = document.querySelector('.download-cont') as HTMLElement;

function toggleAnimationClass() {
    
    if (downloadCont) {
        const screenWidth = window.innerWidth;
        const downloadContWidth = downloadCont.clientWidth;
        const centerPosition = (screenWidth - downloadContWidth) / 2;
        if (window.innerWidth <= 768) {
            downloadCont.style.left = centerPosition + 'px';
            downloadCont.classList.remove('animation-slide-right');
            downloadCont.classList.add('animation-slide-up');
        } else {
            downloadCont.style.left = '';
            downloadCont.classList.remove('animation-slide-up');
            downloadCont.classList.add('animation-slide-right');
        }
    }
}

toggleAnimationClass();
window.addEventListener('resize', toggleAnimationClass);