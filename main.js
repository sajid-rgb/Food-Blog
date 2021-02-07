const searchButtonClick = () => {
    const inputValue = document.getElementById("inputValue").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            const mainDiv = document.getElementById("mainDiv");
            mainDiv.innerHTML = "";
            const meals = data.meals;
            if (inputValue === "") {
                alert("Please Enter your Food Name");
                detailSectionHide("errorSection", "none");
                detailSectionHide("details", "none")
            }
            else if (meals === null) {
                const errorSection = document.getElementById("errorSection");
                errorSection.style.display = 'block';
                detailSectionHide("details", "none");
            }
            else {
                meals.forEach(foodItem => {
                    const Id = foodItem.idMeal;
                    const newDiv = document.createElement("div");
                    detailSectionHide("details", "none");
                    detailSectionHide("errorSection", "none");
                    const searchResult = `<a href="#details"><div class="foodItems" onclick="mealDetail(${Id})"><img src="${foodItem.strMealThumb}" > 
             <h2>${foodItem.strMeal}</h2></div></a>
             `;
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
            const mealItem = data.meals;
            const details = document.getElementById("details");
            details.style.display = "block";
            details.innerHTML = "";
            const mealDetails = mealItem[0];
            const mealDiv = `<div class="image-ingredients">
            <img src="${mealDetails.strMealThumb}">
            <h1>${mealDetails.strMeal}</h1>
                <h3>Ingredients</h3>
                </div>`;
            details.innerHTML = mealDiv;
            const s = Object.keys(mealDetails);
            let i = 1;
            Object.keys(mealDetails).forEach(key => {
                const detailList = document.createElement("ul")
                if (key == "strIngredient" + i) {
                    if (mealDetails[key] != null && mealDetails[key] != "") {
                        const detailsData = `
                <li>${mealDetails[key]}</li>`;
                        detailList.innerHTML = detailsData;
                        details.appendChild(detailList);
                    }
                    i++;
                }
            })
        })
}
function detailSectionHide(id, value) {
    if (id == ("details")) {
        document.getElementById(id).style.display = value;
    }
    if (id == ("errorSection")) {
        document.getElementById(id).style.display = value;
    }
}

