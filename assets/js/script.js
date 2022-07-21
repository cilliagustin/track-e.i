// Variables
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const addSection = document.getElementById('add');
const inputs = document.querySelectorAll('#amount, #note, #date, #input-category');
const addExpenseIncomeBtn = document.querySelectorAll('#add .input-container button');
const addLabelCategory = document.querySelectorAll('#add .category-container label');

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
        //Add active class to target
        e.target.classList.add('active');
        let clickedNav = e.target.textContent.toLowerCase();
        sections.forEach(section => {
            //remove hide class to target´s section
            if(section.getAttribute('id')=== clickedNav){
                section.classList.remove('hide')
            }
        })
        //Delete all values for inputs
        inputs.forEach(input => {
            input.value = '';
          });
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


//Filter radio labels in Add section and add income/expense class
addExpenseIncomeBtn.forEach(btn => {
    btn.addEventListener('click', e =>{
        let pressedBtn = e.target.getAttribute('data-button-category')
        //Add income or expense class to add section 
        if(pressedBtn === "income"){
            addSection.classList.add("income");
            addSection.classList.remove("expense");
        } else if (pressedBtn === "expense"){
            addSection.classList.add("expense");
            addSection.classList.remove("income");
        }
        //Add active class to button
        addExpenseIncomeBtn.forEach(btn =>{
            btn.classList.remove('active')
        })
        e.target.classList.add('active')
        //hide all label elements and show only selected ones
        addLabelCategory.forEach(label => {
            if(label.getAttribute('data-radio-category') === pressedBtn){
                label.classList.remove('hide')
            } else {
                label.classList.add('hide')
            }
        })
    })
})