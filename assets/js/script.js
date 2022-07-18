const navLinks = Array.from(document.getElementsByClassName('nav-link'));

navLinks.forEach(link =>{
    link.addEventListener('click', function changeSection(e){
        navLinks.forEach(link => {
            link.classList.remove('active')
        })
        e.target.classList.add('active')
    })
})