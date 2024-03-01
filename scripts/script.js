function loadFoods(searchBoxText="f", isShow) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBoxText}`)
    .then(res => res.json())
    .then(data => displayFood(data.meals, isShow));
}

function displayFood(foods, isShow) {
  const displayContainer = document.getElementById("displayContainer");
  displayContainer.innerHTML = '';
  displayContainer.classList.add(`grid`);
  displayContainer.classList.add(`grid-cols-3`);


  const showBTN = document.getElementById("showBtn")
  if (foods.length > 12) {
    showBTN.classList.remove("hidden")
  } else {
    showBTN.classList.add("hidden")
  }


  if (!isShow) {
    foods = foods.slice(0, 12);
  } else {
    showBTN.classList.add("hidden")
  }

  foods.forEach(food => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src=${food.strMealThumb} alt="Dish" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="text-2xl font-medium">Dish: ${food.strMeal}</h2>
          <h2 class="text-xl font-medium">Category: ${food.strCategory}</h2>
          <a href=${food.strYoutube} target="_blank" class="text-sm font-medium">Video: ${food.strYoutube}</a>
          <div class="card-actions mt-5 text-center">
            <button class="btn btn-secondary w-36">Order Now</button>
            <button class="btn btn-outline btn-secondary w-36">Details</button>
          </div>
        </div>
      </div>`;
    displayContainer.appendChild(div);
  });



}

function searchMission(isShow) {
  const searchBox = document.getElementById("searchBox");
  const searchBoxText = searchBox.value;
  loadFoods(searchBoxText, isShow);
}

function showAll() {
  searchMission(true);
}


loadFoods()