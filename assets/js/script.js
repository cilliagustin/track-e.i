// Variables
const navLinks = Array.from(document.getElementsByClassName('nav-link'));
const sections = Array.from(document.getElementsByTagName('section'));

/**
 * Removes active class from all navbar elements and add class hide
 * to all sections
 */
function blockNavAndSections(){
    navLinks.forEach(link => {
        link.classList.remove('active')
    })
    sections.forEach(section => {
        section.classList.add('hide')
    })
}

//Toggle between sections and change active class in navbar
navLinks.forEach(link =>{
    link.addEventListener('click', function changeSection(e){
        blockNavAndSections();
        e.target.classList.add('active');
        let clickedNav = e.target.textContent.toLowerCase();
        sections.forEach(section => {
            if(section.getAttribute('id')=== clickedNav){
                section.classList.remove('hide')
            }
        })
    })
})

//Check once the browser goes to desktop size if the current section is the add section
//and gives the active class to balance
window.addEventListener('resize', function changeToDesktop(){
    if(this.window.innerWidth >= 767 && navLinks[2].classList.contains('active')){
        blockNavAndSections();
        navLinks[0].classList.add('active');
        sections[0].classList.remove('hide')
    }
})

