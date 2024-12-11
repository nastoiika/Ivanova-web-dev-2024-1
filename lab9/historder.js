let orders = [];
let allDishes = [];
const apiKey = "67c64755-06b2-4aa4-8437-d6ff2bcb5577";
//для редактировать
function closeModal() {
    document.getElementById("editOrderModal").style.display = "none";
}
//для удалить
function closeModal1() {
    document.getElementById("modal").style.display = "none";
}

function closeModal2() {
    document.getElementById("modal2").style.display = "none";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//посчет суммы
function calculateOrderCost(order, allDishes) {
    let totalCost = 0;

    if (order.soup_id) {
        const dish = allDishes.find(d => d.id === order.soup_id);
        if (dish) totalCost += dish.price;
    }
    if (order.main_course_id) {
        const dish = allDishes.find(d => d.id === order.main_course_id);
        if (dish) totalCost += dish.price;
    }
    if (order.salad_id) {
        const dish = allDishes.find(d => d.id === order.salad_id);
        if (dish) totalCost += dish.price;
    }
    if (order.drink_id) {
        const dish = allDishes.find(d => d.id === order.drink_id);
        if (dish) totalCost += dish.price;
    }
    if (order.dessert_id) {
        const dish = allDishes.find(d => d.id === order.dessert_id);
        if (dish) totalCost += dish.price;
    }

    return totalCost;
}

//настройка даты
function formatDateTime(datetimeString) {
    const date = new Date(datetimeString);

    const day = String(date.getDate()).padStart(2, '0'); 
    const month = 
    String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function displayOrderDetailsInModal(order) {
    const orderItemsContainer = document.querySelector('.orderItems');
    orderItemsContainer.innerHTML = ""; // Очистка контейнера перед заполнением

    const categories = {
        soup: 'Суп',
        main_course: 'Основное блюдо',
        salad: 'Салат',
        drink: 'Напиток',
        dessert: 'Десерт'
    };

    // Перебираем каждый ключ из объекта категорий
    Object.keys(categories).forEach(category => {
        const dishId = order[`${category}_id`];
        const dish = allDishes.find(d => d.id === dishId);
        if (dish) {
            const categoryText = categories[category];
            const dishText = capitalize(dish.name);

            // Создание элемента с категорией и блюдом
            const itemDiv = document.createElement('div');
            itemDiv.className = 'order-item';
            itemDiv.textContent = `${categoryText}: ${dishText}`;

            orderItemsContainer.appendChild(itemDiv);
        }
    });
}

//функция для редактирования заказа

  
//функция для удаления
function removeOrder(orderId) {
    // eslint-disable-next-line max-len
    const apiUrl = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`;

    fetch(apiUrl, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log(`Заказ с ID ${orderId} успешно удалён.`);
            // Удаление заказа из DOM
            document.querySelector(`[data-order-id="${orderId}"]`)
                .closest('.flex-container').remove();
        } else {
            console.error(`Ошибка при удалении заказа с ID ${orderId}
                :`, response.statusText);
        }
    }).catch(error => console.error("Ошибка при выполнении операции:", error));
}

//модальное окно удаления
function showModal(orderId) {
    const modal = document.getElementById('modal');
    modal.style.display = "block";

    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    confirmDeleteButton.onclick = () => {
        removeOrder(orderId);
        closeModal1();
    };

    cancelDeleteButton.onclick = closeModal1;
}

function showModal2(orderId) {
    const modal = document.getElementById('modal2');
    modal.style.display = "block";

    const closeButton = document.getElementById('closeButton');

    // eslint-disable-next-line max-len
    fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(order => {
            if (order.id) {
                const orderDateElement = modal.querySelector('.order-date');
                orderDateElement.textContent = 
                `Дата оформления: ${formatDateTime(order.created_at)}`;

                const fullNameElement = modal.querySelector('.order-fullname');
                fullNameElement.textContent = `ФИО: ${order.full_name}`;

                const addElement = modal.querySelector('.order-adres');
                addElement.textContent = `Адрес: ${order.delivery_address}`;
                
                const emailElement = modal.querySelector('.order-email');
                emailElement.textContent = `Email: ${order.email}`;
                
                const phoneElement = modal.querySelector('.order-phone');
                phoneElement.textContent = `Телефон: ${order.phone}`;

                const orderSumm = modal.querySelector('.order-summ');
                orderSumm.textContent = 
                `Общая стоимость: ${calculateOrderCost(order, allDishes)}`;
                displayOrderDetailsInModal(order);

                if (order.comment) {
                    const commentElement = 
                    modal.querySelector('.order-comment');
                    commentElement.textContent = `Коментарий: ${order.comment}`;
                }

                displayOrderDetailsInModal(order);
                
            } else {
                console.error('Данные заказа не найдены в ответе');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных заказа:', error);
        });

    closeButton.onclick = () => {
        closeModal2();
    };
    cancelDeleteButton.onclick = closeModal2;

}

//перечесление блюд
function getOrderItems(order, allDishes) {
    const items = [];

    if (order.soup_id) {
        const dish = allDishes.find(d => d.id === order.soup_id);
        items.push(dish ? dish.name : 'Не указано');
    }
    if (order.main_course_id) {
        const dish = allDishes.find(d => d.id === order.main_course_id);
        items.push(dish ? dish.name : 'Не указано');
    }
    if (order.salad_id) {
        const dish = allDishes.find(d => d.id === order.salad_id);
        items.push(dish ? dish.name : 'Не указано');
    }
    if (order.drink_id) {
        const dish = allDishes.find(d => d.id === order.drink_id);
        items.push(dish ? dish.name : 'Не указано');
    }
    if (order.dessert_id) {
        const dish = allDishes.find(d => d.id === order.dessert_id);
        items.push(dish ? dish.name : 'Не указано');
    }

    return items.join(', ');
}
//загркзка всех заказов
async function fetchAndLogOrders() {
    const apiKey = "67c64755-06b2-4aa4-8437-d6ff2bcb5577";
    const apiUrl = 
    `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
        }

        orders = await response.json();

        console.log("Полученные данные заказов:", orders);
    } catch (error) {
        console.error("Ошибка при загрузке данных заказов:", error);
    }
}
//отображение заказов
function displayDishes (orders, allDishes) {
    const container = document.getElementById('order-list');
    container.innerHTML = ""; // Очищаем контейнер

    
    orders.forEach((order, index) => {
        const row = document.createElement('div');
        row.className = 'flex-container';

        const orderId = document.createElement('div');
        orderId.className = 'flex-item';
        orderId.textContent = index + 1;

        const orderDate = document.createElement('div');
        orderDate.className = 'flex-item';
        orderDate.textContent = formatDateTime(order.created_at);

        const orderItems = document.createElement('div');
        orderItems.className = 'flex-item';
        orderItems.textContent = getOrderItems(order, allDishes);

        const orderCost = document.createElement('div');
        orderCost.className = 'flex-item';
        orderCost.textContent = calculateOrderCost(order, allDishes) + ' ₽';

        const deliveryTime = document.createElement('div');
        deliveryTime.className = 'flex-item';
        // eslint-disable-next-line max-len
        deliveryTime.textContent = order.delivery_time ? order.delivery_time : 'Как можно скорее';

        const actions = document.createElement('div');
        actions.className = 'flex-item';
        
        // Кнопка "Удалить"
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn';
        deleteButton.textContent = 'Удалить';
        deleteButton.setAttribute('data-order-id', order.id);
        deleteButton.onclick = () => showModal(order.id);
        
        // Кнопка "Подробнее"
        const detailButton = document.createElement('button');
        detailButton.className = 'btn';
        detailButton.textContent = 'Подробнее';
        detailButton.setAttribute('data-order-id', order.id);
        detailButton.onclick = () => showModal2(order.id);
        
        
        // Кнопка "Редактировать"
        const editButton = document.createElement('button');
        editButton.className = 'btn';
        editButton.textContent = 'Редактировать';
        editButton.setAttribute('data-order-id', order.id);
        editButton.onclick = () => openEditOrderModal(order.id);
        
        // Добавляем все три кнопки в div.actions
        actions.appendChild(deleteButton);
        actions.appendChild(detailButton);
        actions.appendChild(editButton);

        row.appendChild(orderId);
        row.appendChild(orderDate);
        row.appendChild(orderItems);
        row.appendChild(orderCost);
        row.appendChild(deliveryTime);
        row.appendChild(actions);

        container.appendChild(row);
    });
}

function editOrder(event, orderId) {
    event.preventDefault();
    const form = document.getElementById('editOrderForm');

    let requestBody = {
        full_name: document.getElementById('full_name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        delivery_address: document.getElementById('delivery_address').value,
        subscribe: document.getElementById('subscribe').checked,
        // eslint-disable-next-line max-len
        delivery_type: document.querySelector('input[name="delivery_type"]:checked').value,
    };
    console.log(requestBody);

    const deliveryTimeElement = document.getElementById('delivery_time');
    if (deliveryTimeElement) {
        requestBody.delivery_time = deliveryTimeElement.value;
    }
    const commentElement = document.getElementById('comment');
    if (commentElement) {
        requestBody.comment = commentElement.value;
    }

    // eslint-disable-next-line max-len
    fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    }) 
        .then(response => response.json()) 
        .then(data => {
            console.log('Order updated successfully:', data);
            displayDishes(orders, allDishes);
            closeModal();
        }) .catch(error => console.error('Error updating order:', error));
}

//модальное окно редактировать
function openEditOrderModal(orderId) {
    const modal = document.getElementById('editOrderModal');
    const form = modal.querySelector('form');
    modal.style.display = 'block';
    // Получаем данные заказа из API
    // eslint-disable-next-line max-len
    fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(order => {
            if (order.id) {
                // Заполняем поля формы данными заказа
                document.getElementById('full_name').value = order.full_name;
                document.getElementById('email').value = order.email;
                document.getElementById('phone').value = order.phone;
                // eslint-disable-next-line max-len
                document.getElementById('delivery_address').value = order.delivery_address;
                document.getElementById('subscribe').checked = order.subscribe;
                // eslint-disable-next-line max-len
                document.getElementById('now').checked = order.delivery_type === 'now';
                // eslint-disable-next-line max-len
                document.getElementById('by_time').checked = order.delivery_type === 'by_time';
                if (order.delivery_time) {
                    document.getElementById('delivery_time')
                        .value = order.delivery_time || '';
                }
                if (order.comment) {
                    document.getElementById('comment').value 
                    = order.comment;
                }
                const orderDateElement = modal.querySelector('.order-date');
                orderDateElement.textContent = 
                `Дата оформления: ${formatDateTime(order.created_at)}`;
                const orderSumm = modal.querySelector('.order-summ');
                orderSumm.textContent = 
                `Общая стоимость: ${calculateOrderCost(order, allDishes)}`;
                displayOrderDetailsInModal(order);
                
            } else {
                console.error('Данные заказа не найдены в ответе');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных заказа:', error);
        });
    form.addEventListener('submit', (event) => editOrder(event, orderId));
}


//загркжаем данные о всех блюдах
document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
    fetchAndLogOrders();
    try {
        const response = await fetch(apiUrl);
        allDishes = await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
    displayDishes(orders, allDishes);
});

