const dishes = [
    {
        keyword: "gazpacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "img/gazpacho.jpg",
        kind: 'veg'
    },
    {
        keyword: "mushroom",
        name: "Грибной суп",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "img/mushroom_soup.jpg",
        kind: 'veg'
    },
    {
        keyword: "ramen",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "img/ramen.jpg",
        kind: 'meat'
    },
    {
        keyword: "norwegian",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "img/norwegian_soup.jpg",
        kind: 'fish'
    },
    {
        keyword: "tomyum",
        name: "Том ям с креветками",
        price: 650,
        category: "soup",
        count: "500 г",
        image: "img/tomyum.jpg",
        kind: 'fish'
    },
    {
        keyword: "chicken",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "img/chicken.jpg",
        kind: 'meat'
    },
    {
        keyword: "fried_potatoes",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        count: "250 г",
        image: "img/friedpotatoeswithmushrooms1.jpg",
        kind: 'veg'
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "310 г",
        image: "img/lasagna.jpg",
        kind: 'meat'
    },
    {
        keyword: "cutlets",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main",
        count: "280 г",
        image: "img/chickencutletsandmashedpotatoes.jpg",
        kind: 'meat'
    },
    {
        keyword: "fishrice",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main",
        count: "270 г",
        image: "img/fishrice.jpg",
        kind: 'fish'
    },
    {
        keyword: "pizza",
        name: "Пицца Маргарита",
        price: 450,
        category: "main",
        count: "470 г",
        image: "img/pizza.jpg",
        kind: 'veg'
    },
    {
        keyword: "shrimppasta",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        count: "280 г",
        image: "img/shrimppasta.jpg",
        kind: 'fish'
    },
    {
        keyword: "orange",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 г",
        image: "img/orangejuice.jpg",
        kind: 'cold'
    },
    {
        keyword: "apple",
        name: "Яблочный сок",
        price: 90,
        category: "drink",
        count: "300 г",
        image: "img/applejuice.jpg",
        kind: 'cold'
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        count: "300 г",
        image: "img/cappuccino.jpg",
        kind: 'hot'
    },
    {
        keyword: "greentea",
        name: "Зеленый чай",
        price: 100,
        category: "drink",
        count: "300 г",
        image: "img/greentea.jpg",
        kind: 'hot'
    },
    {
        keyword: "tea",
        name: "Черный чай",
        price: 90,
        category: "drink",
        count: "300 г",
        image: "img/tea.jpg",
        kind: 'hot'
    },
    {
        keyword: "carrot",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        count: "300 г",
        image: "img/carrotjuice.jpg",
        kind: 'cold'
    },
    {
        keyword: "checheesecake",
        name: "Чизкейк",
        price: 240,
        category: "desert",
        count: "125 г",
        image: "img/checheesecake.jpg",
        kind: 'small'
    },
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "desert",
        count: "300 г",
        image: "img/baklava.jpg",
        kind: 'average'
    },
    {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 270,
        category: "desert",
        count: "140 г",
        image: "img/chocolatecake.jpg",
        kind: 'small'
    },
    {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "desert",
        count: "125 г",
        image: "img/chocolatecheesecake.jpg",
        kind: 'small'
    },
    {
        keyword: "donuts3",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "desert",
        count: "350 г",
        image: "img/donuts2.jpg",
        kind: 'average'
    },
    {
        keyword: "donuts6",
        name: "Пончики (6 штуки)",
        price: 650,
        category: "desert",
        count: "700 г",
        image: "img/donuts.jpg",
        kind: 'big'
    },
    {
        keyword: "coreansaladwithegg",
        name: "Корейский салад с овощами и яйцом",
        price: 330,
        category: "salad",
        count: "250 г",
        image: "img/saladwithegg.jpg",
        kind: 'veg'
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salad",
        count: "235 г",
        image: "img/caprese.jpg",
        kind: 'veg'
    },
    {
        keyword: "tunasalad",
        name: "Салат с тунцом",
        price: 480,
        category: "salad",
        count: "250 г",
        image: "img/tunasalad.jpg",
        kind: 'fish'
    },
    {
        keyword: "frenchfries1",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salad",
        count: "235 г",
        image: "img/frenchfries1.jpg",
        kind: 'veg'
    },
    {
        keyword: "frenchfries2",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salad",
        count: "235 г",
        image: "img/frenchfries2.jpg",
        kind: 'veg'
    },
    {
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "img/caesar.jpg",
        kind: 'meat'
    }
];

export default dishes;

