//const inputValue = document.getElementById("inputValue").value
//const button = document.getElementById("button")
function clickMe() {
    const inputValue = document.getElementById("inputValue").value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            const items = document.getElementById("items");
            const Error = document.getElementById("Error")
            items.innerHTML = "";
            console.log(data);
            const meals = data.meals;
            if (inputValue == "") {
                alert("Please Enter your Food Name")
            }
            else if (meals == null) {
                //Error.innerHTML=`<span class="error-handle">Error Not Found Your Favorite Food <span>`
                alert("Not Found your Favorite food");
                document.getElementById("details").style.display = "none"
            }
            else {
                for (let i = 0; i < meals.length; i++) {
                    const foodItem = meals[i];
                    const Id = foodItem.idMeal;
                    const newDiv = document.createElement("div");
                    const newValue = `<div class="foodItems"><a href="#details"><img src="${foodItem.strMealThumb}" onclick="mealDetail(${Id})"> </a>
            <h2>${foodItem.strMeal}</h2></div>
            `
                    newDiv.innerHTML = newValue;
                    items.appendChild(newDiv)
                }
            }
        })
}
function mealDetail(foodId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(res => res.json())
        .then(data => {
            const meal2 = data.meals
            const details = document.getElementById("details");
            details.style.display = "block"
            details.innerHTML = ""
            const mealNumber = meal2[0]
            //const a ="strIngredient"
            //const d=a+i
            const detailList = document.createElement("ul")
            const foodGradient1 = mealNumber.strIngredient1;
            const foodGradient2 = mealNumber.strIngredient2;
            const foodGradient3 = mealNumber.strIngredient3;
            const foodGradient4 = mealNumber.strIngredient4;
            const foodGradient5 = mealNumber.strIngredient5;
            const detailsData = `<img src="${mealNumber.strMealThumb}">
                <h1>${mealNumber.strMeal}</h1>
                 <h3>Ingredients</h3>
                <li>${foodGradient1}</li>
                <li>${foodGradient2}</li>
                <li>${foodGradient3}</li>
                <li>${foodGradient4}</li>
                <li>${foodGradient5}</li>
                `
            detailList.innerHTML = detailsData;
            details.appendChild(detailList)
        })
}
