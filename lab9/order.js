let storedDishes = [];
let allDishes = [];
const apiKey = "67c64755-06b2-4aa4-8437-d6ff2bcb5577";
// eslint-disable-next-line max-len
const apiUrl = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`;
function addToOrder(selectedDishes, allDishes) {
    let totalCost = 0; // Инициализация общей стоимости

    Object.entries(selectedDishes).forEach(([category, keyword]) => {
        if (keyword) { // Если блюдо выбрано
            const dish = allDishes.find(d => d.keyword === keyword);
            if (!dish) return; // Пропускаем, если блюдо не найдено

            document.getElementById('nothing').style.display = 'none';
            document.getElementById('selected-dishes').style.display = 'block';

            let infoContainer;
            let hiddenFieldId;

            switch (dish.category) {
            case 'soup':
                if (selectedDishes.soup) {
                    const previousDish = 
                    allDishes.find(d => d.keyword === selectedDishes.soup);
                    totalCost -= previousDish.price;
                }
                selectedDishes.soup = dish.keyword;
                infoContainer = document.getElementById('soup-info');
                break;
            case 'main-course':
                if (selectedDishes['main-course']) {
                    const previousDish = allDishes.
                        find(d => d.keyword === selectedDishes['main-course']);
                    totalCost -= previousDish.price;
                }
                selectedDishes['main-course'] = dish.keyword;
                infoContainer = document.getElementById('entree-info');
                break;
            case 'salad':
                if (selectedDishes.salad) {
                    const previousDish = 
                    allDishes.find(d => d.keyword === selectedDishes.salad);
                    totalCost -= previousDish.price;
                }
                selectedDishes.salad = dish.keyword;
                infoContainer = document.getElementById('salad-info');
                break;
            case 'drink':
                if (selectedDishes.drink) {
                    const previousDish = 
                    allDishes.find(d => d.keyword === selectedDishes.drink);
                    totalCost -= previousDish.price;
                }
                selectedDishes.drink = dish.keyword;
                infoContainer = document.getElementById('drink-info');
                break;
            case 'dessert':
                if (selectedDishes.dessert) {
                    const previousDish = 
                    allDishes.find(d => d.keyword === selectedDishes.dessert);
                    totalCost -= previousDish.price;
                }
                selectedDishes.dessert = dish.keyword;
                infoContainer = document.getElementById('desert-info');
                break;
            default:
                return;
            }

            infoContainer.innerHTML = `${dish.category === 'soup' ? 'Суп' : 
                dish.category === 'main-course' ? 
                    'Основное блюдо' : dish.category === 
                'salad' ? 'Салат' : dish.category === 
                'drink' ? 'Напиток' : 'Десерт'}
                :<br>${dish.name} - ${dish.price}&#8381;`;

            totalCost += dish.price;
            hiddenFieldId = `selected-${dish.category}`;
            document.getElementById(hiddenFieldId).value = dish.keyword;

    
            totalCost += dish.price;
            document.getElementById('total-cost').style.display = 'block';
            document.getElementById('cost-value').textContent = totalCost;
        }
        
    });

    // Обновляем общую стоимость
    document.getElementById('total-cost').
        style.display = totalCost > 0 ? 'block' : 'none';
    document.getElementById('cost-value').textContent = totalCost;
}


function displayDishes(storedDishes, allDishes) {
    const container = document.getElementById('selected-dishes-list');
    container.innerHTML = ""; // Очищаем контейнер

    Object.entries(storedDishes).forEach(([category, keyword]) => {
        if (keyword) { // Если блюдо выбрано
            const dish = allDishes.find(d => d.keyword === keyword);
            if (dish) {
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
                    <button class="btn")" onclick="removeDish('${category}')">
                        <span class="buy">Удалить</span>
                    </button>
                </div>
            </div>
        `;
                container.appendChild(card);
            }
        }
    });
}

function removeDish(category) {
    delete storedDishes[category];
    localStorage.setItem('selectedDishes', JSON.stringify(storedDishes));
    displayDishes(storedDishes, allDishes);
    addToOrder(storedDishes, allDishes);
}

document.addEventListener('DOMContentLoaded', async () => {
    storedDishes = JSON.parse(localStorage.getItem('selectedDishes'));
    if (!storedDishes) {
        console.log("Нет сохраненных данных");
        return;
    }

    const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
    try {
        const response = await fetch(apiUrl);
        allDishes = await response.json();

        displayDishes(storedDishes, allDishes);
        addToOrder(storedDishes, allDishes);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
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
        .every(([key, required]) => !required || storedDishes[key] !== null));
}
function getMissingItemsMessage() {
    const requiredCategories = 
    ['soup', 'main-course', 'salad', 'drink', 'dessert'];
    const missingItems = 
    requiredCategories.filter(category => storedDishes[category] !== null);
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

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = "block";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function sendSelectedDishesToServer() {
    const formData = new FormData(document.querySelector('form'));

    formData.delete('soup');
    formData.delete('salad');
    formData.delete('drink');
    formData.delete('dessert');
    formData.delete('main-course');
    // Добавляем дополнительные параметры (категории и id блюда)
    const getDishIdByKeyword = (keyword) => {
        const dish = allDishes.find(d => d.keyword === keyword);
        return dish ? dish.id : "";
    };

    // Добавляем id блюд
    formData.append('soup_id', getDishIdByKeyword(storedDishes.soup));
    formData.append('main_course_id', 
        getDishIdByKeyword(storedDishes['main-course']));
    formData.append('salad_id', getDishIdByKeyword(storedDishes.salad));
    formData.append('drink_id', getDishIdByKeyword(storedDishes.drink));
    formData.append('dessert_id', getDishIdByKeyword(storedDishes.dessert));

    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    console.log('Отправляемые данные:', formDataObject);

    fetch(apiUrl, {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                showModal("Заказ успешно отправлен!");
                storedDishes = {}; // Очистка выбранных блюд
                localStorage.setItem('selectedDishes', 
                    JSON.stringify(storedDishes));
                displayDishes(storedDishes, allDishes);
                addToOrder(storedDishes, allDishes);
            } else {
                showModal("Ошибка при отправке заказа.");
            }
        })
        .catch(error => {
            console.error("Ошибка при отправке данных:", error);
            showModal("Произошла ошибка, попробуйте позже.");
        });
}


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    if (isValidOrder()) {
        sendSelectedDishesToServer();
    } else {
        showModal(getMissingItemsMessage());
    }
});

document.getElementById("closeModalButton")
    .addEventListener("click", closeModal);

async function deleteAllOrders() {
    try {
        const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
        const orders = await response.json();
    
        for (const order of orders) {
            const orderId = order.id;
            const deleteResponse = 
            await fetch(`${apiUrl}/${orderId}?api_key=${apiKey}`, {
                method: "DELETE",
            });
    
            if (deleteResponse.ok) {
                console.log(`Заказ с ID ${orderId} успешно удалён.`);
            } else {
                console.error(`Ошибка при удалении заказа с 
                    ID ${orderId}:`, await deleteResponse.text());
            }
        }
        console.log("Все заказы удалены.");
    } catch (error) {
        console.error("Ошибка при выполнении операции:", error);
    }
}
