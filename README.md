# Second Project Portfolio
    *amiresponisive image*

[View the live project here](https://cilliagustin.github.io/track-e.i/)


## Introduction
The website is a web aplication that allows the user to add any expense or income he/she has and allows them to view all this transaction organized by date and categorized by type of transaction.
The website works with two css files: a general one and one just for the tutorial elements (more of this will be explained later on this file) and 3 javascript files: the first one to change the website look and filter information, the second one to create the data that the used adds, manipulate it and populate the DOM with it and the third one to create the tutorial.

### Purpose
#### For the creator:
* To be able to show the creator capabilities, creating a complex and dinamic website with out the use of any framework or library, creating from scratch donut charts using svg on html and replicating (smaller scale versions) of libraries.

#### For the user:
* To be able to correcly track their transactions in order to keep a better control of their finances.
* To be able to see in an organized list the order oh how each transaction was made.
* To be able to keep in control how the user spends most of their money as well as to be able to track how they earn the most.


## UX
The website is a landing page that consists of the sections:
* Balance Section
* Calendar Section
* Add Section

The site has on top a navbar that allows the use to toggle in between this three sections unless the user is using the website on a desktop. In that case the Add Section is always displayed at the right half of the screen and the navbar allows you to toggle the left half between the Balance and Calendar Sections.

### User Stories

#### New User Goals
* As a new user, I want to be able to intuitively navegate though the website.
* As a new user, I want to have a walkthough that explains me in detail how to use the website.
* As a new User, I want the website to be correctly designed to catch my attention.

#### Current User Goals
* As a current user, I want the website to store my information so I dont have to add it each time I use the website 
* As a current user, I want to be able to see the information I added organized and displayed in a clear way.
* As a current user I want to be able to delete information in case I made a mistake.

### Colour Scheme
The website uses three color schemes: Neutral, Expenses and Incomes.

#### Neutral
<details>
<summary>View Palette</summary>

![Neutral palette](documentation/testing/palette-neutral.png)
</details>
Is the one used in most of the website design as well as on the calendar section, it appears as default whenever a user opens the website and also when the Balance or Add Section are opened.


#### Expenses
<details>
<summary>View Palette</summary>

![Expense palette](documentation/testing/palette-expense.png)
</details>
This Palette is applied to the Balance and Add section when the expense button is pressed.

#### Donut-chart expense
<details>
<summary>View Palette</summary>

![Donut-chart expense palette](documentation/testing/palette-expense-chart.png)
</details>
This Palette is applied to the donut chart in balance section when the expense button is selected.

#### Donut-chart highlight expense
<details>
<summary>Donut-chart Expense Highlight Palette</summary>

![Donut-chart expense highlight palette](documentation/testing/palette-expense-chart-active.png)
</details>
This Palette is applied to the donut chart when one element of the expense type is highlithed and the others are hidden.


#### Incomes
<details>
<summary>Income Palette</summary>

![Income palette](documentation/testing/palette-income.png)
</details>
This Palette is applied to the Balance and Add section when the income button is pressed.

#### Donut-chart income 
<details>
<summary>Donut-chart Income Palette</summary>

![Donut-chart income palette](documentation/testing/palette-income-chart.png)
</details>
This Palette is applied to the donut chart in balance section when the income button is selected.

#### Donut-chart highlight income 
<details>
<summary>Donut-chart Income Highlight Palette</summary>

![Donut-chart income highlight palette](documentation/testing/palette-income-chart-active.png)
</details>
This Palette is applied to the donut chart when one element of the income type is highlithed and the others are hidden.

### Typography
The idea of the website was to have a modern, yet,  design. The typographies selected for this were [Quicksand](https://fonts.google.com/specimen/Quicksand) and [Roboto](https://fonts.google.com/specimen/Roboto) with a backup of Sans-serif. 
Quicksand was used for most of the website and Roboto was used for the navbar, the percentage elements (The menu that appears on Balance Section with transaction information), the category selectors and the submit button in the Add Section.

### Wireframes
The website was coded with the wireframes previously created in mind, although some changes were made during the coding phase and now the website present some slight changes compared to the skeleton.
The wireframes were drawn using [Balsamiq](https://balsamiq.com/), the key for this aplication was provided by [Code Institute](https://codeinstitute.net/global/).

<details>
<summary>Mobile Wireframe</summary>

![Mobile Wireframe](documentation/wireframes/wireframe-mobile.png)
</details>

<details>
<summary>Tablet Wireframe</summary>

![Tablet Wireframe](documentation/wireframes/wireframe-tablet.png)
</details>

<details>

<summary>Desktop Wireframe</summary>

![Desktop Wireframe](documentation/wireframes/wireframe-desktop.png)
</details>


## Features
The website is a landing page divided in three sections. the first time the user uses it they will have to start in the Add Section. Loading here the transaction information will  trigger lots of function which will populate the website´s sections.

### Existing Features
#### Navbar
The navbar is located in the top of the website occupying 100% of the width. On the right side are located the links that toggle the different sections: Balance, Calendar and Add (Only the first two are visible on desktop mode).
Next to the links is a hamburger menu which unfolds a dropdrown menu, here are two Select tag where the user can choose what kind of currency and decimal separator they want to use.
    Add navbar images



### Features Left to Implement
    have ideas on what you'd like to add in the future? add them here!! assessors LOVE seeing future concepts!
## Technologies Used
    explain various tech used, such as HTML, CSS, Gitpod, GitHub, Git, etc. - add a link to each respective site as well, if possible
## Testing
    ## Testing
Testing information can be found in a separate testing [file](TESTING.md "Link to testing file")
## Deployment
    document all necessary steps you did in order to deploy this project (GitHub Pages, Heroku, etc.)
### Local Deployment
    document all the necessary steps someone else can take in order to make a local copy of your project, like cloning, forking, etc.
## Credits
    explain about any particular places you took inspiration from
### Content
    list out any URLs or links where you might've borrowed a snippet of code, or element
### Media
    list out any URLs for images/videos/audios you've borrowed from online (Markdown Table works best here!)
### Acknowledgements
    list out any acknowledgements you have, if any... tutor support? fellow Slack student help? spouse, loved one, family member, etc.