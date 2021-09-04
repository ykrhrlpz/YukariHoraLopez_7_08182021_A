
const recipesList = document.getElementById('recipesList')
const searchBar = document.getElementById('searchWrapper')
// let recipesGroup = []

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    console.log(searchString.length)

    let filteredRecipes = recipes
    // Filter recipe only when a user enters more than 3 letters in the search bar 
    if (searchString.length > 2) filteredRecipes = recipes.filter((recipe) => 
    (
        recipe.name && recipe.name.toLowerCase().includes(searchString) || 
        recipe.ingredients.ingredient && recipe.ingredients.ingredient.toLowerCase().includes(searchString) ||
        recipe.description && recipe.description.toLowerCase().includes(searchString)  
    ))
    displayRecipes(filteredRecipes)
    console.log(filteredRecipes)
})

function generatIngredients(ingredients) 
{
	return ingredients.map(ingredient => 
    `
        <small class="card-text mb-1"><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</small>
    `).join('')
}

function displayRecipes(recipes)
{
    const htmlString = recipes.map((recipe) => {
        return `
        <div class="card col-4 mb-4">
            <div class="card-img-bg"></div>
            <div class="card-body">
                <div class="row mb-4">
                    <h5 class="card-title col-8 m-0 text-truncate">${recipe.name}</h5>
                    <div class="col-4 d-flex align-items-center">
                        <i class="far fa-clock mr-1"></i>
                        <p class="m-0">${recipe.time} min</p>
                    </div>   
                </div>
                <div class="row">
                    <div class="col-6 d-flex flex-column">
                        ${generatIngredients(recipe.ingredients)}
                    </div>
                    <small class="col-6 card-text text-left text-truncate text-truncate--2">
                        ${recipe.description}
                    </small>   
                </div>
            </div>
        </div>
        `
    })
    .join('')
    recipesList.innerHTML = htmlString
}

function fetchData()
{
    displayRecipes(recipes)
}


// fetchData()


// Selectbox----------------------------------------

const selected = document.querySelector('.selected')
const optionContainer = document.querySelector('.options-container')
const searchBox = document.querySelector('.search-box input')

const optionsList = document.querySelectorAll('.option')

selected.addEventListener('click', () => {
    optionContainer.classList.toggle("active")

    //Refresh input value every time they close dropbox
    searchBox.value = ""
    filterList("")

    //gives focus directly when users open droobox
    if (optionContainer.classList.contains("active"))
    {
        searchBox.focus()
    }    
})

optionsList.forEach( option => {
    option.addEventListener('click', () => {
        selected.innerHTML = option.querySelector('label').innerHTML
        optionContainer.classList.remove('active')
    })
} )

searchBox.addEventListener('keyup', function(e) {
    filterList(e.target.value)
})

function filterList(searchTerm)
{
    searchTerm = searchTerm.toLowerCase()
    optionsList.forEach(option => {
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase()
        if (label.indexOf(searchTerm) != -1)
        {
            option.style.display = "block"
        }
        else
        {
            option.style.display = "none"
        }
    });
}

// Dropdown

// var myArray = new Array("1", "2", "3", "4", "5");


// // Get dropdown element from DOM
// var dropdown = document.getElementById("selectNumber");

// // Loop through the array
// for (var i = 0; i < myArray.length; ++i) {
//     // Append the element to the end of Array list
//     dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
// }

// console.log(dropdown);

// create an array of Ingredients
function createIngredientsArray()
{
    let ingredientsGroup = []

    // for each loop to get array of ingredient
    recipes.forEach(recipe => 
        recipe.ingredients.forEach(item => 
            !ingredientsGroup.includes(item.ingredient.toLowerCase())
            &&
                ingredientsGroup.push(item.ingredient.toLowerCase())))

    return ingredientsGroup
}

createIngredientsArray()

// create an array of Devices
function createDevicesArray()
{
    let devicesGroup = []

    recipes.forEach(recipe => 
    {
        !devicesGroup.includes(recipe.appliance.toLowerCase())
            &&
            devicesGroup.push(recipe.appliance.toLowerCase())
    
    });

    return devicesGroup;
}

createDevicesArray()

// create an array of Utensils
function createUtensilsArray()
{
    let utensilsGroup = []

     recipes.forEach(recipe => 
        recipe.ustensils.forEach(item => 
            !utensilsGroup.includes(item.toLowerCase())
            &&
            utensilsGroup.push(item.toLowerCase())))

    return utensilsGroup;
}

createUtensilsArray()