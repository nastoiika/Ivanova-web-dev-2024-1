let totalCost = 0;
let dishes = [];
const selectedDishes = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};
const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

function updateCheckoutButtonVisibility() {
    const checkoutButton = document.getElementById('checkout-button');
    const hasSelectedDishes = 
    Object.values(selectedDishes).some(dish => dish !== null);
    
    // Если блюда выбраны, показываем кнопку, иначе скрываем
    if (hasSelectedDishes) {
        checkoutButton.style.display = 'block';
    } else {
        checkoutButton.style.display = 'none';
    }
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
            const previousDish = 
            dishes.find(d => d.keyword === selectedDishes.soup);
            totalCost -= previousDish.price;
        }
        selectedDishes.soup = dish.keyword;
        infoContainer = document.getElementById('soup-info');
        break;
    case 'main-course':
        if (selectedDishes['main-course']) {
            const previousDish = 
            dishes.find(d => d.keyword === selectedDishes['main-course']);
            totalCost -= previousDish.price;
        }
        selectedDishes['main-course'] = dish.keyword;
        infoContainer = document.getElementById('entree-info');
        break;
    case 'salad':
        if (selectedDishes.salad) {
            const previousDish = 
            dishes.find(d => d.keyword === selectedDishes.salad);
            totalCost -= previousDish.price;
        }
        selectedDishes.salad = dish.keyword;
        infoContainer = document.getElementById('salad-info');
        break;
    case 'drink':
        if (selectedDishes.drink) {
            const previousDish = 
            dishes.find(d => d.keyword === selectedDishes.drink);
            totalCost -= previousDish.price;
        }
        selectedDishes.drink = dish.keyword;
        infoContainer = document.getElementById('drink-info');
        break;
    case 'dessert':
        if (selectedDishes.dessert) {
            const previousDish = 
            dishes.find(d => d.keyword === selectedDishes.dessert);
            totalCost -= previousDish.price;
        }
        selectedDishes.dessert = dish.keyword;
        infoContainer = document.getElementById('desert-info');
        break;
    }
    infoContainer.innerHTML = `${dish.category === 'soup' ? 'Суп' : 
        dish.category === 'main-course' ? 'Основное блюдо' : dish.category === 
        'salad' ? 'Салат' : dish.category === 'drink' ? 'Напиток' : 'Десерт'}
        :<br>${dish.name} - ${dish.price}&#8381;`;

    hiddenFieldId = `selected-${dish.category}`;
    document.getElementById(hiddenFieldId).value = dish.keyword;

    const currentCard = document.querySelector(`[data-dish="${dish.keyword}"]`);
    if (currentCard) currentCard.classList.add('selected');
    
    totalCost += dish.price;
    document.getElementById('total-cost').style.display = 'block';
    document.getElementById('cost-value').textContent = totalCost;
    localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));

    updateCheckoutButtonVisibility();
}

function loadOrderFromLocalStorage() {
    const savedDishes = localStorage.getItem('selectedDishes');
    if (savedDishes) {
        const selectedDishes = JSON.parse(savedDishes);
        
        // Обновляем отображение выбранных блюд
        Object.entries(selectedDishes).forEach(([category, keyword]) => {
            if (keyword) {
                const dish = dishes.find(d => d.keyword === keyword);
                if (dish) {
                    // Обновляем интерфейс для каждого выбранного блюда
                    addToOrder(keyword);
                }
            }
        });
    }
}

function displayDishes() {
    if (!dishes) return;
    const sections = {
        soup: document.querySelector('.sup .cards'),
        'main-course': document.querySelector('.bludo .cards'),
        salad: document.querySelector('.salat .cards'),
        drink: document.querySelector('.napitok .cards'),
        dessert: document.querySelector('.sweet .cards')
    };

    Object.values(sections).forEach(section => section.innerHTML = '');
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));
    sortedDishes.forEach(dish => {
        const section = sections[dish.category];
        if (!section) {
            console.error(`Категория ${dish.category} не найдена в sections`);
            return;
        }
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

async function loadDishes() {
    try {
        const response = await fetch(apiUrl);
        dishes = await response.json();
        displayDishes();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    loadOrderFromLocalStorage();
    
    updateCheckoutButtonVisibility();
});

function isValidOrder() {
    const combos = [
        { soup: true, 'main-course': true, salad: true, drink: true },
        { soup: true, 'main-course': true, drink: true },
        { soup: true, salad: true, drink: true },
        { 'main-course': true, salad: true, drink: true },
        { 'main-course': true, drink: true },
    ];

    return combos.some(combo => Object.entries(combo)
        .every(([key, required]) => !required || selectedDishes[key] !== null));
}
function getMissingItemsMessage() {
    const requiredCategories = 
    ['soup', 'main-course', 'salad', 'drink', 'dessert'];
    const missingItems = 
    requiredCategories.filter(category => selectedDishes[category] !== null);
    console.log(missingItems);
    let answer = "";
    if (missingItems.length == 0) {
        answer = "Ничего не выбрано";
    } else {
        if (missingItems.includes('drink') == false) {
            answer = "Выбирете напиток";
        }
        if ((missingItems.includes('drink') || missingItems.includes('dessert'))
             && missingItems.includes('main-course') == false) {
            answer = "Выбирете главное блюдо";
        }
        if (missingItems.includes('soup') && (missingItems.includes('salad') 
            == false || missingItems.includes('main-course') == false)) {
            if ((missingItems.includes('salad') 
                || missingItems.includes('main-course'))) {
                answer = answer;
            } else {
                answer = "Выбирете главное блюдо/салат/стартер";
            }
        }
        if (missingItems.includes('salad') && (missingItems.includes('soup') 
            == false || missingItems.includes('main-course') == false)) {
            if ((missingItems.includes('soup') 
                | missingItems.includes('main-course'))) {
                answer = answer;
            } else {
                answer = "Выбирете суп или главное блюдо";
            }
        }
    }
    return answer;
}

document.querySelector('a button').addEventListener('click', function(event) {
    if (!isValidOrder()) {
        event.preventDefault(); // Отменяет переход
    }
});

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


document.getElementById("closeModalButton")
    .addEventListener("click", closeModal);