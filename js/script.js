function getAllFood() {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewMeal(data.meals, ""))
        .catch(err => console.log('Error', err));
}
getAllFood();

function getData(event) {
    console.log(event.target.textContent)
    let foodName = event.target.textContent;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => viewMeal(data.meals, foodName))
        .catch(err => console.log('Error', err));
        
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