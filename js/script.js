function getDefaultFood() {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Potato`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewMeal(data.meals, "Potato"))
        .catch(err => console.log('Error', err));
}
getDefaultFood();

function getData(event) {
    changeButtonColor(event);
    console.log(event.target.textContent)
    let foodName = event.target.textContent;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewMeal(data.meals, foodName))
        .catch(err => console.log('Error', err));
        
}

function changeButtonColor(event){
    const list = document.getElementById("buttonList");
    // Check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
        // Remove the "selected" class from all buttons
        const buttons = list.querySelectorAll("button");
        buttons.forEach(function(button) {
            button.classList.remove("bg-sky-950", "text-white");
            
        });
        event.target.classList.add("bg-sky-950", "text-white");
    }
}

const viewMeal = (meals, foodName) => {
    let categoryNameNode = document.getElementById("category-name");
    if(foodName){
        categoryNameNode.innerHTML = '';
        categoryNameNode.innerHTML = `Category - ${foodName}`;
    }else{
        categoryNameNode.innerHTML = '';
        categoryNameNode.innerHTML = `Category - All`;
    }

    let container = document.getElementById("data-container");
    container.innerHTML = '';
    meals.forEach(meal => {
        console.log(meal.idMeal);
        let card = document.createElement('div');
        card.classList = 'card card-compact bg-stone-100 shadow-lg';
        card.innerHTML = `
            <figure>
                <img class="w-10/12 rounded-lg mt-2" src=${meal.strMealThumb} alt='${meal.strMeal} - Image' />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${meal.strMeal}</h2>
                <p>
                    ${meal.strInstructions.slice(0, 150)}...
                </p>
                <div class="card-actions justify-end">
                    <button class="btn glass btn-outline hover:bg-sky-950">Show More</button>
                </div>
            </div>
        `;
		container.appendChild(card);
    });
}