let data = []

//Create data from each transaction
submit.addEventListener('click', (e)=>{
    e.preventDefault
    let a = inputAmount.value;
    let b = inputNote.value;
    let c = inputDate.value;
    let d = inputCategory.value;
    //Check that all inputs are correctly filled
    if(a < 0.01) {
        alert("Amount must be at least 1 cent")
    } else if (a == null || a == "" || b == null || b == "" || c == null || c == "" || d == null || d == ""){
        alert("Please complete all the fields")} 
        else {
            let obj = {}
            if(addSection.classList.contains('income')){
                obj.transactionType = "income";
            } else if(addSection.classList.contains('expense')){
                obj.transactionType = "expense";
            }
            obj.amount = a;
            obj.note = b;
            obj.date = c;
            obj.categoty = d;
            data.push(obj)
            console.log(data)

            deleteValues(inputs)
            inputCategory.classList.remove('active')
            uncheckRadioInputs(addRadioInput)
        }
})

