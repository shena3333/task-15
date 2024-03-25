// Задача: Создание интерактивного каталога информационных сайтов
// Цель:
// Разработать веб-страницу, которая отображает каталог информационных сайтов, разделенных по категориям. Пользователь должен иметь возможность 
//просматривать сайты по категории, а также искать сайт по ключевым словам.
// Технические требования:
// Переменные с объектами: Создайте минимум 5 переменных, каждая из которых будет содержать объект. Эти объекты будут представлять собой
// категории (например, "Наука", "Образование", "Технологии") и содержать информацию о сайтах в каждой категории.
// Массивы: Создайте 3 массива, которые будут использоваться для хранения:
// Списка категорий
// Списка всех сайтов для поиска
// Методы работы с объектами и массивами:
// Используйте Object.keys(), Object.values(), и Object.entries() для работы с объектами категорий и сайтов.
// Примените forEach для итерации по массивам.
// Используйте map для создания нового массива результатов поиска, основанного на пользовательском вводе.
// Работа с DOM:
// Динамически создавайте элементы на странице для отображения категорий и соответствующих сайтов. Используйте методы document.createElement(),
// appendChild(), и манипуляции с innerHTML или textContent.
// Реализуйте обработчики событий для пользовательского ввода, такие как поиск по ключевым словам и выбор категории.
// Подробная реализация:
// Структура данных:
// Создайте объекты для каждой категории с информацией о сайтах. Например:

// Массив категорий может выглядеть так:

// Массив всех сайтов и результатов поиска изначально пустые и будут заполняться динамически.
// Работа с DOM:
// Создайте функциональность для отображения сайтов по категориям. При выборе категории на странице должны отображаться соответствующие сайты.
// Реализуйте поле поиска для поиска по всем сайтам. Используйте метод filter для фильтрации массива сайтов по ключевому слову.
// Реализуйте возможность добавления новых сайтов пользователями в существующие категории.
// Создайте функционал для оценки сайтов пользователями с обновлением информации в реальном времени.
const searchInput = document.querySelector('#searchInput');
const categoriesContainer = document.querySelector('#categories');
const sites = document.querySelector('#sites');
const scienceInput = document.querySelector('#science');
const educationInput = document.querySelector('#education');
const technologyInput = document.querySelector('#technology');
const addSite = document.querySelector('.addSite');
const newUrl = document.querySelector('#newUrl');
const keys = document.querySelector('#keys');
const siteCategory = document.querySelector('#siteCategory');
const allInput = [scienceInput, technologyInput, educationInput];

let arraySites = [];
let scienceSites = [
    {
        url: "https://www.nasa.gov",
        keyWord: 'NASA',
        like: 0
    },
    {
        url: "https://www.nature.com",
        keyWord: 'nature,природа',
        like: 0
    }
];
let educationSites = [
    {
        url: "https://spbu.ru/",
        keyWord: 'Санкт-Петербургский государственный университет, СПбГУ',
        like: 0
    },
    {
        url: "https://msu.ru/",
        keyWord: 'МГУ, Московский государственный университет имени М. В. Ломоносова',
        like: 0
    }
];
let technologySites = [
    {
        url: "https://ntcontest.ru/",
        keyWord: 'НАЦИОНАЛЬНАЯ ТЕХНОЛОГИЧЕСКАЯ ОЛИМПИАДА, наука, технология',
        like: 0
    },
    {
        url: "https://newtechology.mkgtu.ru/jour",
        keyWord: 'Научный журнал, Новые технологии ',
        like: 0
    }
];
const allSite = scienceSites.concat(...educationSites, ...technologySites);

//отрисовка массива с сайтами
function displaySites(arraySites) {
    arraySites.map(site => {
        const infoSite = document.createElement('div');
        infoSite.textContent = `${site}`;
        const btnLike = document.createElement('button');
        btnLike.onclick = () => like(site);
        btnLike.className = 'btnLike';
        infoSite.append(btnLike);
        const needSite = allSite.find(need => need.url == site);
        const infoLike = document.createElement('span');
        infoLike.textContent = `Понравилось ${needSite.like}`;
        infoSite.className='infoSite';
        infoSite.append(infoLike);
        sites.append(infoSite)
    })
};
function like(needUrl) {
    const needSite = allSite.find(need => need.url == needUrl);
    needSite.like++;
    sites.textContent = '';
    displaySites(arraySites)
}
// отрисовка сайтов по категориям
allInput.forEach(input => input.addEventListener('click', activeChecbox))
function activeChecbox() {
    cleanSites();
    if (scienceInput.checked) {
        const needSite = scienceSites.map(site => site.url);
        arraySites.push(...needSite);
    };
    if (educationInput.checked) {
        const needSite = educationSites.map(site => site.url);
        arraySites.push(...needSite);
    };
    if (technologyInput.checked) {
        const needSite = technologySites.map(site => site.url);
        arraySites.push(...needSite);
    };
    displaySites(arraySites)
};
//добавление нового сайта
addSite.addEventListener('click', (event) => {
    event.preventDefault();
    const newSite = {
        url: newUrl.value.trim(),
        keyWord: keys.value.trim(),
        like: 0,
    };
    siteCategory.value === 'наука' && scienceSites.push(newSite);
    siteCategory.value === 'образование' && educationSites.push(newSite);
    siteCategory.value === 'технология' && technologySites.push(newSite);
    allSite.push(newSite);
    newUrl.value = '';
    keys.value = '';
    activeChecbox()
});
// поиск сайта по ключевым словам
function searchSites() {
    cleanSites();
    allInput.forEach(input => input.checked = false);
    const needSite = allSite
        .filter(site => site.keyWord.toLowerCase().includes(searchInput.value.toLowerCase()))
        .map(site => site.url);
    if (needSite.length == 0) {
        sites.textContent = 'По вашему запросу ничего не найдено. Уточните запрос.'
    } else {
        arraySites.push(...needSite);
        console.log(needSite)
        displaySites(arraySites)
    };
};
function cleanSites() {
    arraySites = [];
    sites.textContent = '';
}
displaySites(arraySites);