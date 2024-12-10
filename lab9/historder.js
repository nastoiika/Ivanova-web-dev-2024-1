let orders = [];
let allDishes = [];
const apiKey = "67c64755-06b2-4aa4-8437-d6ff2bcb5577";

function closeModal() {
    document.getElementById("editOrderModal").style.display = "none";
}

function closeModal1() {
    document.getElementById("modal").style.display = "none";
}


function populateSelectOptions(selectId, dishes, selectedValue) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '<option value="">Select option</option>';
    
    dishes.forEach(dish => {
        const option = document.createElement('option');
        option.value = dish.id;
        option.textContent = dish.name;
        if (dish.id === selectedValue) option.selected = true;
        selectElement.appendChild(option);
    });
}

function openEditOrderModal(orderId) {
    console.log("ok");
    
    // Проверяем наличие модального окна в DOM
    const modal = document.getElementById('editOrderModal');
    if (!modal) {
        console.error('Модальное окно не найдено в DOM');
        return;
    }
    
    // Устанавливаем стиль отображения в 'block'
    modal.style.display = 'block';
    
    // Находим форму внутри модального окна
    const form = modal.querySelector('form');
    if (!form) {
        console.error('Форма не найдена в модальном окне');
        return;
    }
    
    // Получаем данные заказа из API
    // eslint-disable-next-line max-len
    fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.order) {
                const order = data.order;
                
                // Заполняем поля формы данными заказа
                document.getElementById('full_name').value = order.full_name;
                document.getElementById('email').value = order.email;
                document.getElementById('phone').value = order.phone;
                // eslint-disable-next-line max-len
                document.getElementById('delivery_address').value = order.delivery_address;
                
                // Устанавливаем значение чекбокса для подписки
                document.getElementById('subscribe').checked = order.subscribe;
                
                // Заполняем выпадающие списки блюдами
                populateSelectOptions('soup', allDishes, order.soup_id);
                // eslint-disable-next-line max-len
                populateSelectOptions('mainCourse', allDishes, order.main_course_id);
                populateSelectOptions('salad', allDishes, order.salad_id);
                populateSelectOptions('drink', allDishes, order.drink_id);
                populateSelectOptions('dessert', allDishes, order.dessert_id);
                
                // Устанавливаем значение радио-кнопки для типа доставки
                document.getElementById('now')
                    .checked = order.delivery_type === 'now';
                document.getElementById('by_time')
                    .checked = order.delivery_type === 'by_time';
                
                // Устанавливаем значение поля времени доставки
                document.getElementById('delivery_time')
                    .value = order.delivery_time || '';
                
                // Устанавливаем значение поля комментария
                document.getElementById('comment').value = order.comment || '';
            } else {
                console.error('Данные заказа не найдены в ответе');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных заказа:', error);
        });
}
  
document.addEventListener('click', (event) => {
    if (event.target.matches('.edit-button')) {
        openEditOrderModal(event.target.dataset.orderId);
    }
});

function editOrder() {
    const form = document.getElementById('editOrderForm');
    const orderId = document.getElementById('orderId').value;
  
    // eslint-disable-next-line max-len
    fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            soup_id: document.getElementById('soup').value,
            main_course_id: document.getElementById('mainCourse').value,
            salad_id: document.getElementById('salad').value,
            drink_id: document.getElementById('drink').value,
            dessert_id: document.getElementById('dessert').value,
            comment: document.getElementById('comment').value
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order updated successfully:', data);
            displayDishes(orders, allDishes); // Update the orders list
            closeModal();
        })
        .catch(error => console.error('Error updating order:', error));
}


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


function showModal(orderId) {
    nowOrderId = orderId;
    const modal = document.getElementById('modal');
    modal.style.display = "block";

    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    confirmDeleteButton.onclick = () => {
        removeOrder(nowOrderId);
        closeModal1();
    };

    cancelDeleteButton.onclick = closeModal1;
}

function formatDateTime(datetimeString) {
    const date = new Date(datetimeString);

    const day = String(date.getDate()).padStart(2, '0'); // Дата
    const month = 
    String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


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

function displayDishes(orders, allDishes) {
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
        
        
        // Кнопка "Редактировать"
        const editButton = document.createElement('button');
        editButton.className = 'btn';
        editButton.textContent = 'Редактировать';
        editButton.setAttribute('data-toggle', 'modal');
        editButton.setAttribute('data-target', '#editOrderModal');
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

