let filterSelected = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    desert: null
};

function showAllDishesInContainer(container) {
    let menuItems = container.querySelectorAll(".product-card");
    for (let menuItem of menuItems) {
        menuItem.style.display = "flex";
    }
}

function filter(event) {
    let section = event.target.closest("section");
    let container = section.querySelector(".cards");
    let category = section.className;
    let childrenSection = container.children;

    for (let menuItem of childrenSection) {
        if (menuItem.classList.contains(event.target.getAttribute("data-kind"))) {
            menuItem.style.display = "flex";
        } else {
            menuItem.style.display = "none";
        }
    }

    if (!filterSelected[category]) {
        event.target.classList.add("active");
        filterSelected[category] = event.target;
    } else if (filterSelected[category] === event.target) {
        filterSelected[category].classList.remove("active");
        showAllDishesInContainer(container);
        filterSelected[category] = null;
    } else {
        filterSelected[category].classList.remove("active");
        event.target.classList.add("active");
        filterSelected[category] = event.target;
    }
}

let filterButtons = document.getElementsByClassName('filtr');
for (let button of filterButtons) {
    button.addEventListener("click", filter);
}