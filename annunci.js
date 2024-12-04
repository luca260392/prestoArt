// animazione navbar - cambia colore scroll
let navbar = document.querySelector(`nav`);

window.addEventListener(`scroll`, ()=>{
    if(window.scrollY > 700){
        navbar.classList.add(`navScroll`);
    }else{
        navbar.classList.remove(`navScroll`);
    }
});





let data = []; // Variabile globale per memorizzare i dati originali
let containerCards = document.querySelector(`#containerCards`);
let containerCategory = document.querySelector('#containerCategory');
let priceValue = document.querySelector('#priceValue');
let priceInput = document.querySelector('#priceInput');
let wordInput = document.querySelector('#wordInput');

// Funzione per caricare i dati e inizializzare la pagina
function initializePage() {
    fetch(`./annunci.json`)
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData.sort((a, b) => a.price - b.price);
            showCards(data);
            radioCreate();
            setPriceinput();
        })
        .catch(error => console.error('Errore nel caricamento dei dati:', error));
}



// ordinamento casuale iniziale
function initializePage() {
    fetch(`./annunci.json`)
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData;
            shuffleArray(data); // Ordine casuale iniziale
            showCards(data);
            radioCreate();
            setPriceinput();
            setupPriceSorting();
        })
        .catch(error => console.error('Errore nel caricamento dei dati:', error));
}




function showCards(array) {
    containerCards.innerHTML = ''; // Pulisce il contenitore prima di aggiungere nuove cards
    array.forEach(card => {
        let div = document.createElement(`div`);
        div.classList.add('col-12', 'col-sm-6', 'col-lg-3', 'my-4')
        div.innerHTML = `<div class="card" style="width: 19rem;">
            <img src="${card.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.category}</p>
                <p class="card-text fw-light">${card.price} €</p>
                <a href="#" class="btn">Scopri i dettagli</a>
            </div>
            </div>`
        containerCards.appendChild(div)
    });
}




// Funzione per mescolare array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}




//Funzione per impostare gli event listener dell'ordinamento prezzo
function setupPriceSorting() {
    const sortAsc = document.querySelector('#sortAsc');
    const sortDesc = document.querySelector('#sortDesc');

    sortAsc.addEventListener('click', () => {
        let filteredData = getCurrentFilteredData();
        filteredData.sort((a, b) => a.price - b.price);
        showCards(filteredData);
    });

    sortDesc.addEventListener('click', () => {
        let filteredData = getCurrentFilteredData();
        filteredData.sort((a, b) => b.price - a.price);
        showCards(filteredData);
    });
}




// Funzione per ottenere i dati attualmente filtrati
function getCurrentFilteredData() {
    let currentCategory = document.querySelector('.form-check-input:checked')?.id || 'All';
    let filtratiPerCategoria = filterByCategories(currentCategory);
    let filtratiPerPrezzo = filterByPrice(filtratiPerCategoria);
    return filterByWord(filtratiPerPrezzo);
}




// Funzione per resettare tutti i filtri
function resetAllFilters() {
    // Reset categoria
    const allCategoryRadio = document.querySelector('#All');
    if (allCategoryRadio) allCategoryRadio.checked = true;

    // Reset prezzo
    setPriceinput();

    // Reset ordinamento prezzo
    const priceRadios = document.querySelectorAll('input[name="sortPrice"]');
    priceRadios.forEach(radio => radio.checked = false);

    // Reset input testo
    wordInput.value = '';

    // Mostra cards in ordine casuale
    shuffleArray(data);
    showCards(data);
}




// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializePage();

    // Event listener per il pulsante reset
    const resetButton = document.querySelector('#resetFilters');
    resetButton.addEventListener('click', resetAllFilters);
});




function filterByCategories(categoria, array = data) {
    if (categoria && categoria !== 'All') {
        return array.filter(annuncio => annuncio.category === categoria);
    }
    return array;
}

function filterByPrice(array = data) {
    return array.filter(annuncio => Number(annuncio.price) <= priceInput.value);
}

function filterByWord(array = data) {
    const searchTerm = wordInput.value.toLowerCase();
    return array.filter(annuncio => annuncio.name.toLowerCase().includes(searchTerm));
}

function globalFilter() {
    let currentCategory = document.querySelector('.form-check-input:checked')?.id || 'All';
    let filtratiPerCategoria = filterByCategories(currentCategory);
    let filtratiPerPrezzo = filterByPrice(filtratiPerCategoria);
    let filtratiPerParola = filterByWord(filtratiPerPrezzo);
    showCards(filtratiPerParola);
}





function radioCreate() {
    containerCategory.innerHTML = ''; // Pulisce il contenitore prima di aggiungere nuovi radio buttons
    let categories = ['All', ...new Set(data.map(annuncio => annuncio.category))];
    categories.forEach(categoria => {
        let div = document.createElement(`div`);
        div.classList.add('form-check');
        div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}" ${categoria === 'All' ? 'checked' : ''}>
            <label class="form-check-label" for="${categoria}">
                ${categoria === 'All' ? 'Tutte le categorie' : categoria}
            </label>`;
        containerCategory.appendChild(div);
    });

    document.querySelectorAll('.form-check-input').forEach(btn => {
        btn.addEventListener('click', globalFilter);
    });
}




function setPriceinput() {
    let prices = data.map(annuncio => Number(annuncio.price));
    let maxPrice = Math.max(...prices);
    priceInput.max = maxPrice;
    priceInput.value = maxPrice;
    priceValue.innerHTML = `${maxPrice} €`;
}



// Event listeners
priceInput.addEventListener('input', () => {
    priceValue.innerHTML = `${priceInput.value} €`;
    globalFilter();
});

wordInput.addEventListener('input', globalFilter);

// Inizializza la pagina
document.addEventListener('DOMContentLoaded', initializePage);



