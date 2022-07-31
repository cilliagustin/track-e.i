let data = []
let dataByDate;
let incomedata
let expensedata
let incomeTotal
let expenseTotal

//Create data from each transaction
submit.addEventListener('click', (e)=>{
    e.preventDefault
    let a = parseFloat(inputAmount.value).toFixed(2);
    let b = inputNote.value;
    let c = inputDate.value;
    let d = inputCategory.value;
    //Check that all inputs are correctly filled
    if(a < 0.01) {
        alert("Amount must be at least 1 cent")
    } else if (a == null || a == "" || b == null || b == "" || c == null || c == "" || d == null || d == ""){
        alert("Please complete all the fields")} 
    else {
        //Create data with all transaction information
        createData(a,b,c,d)
        //Adds to the dataBy date transactions grouped by date and orders ir from most recent to oldestone
        dataByDate = sortObj(groupBy('date', data))
        //Populates the calendar section with the dataByDate
        populateCalendar(dataByDate)
        //Create data for expense and income transactions
        createBalanceData(data)
        //Populates the Add section with the income and expense data
        populateAdd()


        

    console.log("data")
    console.log(data)
    console.log("incomedata")
    console.log(incomedata)
    console.log("expensedata")
    console.log(expensedata)
    console.log("incomeTotal")
    console.log(incomeTotal)
    console.log("expenseTotal")
    console.log(expenseTotal)
 
}
})

//Creates the data with all transactions
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
    obj.amount = Number(a);
    obj.note = b;
    obj.date = c;
    obj.category = d;
    //push the object to the data Array
    data.push(obj)
    //Clean inputs but mantain current transaction type
    deleteValues(inputs)
    inputCategory.classList.remove('active')
    uncheckRadioInputs(addRadioInput)
}

//Groups the data by a specific key
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

//Orders the object by key value in reverse
function sortObj(obj) {
    return Object.keys(obj).sort().reverse().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }

//Populate calendar section with dataByDate obj
function populateCalendar(obj){
    //Create empty string that will finally populate the calendar section
    let calendarContent = ""
    //iterate the object
    for(let transactionDay in obj){
        //transform yyyy/mm/dd format of date into dd/mm/yyyy
        let [year, month, day] = transactionDay.split('-');
        let transactionDate = [month, day, year].join('/');
        //Create empty string that will include all information of the day
        let transactionsOfTheDay = "";
        //Create variable for the result of the day (all the incomes - all expenses)
        let dailyResult = 0;
        //Iterate in the objects inside the array for each day
        for(let transaction in obj[transactionDay]){
            //Get all values for each transaction
            let transactionData = obj[transactionDay][transaction]
            let transactionCategory = transactionData.category
            let transactionNote = transactionData.note
            let transactionAmount = transactionData.amount
            let transactionId = transactionData.timeStamp
            let transactionType = transactionData.type

            let transactionAmountStyled
            //if transaction is income transactionAmountStyled will have a "$"" added and 
            //this amount will be added to the daily result, otherwise if is expense, transactionAmountStyled
            //will have "-$" added and the daily reult will have this amount subtracted
            if(transactionType === "income"){
                dailyResult = dailyResult + Number(transactionAmount)
                transactionAmountStyled = `$ ${transactionAmount}`
            } else if (transactionType === "expense"){
                dailyResult = dailyResult - Number(transactionAmount)
                transactionAmountStyled = `-$ ${transactionAmount}`
            }

            // Add variables to a string with the html code and each loop add it to the transactionsOfTheDay variable
            let transactionLi = `
            <li>
                <div class="date-movement" data-type="${transactionType}" id="id${transactionId}">
                    <span class="movement-circle"></span>
                    <p class="movement-category">${transactionCategory}</p>
                    <p class="movement-note">${transactionNote}</p>
                    <p class="movement-amount">${transactionAmountStyled}</p>
                    <i class="movement-cross fa-solid fa-xmark"></i>
                </div>
            </li>
            `;
            transactionsOfTheDay += transactionLi;
        }
        //if the dailyResult is positive add a "$"", if is negative style it with a "$" between the number and the "-" 
        if(dailyResult >= 0){
            dailyResult = `$ ${dailyResult.toFixed(2)}`
        } else if(dailyResult < 0){
            dailyResult = `-$ ${Math.abs(dailyResult).toFixed(2)}`
        }
        //Create a variable for all the information of the day
        let dateLi = `
            <li class="date">
                    <div class="date-info">
                        <p>${transactionDate}</p>
                        <div></div>
                        <p>${dailyResult}</p>
                    </div>
                    <ul>
            `;
        //Add all the code with all the transactions and close the ul and li prevoiusly opened
        dateLi += transactionsOfTheDay;     
        dateLi += `
            </ul>
        </li>
        `;
        calendarContent += dateLi;
    }
    //populate html with all the information
    calendarList.innerHTML = calendarContent
}

//Grupes transaction by type and category
function createBalanceData(arr){
    let incomeObj = {}
    let expenseObj = {}
    let incomeAmount = 0
    let expenseAmount = 0
    //Iterates each object and gets necesary information
    arr.forEach(obj => {
        let transtype = obj.type;
        let transCat = obj.category
        if(transtype === "income"){
            //check if category exists in income array, if it does it´s added, otherwise
            //its creates the category
            if(obj.category in incomeObj){
                let oldAmount = incomeObj[transCat].amount
                incomeObj[transCat].amount = oldAmount + obj.amount
                incomeAmount += obj.amount
            } else{
                incomeObj[transCat] = {amount: obj.amount}
                incomeAmount += incomeObj[transCat].amount
            }
        } else if(transtype === "expense"){
            //check if category exists in expense array, if it does it´s added, otherwise
            //its creates the category
            if(obj.category in expenseObj){
                let oldAmount = expenseObj[transCat].amount
                expenseObj[transCat].amount = oldAmount + obj.amount
                expenseAmount += obj.amount
            } else{
                expenseObj[transCat] = {amount: obj.amount}
                expenseAmount += expenseObj[transCat].amount
            }
        }
    });
    //adds percetage of each category in income and expense array
    for(key in incomeObj){
        incomeObj[key].percentage = parseFloat(incomeObj[key].amount * 100 / incomeAmount).toFixed(2)
    }

    for(key in expenseObj){
        expenseObj[key].percentage = parseFloat(expenseObj[key].amount * 100 / expenseAmount).toFixed(2)
    }

    //returns the data to the global scope
    incomedata = incomeObj;
    expensedata = expenseObj;
    incomeTotal = parseFloat(incomeAmount).toFixed(2);
    expenseTotal = parseFloat(expenseAmount).toFixed(2);
}

//Populate Add section with incomeData and expenseData
function populateAdd(){
    let finalBalance
    console.log("pieChartContainer")
    console.log(pieChartContainer)

    if(incomeTotal >= expenseTotal){
        finalBalance = `$ ${parseFloat(incomeTotal - expenseTotal).toFixed(2)}`
    } else if(incomeTotal < expenseTotal){
        finalBalance = `-$ ${parseFloat(expenseTotal - incomeTotal).toFixed(2)}`
    }
    let pieChartBalance = "";
    let balanceInfo = "";

    pieChartBalance += `
    <div class="pie-chart-result">
        <p>$ ${incomeTotal}</p>
        <p>-$ ${expenseTotal}</p>
        <hr>
        <p>${finalBalance}</p>
    </div>
    <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="rgb(100,200,5)" />
    </svg>`
    let incomeCurrentAngle = -90;
    let expenseCurrentAngle = -90;
    for(key in incomedata){
        let incomeCategory = key;
        let noSpecialCaseCategory = incomeCategory.replace(/[^a-zA-Z]/g,"")
        let incomeAmount = incomedata[key].amount;
        let incomePercentage = incomedata[key].percentage;

        let incomeSvg = `
        <svg class="hide" data-add-category="${noSpecialCaseCategory}" data-add-type="income" height="20" width="20" viewBox="0 0 20 20" style="position: absolute; transform:rotate(${incomeCurrentAngle}deg)">
            <circle r="5" cx="10" cy="10" fill="transparent"
            stroke="var(--income-shade-${noSpecialCaseCategory})"
            stroke-width="10"
            stroke-dasharray="${parseFloat(incomePercentage * 31.42 / 100).toFixed(2)} 31.42" />
        </svg>
        `
        let incomeElement = `
        <div data-add-category="${noSpecialCaseCategory}" data-add-type="income" class="percentage-element hide">
                <i class="fa-solid fa-basket-shopping"></i>
                <p class="category"> ${incomeCategory}</p>
                <p class="amount">$ ${incomeAmount}</p>
                <p class="percentage">${incomePercentage}%</p>
            </div>
        `

        incomeCurrentAngle += incomePercentage * 360 / 100;

        pieChartBalance += incomeSvg;
        balanceInfo += incomeElement
    }

    for(key in expensedata){
        let expenseCategory = key;
        let noSpecialCaseCategory = expenseCategory.replace(/[^a-zA-Z]/g,"")
        let expenseAmount = expensedata[key].amount;
        let expensePercentage = expensedata[key].percentage;

        let expenseSvg = `
        <svg class="hide" data-add-category="${noSpecialCaseCategory}" data-add-type="expense" height="20" width="20" viewBox="0 0 20 20" style="position: absolute; transform:rotate(${expenseCurrentAngle}deg)">
            <circle r="5" cx="10" cy="10" fill="transparent"
            stroke="var(--expense-shade-${noSpecialCaseCategory})"
            stroke-width="10"
            stroke-dasharray="${parseFloat(expensePercentage * 31.42 / 100).toFixed(2)} 31.42" />
        </svg>
        `
        let expenseElement = `
        <div data-add-category="${noSpecialCaseCategory}" data-add-type="expense" class="percentage-element hide">
                <i class="fa-solid fa-basket-shopping"></i>
                <p class="category"> ${expenseCategory}</p>
                <p class="amount">$ ${expenseAmount}</p>
                <p class="percentage">${expensePercentage}%</p>
            </div>
        `

        expenseCurrentAngle += expensePercentage * 360 / 100;

        pieChartBalance += expenseSvg;
        balanceInfo += expenseElement
    }


    pieChartContainer.innerHTML = pieChartBalance
    pieChartInfo.innerHTML = balanceInfo
    console.log(pieChartBalance)
}



