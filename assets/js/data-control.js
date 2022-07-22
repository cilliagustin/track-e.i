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
        createData(a,b,c,d)
        
}
})

function createData(a, b, c, d){
    //Create an object
    let obj = {}
    //Add income/expense property as transaction type to the object
    if(addSection.classList.contains('income')){
        obj.transactionType = "income";
    } else if(addSection.classList.contains('expense')){
        obj.transactionType = "expense";
    }
    //Add the time stamp as a transaction ID
    obj.transactionId = Date.now();
    //Add amount, note, date and category to object
    obj.amount = a;
    obj.note = b;
    obj.date = c;
    obj.categoty = d;
    //push the object to the data Array
    data.push(obj)
    console.log(data)
    //Clean inputs but mantain current transaction type
    deleteValues(inputs)
    inputCategory.classList.remove('active')
    uncheckRadioInputs(addRadioInput)
}

