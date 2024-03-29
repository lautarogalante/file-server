import '../styles/SwitchButton.css'

const handleSwitchButton = () => {
    const body = document.querySelector('body');
    const toggle = document.getElementById('toggle');
    const leftBar = document.getElementById('left-bar');
    const optBar = document.getElementById('opt-bar');
    const logo = document.getElementById('logo');
    if (toggle && body && leftBar && optBar && logo) {
        toggle.classList.toggle('active');
        body.classList.toggle('active');
        leftBar.classList.toggle('active');
        optBar.classList.toggle('active');
        logo.classList.toggle('active')
    }
}

export const SwitchButton = () => {
    return (
        <div className="switch-cont">
            <div onClick={handleSwitchButton} id="toggle">
                <i className="indicator"></i>
            </div>
        </div>
    );
}