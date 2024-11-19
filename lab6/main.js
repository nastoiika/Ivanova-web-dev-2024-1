import dishes from './dishes.js';

let totalCost = 0;
const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    desert: null
};

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
    case 'salad':
        if (selectedDishes.salad) {
            const previousDish = dishes.find(d => d.keyword === selectedDishes.salad);
            totalCost -= previousDish.price;
        }
        selectedDishes.salad = dish.keyword;
        infoContainer = document.getElementById('salad-info');
        break;
    case 'drink':
        if (selectedDishes.drink) {
            const previousDish = dishes.find(d => d.keyword === selectedDishes.drink);
            totalCost -= previousDish.price;
        }
        selectedDishes.drink = dish.keyword;
        infoContainer = document.getElementById('drink-info');
        break;
    case 'desert':
        if (selectedDishes.desert) {
            const previousDish = dishes.find(d => d.keyword === selectedDishes.desert);
            totalCost -= previousDish.price;
        }
        selectedDishes.desert = dish.keyword;
        infoContainer = document.getElementById('desert-info');
        break;
    }
    infoContainer.innerHTML = `${dish.category === 'soup' ? 'Суп' : dish.category === 'main' ? 'Основное блюдо' : dish.category === 'salad' ? 'Салат' : dish.category === 'drink' ? 'Напиток' : 'Десерт'}:<br>${dish.name} - ${dish.price}&#8381;`;

    hiddenFieldId = `selected-${dish.category}`;
    document.getElementById(hiddenFieldId).value = dish.keyword;
    
    totalCost += dish.price;
    document.getElementById('total-cost').style.display = 'block';
    document.getElementById('cost-value').textContent = totalCost;
}

function displayDishes() {
    const sections = {
        soup: document.querySelector('.sup .cards'),
        main: document.querySelector('.bludo .cards'),
        salad: document.querySelector('.salat .cards'),
        drink: document.querySelector('.napitok .cards'),
        desert: document.querySelector('.sweet .cards')
    };

    Object.values(sections).forEach(section => section.innerHTML = '');

    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    sortedDishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-dish', dish.keyword);
        card.classList.add(dish.kind);
        card.innerHTML = `
            <div class="product-image">
                <img src="${dish.image}" alt="">
            </div>
            <div class="product-details">
                <p class="info">${dish.price}&#8381;</p>
                <p class="info">${dish.name}</p>
                <p class="info1">${dish.count}</p>
                <div class="control">
                    <button class="btn")">
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


document.addEventListener('DOMContentLoaded', () => {
    displayDishes();
});

function isValidOrder() {
    const combos = [
        { soup: true, main: true, salad: true, drink: true },
        { soup: true, main: true, drink: true },
        { soup: true, salad: true, drink: true },
        { main: true, salad: true, drink: true },
        { main: true, drink: true },
    ];

    return combos.some(combo => Object.entries(combo).every(([key, required]) => !required || selectedDishes[key] !== null));
}
function getMissingItemsMessage() {
    const requiredCategories = ['soup', 'main', 'salad', 'drink', 'desert'];
    const missingItems = requiredCategories.filter(category => selectedDishes[category] !== null);
    console.log(missingItems);
    let answer = "";
    if (missingItems.length == 0) {
        answer = "Ничего не выбрано";
    } else {
        if (missingItems.includes('drink') == false) {
            answer = "Выбирете напиток";
        }
        if ((missingItems.includes('drink') || missingItems.includes('desert')) && missingItems.includes('main') == false) {
            answer = "Выбирете главное блюдо";
        }
        if (missingItems.includes('soup') && (missingItems.includes('salad') == false || missingItems.includes('main') == false)) {
            if ((missingItems.includes('salad') || missingItems.includes('main'))) {
                answer = answer;
            } else {
                answer = "Выбирете главное блюдо/салат/стартер";
            }
        }
        if (missingItems.includes('salad') && (missingItems.includes('soup') == false || missingItems.includes('main') == false)) {
            if ((missingItems.includes('soup') || missingItems.includes('main'))) {
                answer = answer;
            } else {
                answer = "Выбирете суп или главное блюдо";
            }
        }
    }
    return answer;
}

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = "block";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (isValidOrder()) {
        this.submit();
    } else {
        showModal(getMissingItemsMessage());
    }
});

document.getElementById("closeModalButton").addEventListener("click", closeModal);