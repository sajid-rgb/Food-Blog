const url ="https://www.themealdb.com/api/json/v1/1/"
const searchButtonClick = () => {
    const inputValue = document.getElementById("inputValue").value;
    fetch(`${url}search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            const mainDiv = document.getElementById("mainDiv");
            mainDiv.innerHTML = "";
            const meals = data.meals;
            if (inputValue === "") {
                alert("Please Enter your Food Name");
                detailSectionHide("errorSection", "none");
                detailSectionHide("details", "none");
            }
            else if (meals === null) {
                const errorSection = document.getElementById("errorSection");
                errorSection.style.display = 'block';
                detailSectionHide("details", "none");
            }
            else {
                meals.forEach(foodItem => {
                    const idMeal = foodItem.idMeal;
                    const newDiv = document.createElement("div");
                    detailSectionHide("details", "none");
                    detailSectionHide("errorSection", "none");
                    const searchResult = `<a href="#details"><div class="foodItems" onclick="mealDetail(${idMeal})"><img src="${foodItem.strMealThumb}" > 
             <h2>${foodItem.strMeal}</h2></div></a>
             `;
                    newDiv.innerHTML = searchResult;
                    mainDiv.appendChild(newDiv);
                });
            }
        })
}
const mealDetail = foodId => {
    fetch(`${url}lookup.php?i=${foodId}`)
        .then(res => res.json())
        .then(data => {
            const mealItem = data.meals;
            const details = document.getElementById("details");
            details.style.display = "block";
            details.innerHTML = "";
            const mealDetails = mealItem[0];
            const mealSection = `<div class="image-ingredients">
            <img src="${mealDetails.strMealThumb}">
            <h1>${mealDetails.strMeal}</h1>
                <h3>Ingredients</h3>
                </div>`;
            details.innerHTML = mealSection;
            let i = 1;
            while(i <=20) {
                const mealIngredients = mealDetails[`strIngredient${i}`];
                const measure = mealDetails[`strMeasure${i}`];
                if (measure != "" && mealIngredients != "") {
                    const detailList = document.createElement("ul");
                    const detailsData = `
                 <li> ${measure} ${mealIngredients}</li>`;
                    detailList.innerHTML = detailsData;
                    details.appendChild(detailList);
                }
                i++;
            }
        })
}
function detailSectionHide(id, value) {
    if (id === ("details")) {
        document.getElementById(id).style.display = value;
    }
    if (id === ("errorSection")) {
        document.getElementById(id).style.display = value;
    }
}

