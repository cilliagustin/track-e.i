let data = []
let dataByDate

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
        dataByDate = groupBy('date', data)
        console.log(dataByDate)
        populateCalendar(dataByDate)
}
})

function createData(a, b, c, d){
    //Create an object
    let obj = {}
    //Add income/expense property as transaction type to the object
    if(addSection.classList.contains('income')){
        obj.type = "income";
    } else if(addSection.classList.contains('expense')){
        obj.type = "expense";
    }
    //Add the time stamp as a transaction ID
    obj.timeStamp = Date.now();
    //Add amount, note, date and category to object
    obj.amount = a;
    obj.note = b;
    obj.date = c;
    obj.category = d;
    //push the object to the data Array
    data.push(obj)
    console.log(data)
    //Clean inputs but mantain current transaction type
    deleteValues(inputs)
    inputCategory.classList.remove('active')
    uncheckRadioInputs(addRadioInput)
}

const groupBy = (key,arr) => arr
.reduce(
    (cache, product) => {
        const property = product[key]
        if (property in cache) {
            return {...cache, [property]: cache[property].concat(product)
            }
        }
        return {...cache, [property]: [product]}
    },
    {}
)

function populateCalendar(obj){
    for(let transactionDay in obj){
        let transactionDate = transactionDay;
        
        for(let transaction in obj[transactionDay]){
            let transactionData = obj[transactionDay][transaction]
            let transactionCategory = transactionData.category
            let transactionNote = transactionData.note
            let transactionAmount = transactionData.amount
            let transactionId = transactionData.timeStamp
            let transactionType = transactionData.type

            let transactionLi = `
            <li>
                <div class="date-movement" data-type="${transactionType}" id="id${transactionId}">
                    <span class="movement-circle"></span>
                    <p class="movement-category">${transactionCategory}</p>
                    <p class="movement-note">${transactionNote}</p>
                    <p class="movement-amount">$ ${transactionAmount}</p>
                    <i class="movement-cross fa-solid fa-xmark"></i>
                </div>
            </li>
            `
            console.log(transactionLi)
        }
        
        



    }
}
