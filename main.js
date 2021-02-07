const searchButtonClick = () => {
    const inputValue = document.getElementById("inputValue").value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            const mainDiv = document.getElementById("mainDiv");
            mainDiv.innerHTML = "";
            const meals = data.meals;
            if (inputValue === "") {
                alert("Please Enter your Food Name")
            }
            else if (meals === null) {
                alert("Not Found your Favorite food");
                document.getElementById("details").style.display = "none"
            }
            else {
                meals.forEach(foodItem => {
                    const Id = foodItem.idMeal;
                    const newDiv = document.createElement("div");
                    document.getElementById("details").style.display = "none"
                    const searchResult = `<div class="foodItems"><a href="#details"><img src="${foodItem.strMealThumb}" onclick="mealDetail(${Id})"> </a>
             <h2>${foodItem.strMeal}</h2></div>
             `
                    newDiv.innerHTML = searchResult;
                    mainDiv.appendChild(newDiv)
                });
            }
        })
}
const mealDetail = foodId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(res => res.json())
        .then(data => {
            const mealItem = data.meals
            const details = document.getElementById("details");
            details.style.display = "block"
            details.innerHTML = ""
            const mealDetails = mealItem[0];
            const mealDiv = `<div class="image-ingredients">
            <img src="${mealDetails.strMealThumb}">
            <h1>${mealDetails.strMeal}</h1>
                <h3>Ingredients</h3>
                </div>`
            details.innerHTML = mealDiv
            const s = Object.keys(mealDetails);
            let i = 1;
            Object.keys(mealDetails).forEach(key => {
                const detailList = document.createElement("ul")
                if (key == "strIngredient" + i) {
                    if (mealDetails[key] != null && mealDetails[key] != "") {
                        const detailsData = `
                <li>${mealDetails[key]}</li>`
                        detailList.innerHTML = detailsData;
                        details.appendChild(detailList)
                    }
                    i++;
                }
            })
        })
}
