document.addEventListener('DOMContentLoaded', function() {


// animiazione icon toggler
    const navbarToggler = document.querySelector('.navbar-toggler');
    const togglerIcon = navbarToggler.querySelector('.bi');

    navbarToggler.addEventListener('click', function() {
        if (togglerIcon.classList.contains('bi-three-dots')) {
            togglerIcon.classList.remove('bi-three-dots');
            togglerIcon.classList.add('bi-three-dots-vertical');
        } else {
            togglerIcon.classList.remove('bi-three-dots-vertical');
            togglerIcon.classList.add('bi-three-dots');
        }
    });




// animazione navbar - cambia colore scroll
    let navbar = document.querySelector(`nav`);

    window.addEventListener(`scroll`, ()=>{
        if(window.scrollY > 700){
            navbar.classList.add(`navScroll`);
        }else{
            navbar.classList.remove(`navScroll`);
        }
    });




// animazione counter
    let firstNum = document.querySelector(`#firstNum`);
    let secondNum = document.querySelector(`#secondNum`);
    let thirdNum = document.querySelector(`#thirdNum`);

    let check = true;

    function createInterval(n, element, time){
        let counter = 0;
        let interval = setInterval(()=>{
            if (counter < n){
                counter++;
                element.innerHTML = counter;
            }else{
                clearInterval(interval)
            }
        }, time)

        setTimeout(()=>{
            check = true;
        }, 5000);
    }

    let observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                createInterval(10, firstNum, 100);
                createInterval(100, secondNum, 10);
                createInterval(200, thirdNum, 5);
                check = false;
            }
        })
    })
    observer.observe(firstNum)
});




// Seleziona elementi necessari
let darkModeIcon = document.querySelector('#darkModeToggle');
let lightModeIcon = document.querySelector('#lightModeToggle');
let body = document.querySelector('body');
let navbar = document.querySelector('.navbar');

// Impostazione iniziale
document.addEventListener('DOMContentLoaded', () => {
    // Assicurati che la dark mode sia disattivata all'avvio
    body.classList.remove('dark-mode');
    // Mostra solo l'icona della luna inizialmente
    darkModeIcon.style.display = 'block';
    lightModeIcon.style.display = 'none';
});

// Toggle Dark Mode
darkModeIcon.addEventListener('click', () => {
    body.classList.add('dark-mode');
    darkModeIcon.style.display = 'none';
    lightModeIcon.style.display = 'block';
});

// Toggle Light Mode
lightModeIcon.addEventListener('click', () => {
    body.classList.remove('dark-mode');
    darkModeIcon.style.display = 'block';
    lightModeIcon.style.display = 'none';
});

// Gestione scroll navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('navScroll');
    } else {
        navbar.classList.remove('navScroll');
    }
});





// Raggruppiamo tutte le funzionalità in una singola funzione di inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per gestire il testo espandibile
    function initializeReadMore() {
        // Selezioniamo gli elementi necessari
        const readMoreBtn = document.querySelector('.read-more-btn');
        const textContent = document.querySelector('.expandable-text');

        // Verifichiamo che gli elementi esistano nella pagina
        if (!readMoreBtn || !textContent) {
            console.log('Elementi non trovati nella pagina');
            return;
        }

        // Funzione per gestire l'espansione del testo
        function toggleText() {
            console.log('Pulsante cliccato'); // Debug
            textContent.classList.toggle('expanded');

            // Aggiorniamo il testo del pulsante
            if (textContent.classList.contains('expanded')) {
                readMoreBtn.textContent = 'Mostra meno';
                // Scrolliamo dolcemente verso l'inizio del testo
                textContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                readMoreBtn.textContent = 'Leggi di più';
            }
        }

        // Aggiungiamo l'evento click al pulsante
        readMoreBtn.addEventListener('click', toggleText);

        // Impostiamo lo stato iniziale in base alla dimensione dello schermo
        function setInitialState() {
            if (window.innerWidth <= 820) {
                textContent.classList.remove('expanded');
                readMoreBtn.style.display = 'block';
                readMoreBtn.textContent = 'Leggi di più';
            } else {
                textContent.classList.add('expanded');
                readMoreBtn.style.display = 'none';
            }
        }

        // Chiamiamo la funzione all'avvio
        setInitialState();

        // Aggiungiamo un listener per il ridimensionamento della finestra
        window.addEventListener('resize', setInitialState);
    }

    // Inizializziamo la funzionalità
    initializeReadMore();
});