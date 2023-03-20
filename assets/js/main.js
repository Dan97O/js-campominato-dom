/* 
 Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati
abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina.
Altrimenti
la cella cliccata si colora di azzurro
l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Consigli del giorno: :baby-yoda:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Pensiamo prima al codice senza fare funzioni, poi facendo refactoring implementiamo la funzione corrispondente.
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Eventuali validazioni e controlli possiamo farli anche in un secondo momento. */



/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */









// Seleziono la difficoltà
const selectEl = document.getElementById("difficulty");
let numCells;

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
document.getElementById('generate_grid').addEventListener('click', function () {


  /* Creare una griglia in base alla scelta dell'utente: facile/medio/difficile
   Ogni volta che clicco su un quadrato si colora di azzurro */
  // Creo una variabile dove salvo il container delle n celle (container-grid)
  const container = document.querySelector("main .container");
  //svuoto il containeir
  container.innerHTML = '';

  // creo un max numero di celle
  //+ bonus
  numCells = Number(selectEl.value);
  console.log(numCells);


  // creo un ciclo n volte per le celle
  for (let i = 0; i < numCells; i++) {
    const numCell = Number(i + 1);
    //console.log(numCell);
    const cell = `<div class="cell d-flex align-items-center justify-content-center" style="width: calc(100% / ${Math.sqrt(numCells)}">${numCell}</div>`;
    container.innerHTML += cell;
  }

  // seleziono una cella che ha classe cell 
  const cellEl = document.querySelectorAll(".cell")

  //creo una funzione generateNumbersRandom() che mi genera le bombe
  function generateNumbersRandom() {
    // Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    let arrayRandom = [];
    while (arrayRandom.length < 16) {
      let randomNumber = Math.floor(Math.random() * numCells) + 1;
      //nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
      if (!arrayRandom.includes(randomNumber)) {
        arrayRandom.push(randomNumber);
      }
    }
    return arrayRandom
  }
  // Creo una costante per richiamare la funzione delle bombe random
  const numberRandom = generateNumbersRandom()
  console.log(numberRandom);

  // Creo una variabile let per lo score della partita
  let score = 0;



  // aggiungo eventlisner per la classe active ciclando per la lunghezza dell'array cellEl
  for (let i = 0; i < cellEl.length; i++) {
    const thisCell = cellEl[i];
    console.log(thisCell)

    // Creo un event listener per ogni casella cliccata
    thisCell.addEventListener("click", function () {

      // Aumento lo score per ogni volta che clicco su una casella di gioco
      score++;

      /* creo un if per indicare quando trovo la bomba e ricarico la partita */
      if (numberRandom.includes(Number(thisCell.innerText))) {

        //Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
        thisCell.classList.add("bg_alert");
        setTimeout(() => {
          alert(`BOMBAAAA!! HAI PERSO!, HAI TROVATO n° ${score - 1} CASELLE CORRETTE...CLICCA OK PER RIPROVARE. `);
          location.reload();
        }, 1);

      } else {

        //numero di volte che l’utente ha cliccato su una cella che non era una bomba
        thisCell.classList.toggle("bg_azure")
        console.log(`CASELLE CORRETTE! n° ${score}`);
        
        // Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
        if (score == cellEl.length - 16) {
          alert(`HAI VINTO!! IL TUO PUNTEGGIO E' ${score}`);
          location.reload();
        }
      }
    })
  }
})

