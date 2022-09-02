# Testing
"Click to return back to the [README.md](README.md)"
## Browser Compatibility
    you must showcase proof with screenshots that you've tested the finished project on various browsers, such as Chrome, Firefox, Edge, Safari, Brave, etc.
## Code Validation
    you must showcase proof with screenshots that you've validated any code files, such as HTML, CSS, JS, Python (where applicable)
## Responsiveness
    you must showcase proof with screenshots that you've tested the finished project on different device sizes, such as mobile, tablet, desktop.
## Bugs
During the coding of the page I found two major bugs I had to fix:
* The first one was that the pie chart result div some times showed the final balance in negative altough the income was bigger than the expense. This happened because the final balance variable is created by comparing the incomeTotal and expenseTotal variables, if the income is bigger the expense is subtracted and a currency sign is added, otherwise there is a minus sign that is located before the currency sign and then the expense is subtracted from the income. The bug ocurred because during the conditional that check if the income or the expense are bigger the variables incomeTotal and expenseTotal are compared as strings insted of numbers so when the function check which variable is bigger it may throw an error. This was fixed by adding a parse float before comparing each value which changes them from a string to a number and the function to stablish correctly wich value is bigger.
This bug was originally detected by my mentor during our second call for the project.
<details>
<summary>View Bug</summary>

![Bug 1](documentation/testing/bug1_screenshot.png)
</details>

* The second bug showed a bigger height of the body on different browsers, although the height was set on 100vh in some browsers like mozilla or safari it displayed a body height bigger that the window itself. This was fixed by changing how the height is set, instead of using a css rule I created the setheight function that takes the inner height of the window and stablished that as the body height (more information of this function can be found in the JavaScript description on the README.md file). This function is triggered when the website is loaded and is also retriggered each time the website is resized.
<details>
<summary>View Bug</summary>

![Bug 2](documentation/testing/bug2_screenshot.png)
</details>

* The final bug happened only on safari. In this browser the date input did not take the correct size: a width of 100% of its container. This is because on sfari this type of input does not accept correctly the with: 100% value so I added a min-width property (Which is correcly accepted by the browser) to make sure the div always displays correctly in each browser.
<details>
<summary>View Bug</summary>

![Bug 3](documentation/testing/bug3_screenshot.jpeg)
</details>

## Unfixed Bugs
The oonly bug I am aware at the publishing moment of writing this file is that for very big numbers, like in the example, the text from the pie chart result div overflows and is also visible when the selected element is on top of it.
This could be fixed by applying a function that could lower the font size according to the amount of characters the  p element has.
<details>
<summary>View Bug</summary>

![Unfix Bug](documentation/testing/unfix_bug.png)
</details>