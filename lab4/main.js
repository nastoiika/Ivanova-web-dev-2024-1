import dishes from './dishes.js';

let totalCost = 0;
const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};
function displayDishes() {
    const sections = {
        soup: document.querySelector('.sup .cards'),
        main: document.querySelector('.bludo .cards'),
        drink: document.querySelector('.napitok .cards')
    };

    Object.values(sections).forEach(section => section.innerHTML = '');

    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    sortedDishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-dish', dish.keyword);
        card.innerHTML = `
            <div class="product-image">
                <img src="${dish.image}" alt="">
            </div>
            <div class="product-details">
                <p class="info">${dish.price}&#8381;</p>
                <p class="info">${dish.name}</p>
                <p class="info1">${dish.count}</p>
                <div class="control">
                    <button class="btn" onclick="addToOrder('${dish.keyword}')">
                        <span class="buy">Добавить</span>
                    </button>
                </div>
            </div>
        `;
        const button = card.querySelector('.btn');
        button.addEventListener('click', () => addToOrder(dish.keyword));
        sections[dish.category].appendChild(card);
    });
}

function addToOrder(keyword) {
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    
    document.getElementById('nothing').style.display = 'none';
    document.getElementById('selected-dishes').style.display = 'block';

    let infoContainer;
    let hiddenFieldId;

    switch (dish.category) {
        case 'soup':
            if (selectedDishes.soup) {
                const previousDish = dishes.find(d => d.keyword === selectedDishes.soup);
                totalCost -= previousDish.price;
            }
            selectedDishes.soup = dish.keyword;
            infoContainer = document.getElementById('soup-info');
            break;
        case 'main':
            if (selectedDishes.main) {
                const previousDish = dishes.find(d => d.keyword === selectedDishes.main);
                totalCost -= previousDish.price;
            }
            selectedDishes.main = dish.keyword;
            infoContainer = document.getElementById('entree-info');
            break;
        case 'drink':
            if (selectedDishes.drink) {
                const previousDish = dishes.find(d => d.keyword === selectedDishes.drink);
                totalCost -= previousDish.price;
            }
            selectedDishes.drink = dish.keyword;
            infoContainer = document.getElementById('drink-info');
            break;
    }
    infoContainer.innerHTML = `${dish.category === 'soup' ? 'Суп' : dish.category === 'main' ? 'Основное блюдо' : 'Напиток'}:<br>${dish.name} - ${dish.price}&#8381;`;
    hiddenFieldId = `selected-${dish.category}`;
    document.getElementById(hiddenFieldId).value = dish.keyword;
    
    totalCost += dish.price;
    document.getElementById('total-cost').style.display = 'block';
    document.getElementById('cost-value').textContent = totalCost;
}

document.addEventListener('DOMContentLoaded', displayDishes);


