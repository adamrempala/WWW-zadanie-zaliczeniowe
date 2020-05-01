function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

const quizcont =
    [
        {
            "id": 1,
            "text": "W którym roku miała miejsce bitwa pod Poitiers?",
            "answer": 732,
            "penalty": 30,
            "image": 'img/1.jpeg'
        },
        {
            "id": 2,
            "text": "W którym roku podpisano traktat z Verdun, skutkujący rozpadem państwa Franków?",
            "answer": 843,
            "penalty": 30,
            "image": 'img/2.png'
        },
        {
            "id": 3,
            "text": "W którym roku katedra w Lincoln stała się najwyższą budowlą na świecie, przewyższając piramidę Cheopsa?",
            "answer": 1311,
            "penalty": 70,
            "image": 'img/3.jpeg'
        },
        {
            "id": 4,
            "text": "W którym roku miała miejsce Hidżra, ucieczka Mahometa z Mekki do Medyny?",
            "answer": 622,
            "penalty": 20,
            "image": 'img/4.jpg'
        },
        {
            "id": 5,
            "text": "W którym roku szlachta polska i litewska podpisały unię w Horodle?",
            "answer": 1413,
            "penalty": 50,
            "image": 'img/5.jpeg'
        },
        {
            "id": 6,
            "text": "W którym roku, według większości historyków, wielki książę kijowski Włodzimierz przyjął chrzest?",
            "answer": 988,
            "penalty": 65,
            "image": 'img/6.jpeg'
        },
        {
            "id": 7,
            "text": "W którym roku zakończyła się I wyprawa krzyżowa?",
            "answer": 1099,
            "penalty": 40,
            "image": 'img/7.jpeg'
        },
        {
            "id": 8,
            "text": "W którym roku powstał słynny zegar astronomiczny w Pradze, działający do dziś?",
            "answer": 1410,
            "penalty": 40,
            "image": 'img/8.jpeg'
        },
        {
            "id": 9,
            "text": "W którym roku powstał Uniwersytet Boloński?",
            "answer": 1088,
            "penalty": 25,
            "image": 'img/9.jpeg'
        },
        {
            "id": 10,
            "text": "W którym roku król Anglii Jan bez Ziemi wydał Wielką Kartę Swobód?",
            "answer": 1215,
            "penalty": 25,
            "image": 'img/10.jpeg'
        },
        {
            "id": 11,
            "text": "W którym roku papież Grzegorz XI, przeniósł się do Rzymu, zakończywszy niewolę awiniońską?",
            "answer": 1377,
            "penalty": 40,
            "image": 'img/11.jpeg'
        }
    ];

let quiz = shuffle(quizcont); // tasujemy pytania

/*** SELEKTORY ***/
const answer = document.querySelector('#answer') as HTMLInputElement;
const back = document.getElementById("back") as HTMLButtonElement;
const description = document.getElementById("description") as HTMLDivElement;
const forward = document.getElementById("forward") as HTMLButtonElement;
const game = document.getElementById("game") as HTMLDivElement;
const gamehead = document.getElementById("gamehead") as HTMLParagraphElement;
const image = document.getElementById('image') as HTMLImageElement;
const nick = document.getElementById('nick') as HTMLInputElement;
const penaltytext = document.getElementById("penaltytext") as HTMLParagraphElement;
const questions = document.querySelector('#questions') as HTMLDivElement;
const questiontext = document.getElementById("questiontext") as HTMLParagraphElement;
const replies = document.getElementById("replies") as HTMLTableElement;
const resetuj = document.querySelector('input[value="Resetuj"]') as HTMLInputElement;
const save = document.getElementById("save") as HTMLParagraphElement;
const savens = document.getElementById("savens") as HTMLParagraphElement;
const score = document.getElementById("score") as HTMLDivElement;
const seconds = document.getElementById("seconds") as HTMLParagraphElement;
const start = document.getElementById("start") as HTMLDivElement;
const startpage = document.getElementById("startpage") as HTMLDivElement;
const stopbut = document.querySelector('#stop') as HTMLInputElement;
const tabela = document.getElementById('best') as HTMLTableElement;
const timer = document.getElementById("timer") as HTMLParagraphElement;



let answers = []; // tablica, do której zbieramy odpowiedzi użytkownika
let times = []; // tablica, do której zbieramy spędzony czas
let currentQuestion = 0; // miejsce aktualnego pyt. w tablicy (po potasowaniu)

// na początku wyświetlamy tylko zawartość powitalną (startpage)
game.style.display = 'none';
score.style.display = 'none';

let statJSON; // tutaj pobierzemy tabelę z listą wyników

let request = window.indexedDB.open("ReplyBase", 1), // otwieramy bazę
    db, // odwołanie do bazy danych
    tx, // odwołanie do transakcji
    store; // odwołanie do tabeli z jedynym rekordem – JSON-ową tabelą wyników

// jeżeli bazy nie ma, tworzymy ją
request.onupgradeneeded = function (e) {
    db = request.result;
    store = db.createObjectStore("Replies", {
        keyPath: "qID"
    });
    let ret = store.put({ qID: 1, questionText: [] });

    // jeżeli nie załadowała się pusta JSON Array, ponawiamy próbę
    ret.onerror = function (e) {
        indexedDB.deleteDatabase('ReplyBase');
        location.reload();
    }
};

// tworzymy zawartość tabeli
request.onsuccess = function (e) {
    db = request.result;
    tx = db.transaction("Replies", "readwrite"); // początek transakcji
    store = tx.objectStore("Replies");

    let q1 = store.get(1); // pobranie jedynego rekordu

    q1.onsuccess = function () {
        statJSON = q1.result.questionText;

        // max. 5 najlepszych wyników
        let inc = 0;
        while (statJSON !== null && inc < 5 && inc < statJSON.length) {
            let wiersz = tabela.insertRow(inc + 1);
            let cell1 = wiersz.insertCell(0);
            let cell2 = wiersz.insertCell(1);
            let cell3 = wiersz.insertCell(2);
            cell1.innerHTML = `${inc + 1}`;
            cell2.innerHTML = `${statJSON[inc].nick}`;
            cell3.innerHTML = `${statJSON[inc].time.toFixed(1)}s`;
            inc++;
        }
    }

    tx.oncomplete = function () {
        db.close(); // zakończenie transakcji
    }
}

// w przypadku nieutworzenia bazy danych, ponawiamy próbę
request.onerror = function (e) {
    indexedDB.deleteDatabase('ReplyBase');
    location.reload();
}

// ładowanie strony pytania (tryb gry)
function loadPage(pageNo) {
    currentQuestion = pageNo;

    // aktualizacja informacji dot. pytania
    gamehead.innerHTML = `Pytanie nr ${pageNo + 1}`;
    questiontext.innerHTML = quiz[pageNo].text;
    penaltytext.innerHTML = `Błąd: +${quiz[pageNo].penalty} sekund`;
    image.setAttribute('src', `${quiz[pageNo].image}`);
    answer.value = answers[pageNo];

    // włączenie/wyłączenie odpowiednich przyciskóœ nawigacyjnych
    if (pageNo === 0) back.setAttribute('disabled', 'disabled');
    else back.removeAttribute('disabled');
    if (pageNo === quiz.length - 1) forward.setAttribute('disabled', 'disabled');
    else forward.removeAttribute('disabled');

    // chcemy, by po załadowaniu od razu można było wpisywać
    answer.focus();
}

// wstecz
function clickBack() {
    loadPage(currentQuestion - 1);
}


// dalej
function clickForward() {
    loadPage(currentQuestion + 1);
}

// włączenie gry
start.addEventListener('click', () => {

    // gra zaczyna być widoczna, powitanie przestaje
    game.style.display = '';
    startpage.style.display = 'none';

    // ustawienie początkowe przycisku i tytułu
    stopbut.setAttribute('disabled', 'disabled');
    document.title = '11 pytań do końca'

    // ustawienie licznika, zmiennej przerwania, tablicy statystyk,
    let time = 0.0;
    let ender = true;
    let gamelog = {
        nick: "",
        time: 0.00,
        stats: []
    };

    let i = 0;
    while (i != quiz.length) {
        answers.push("");
        times.push(0);

        // dodanie do panelu przycisków pytań
        questions.innerHTML += `<div class='questionbutton' data-id='${i}'
             onclick=loadPage(${i})><p>${i + 1}</p></div>\n`
        
        let quest = document.createElement('div');
        i++;
    }

    // spanie asynchroniczne (oczekiwanie odp. czasu)
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // liczy, ile pytań zostało 
    function left() {
        let i = 0;
        let j = 0;

        while (i != answers.length) {
            let but = document.querySelector(
                `.questionbutton[data-id='${i}']`
                ) as HTMLDivElement;

            // przy okazji ustawia odpowiednie kolory w panelu
            if (answers[i].length < 1) {
                j++;
                but.style.backgroundColor = '#cccccc';
            } else {
                but.style.backgroundColor = 'orange';
            }
            i++;
        }

        return j;
    }

    // stoper (liczy do momentu, kiedy ustawimy zmienną przerwania na false)
    const countTime = async () => {
        while (ender === true) {
            timer.innerHTML = time.toFixed(1).toString();
            await sleep(100);
            time += 0.1;
            times[currentQuestion] += 0.1;
        }
    }

    // zapisuje odpowiedź do tabeli statystyk
    function saveAns() {
        answers[currentQuestion] = answer.value;

        // przy okazji odpalam left
        if (left() == 0) {
            document.title = 'Możesz zatrzymać quiz'
            stopbut.removeAttribute('disabled');
        }

        else {
            document.title = `${left()} pytań do końca`
            stopbut.setAttribute('disabled', 'disabled');
        }


    }

    // sprawdza, czy w polu nicku coś jest; ustawia przyciski pod tym kątem
    function checkNick() {

        if (nick.value.length < 1) {
            save.setAttribute('disabled', 'disabled');
            savens.setAttribute('disabled', 'disabled');

        } else {
            save.removeAttribute('disabled');
            savens.removeAttribute('disabled');
        }

    }

    // zapisuje przyciski do bazy
    function statsToStorage() {
        gamelog.nick = nick.value;
        let request = window.indexedDB.open("ReplyBase", 1),
            db,
            tx,
            store;

        request.onupgradeneeded = function (e) {
            let db = request.result,
                store = db.createObjectStore("Replies", {
                    keyPath: "qID"
                });

            let ret = store.put({ qID: 1, questionText: [] });

            ret.onsuccess = function (e) {
                console.log("OK");
            }

        };

        request.onsuccess = function (e) {
            db = request.result;
            tx = db.transaction("Replies", "readwrite");
            store = tx.objectStore("Replies");

            let q1 = store.get(1);
            q1.onsuccess = function () {
                console.log(q1.result)
                console.log(q1.result.questionText);
                let dzejson = q1.result.questionText;

                // szukanie odpowiedniego miejsca w tabeli (bin-search)
                let b = dzejson.length;
                let a = 0;
                let s = a;

                while (a !== b) {
                    s = Math.floor((b - a) / 2) + a;
                    if (dzejson[s].time < gamelog.time) {
                        a = s + 1;
                    } else {
                        b = s;
                    }
                }
                dzejson.splice(a, 0, gamelog);

                let gotit = store.put({ qID: 1, questionText: dzejson });

                // jeżeli zapis się uda, odświeżamy stronę
                gotit.onsuccess = function (e) {
                    location.reload();
                }

                // jeżeli nie, informujemy o tym
                gotit.onerror = function (e) {
                    alert("Saving failed, try again");
                }

            }

            q1.onerror = function (e) {
                alert("Saving failed, try again");
            }

            tx.oncomplete = function () {
                db.close();
            }
        }
    }


    countTime(); // włączam zegar

    loadPage(0); // ładuję pierwsze pytanie

    // reaguję na kilknięcia i zmiany funkcją zapisującą
    answer.addEventListener('keyup', saveAns);
    answer.addEventListener('change', saveAns);

    // koniec gry
    stopbut.addEventListener('click', () => {

        ender = false; // czas stop

        // uzupełnienie statystyk
        let i = 0;
        while (i < answers.length) {
            gamelog.stats.push(
                {
                    number: i + 1,
                    questionID: quiz[i].id,
                    answer: answers[i],
                    time: times[i],
                    penalty: 0.00,
                }
            );
            
            // tworzenie tabeli
            let wiersz = replies.insertRow(i + 1);
            let cell1 = wiersz.insertCell(0);
            let cell2 = wiersz.insertCell(1);
            let cell3 = wiersz.insertCell(2);
            let cell4 = wiersz.insertCell(3);
            let cell5 = wiersz.insertCell(4);
            let cell15 = wiersz.insertCell(1);
            cell1.innerHTML = `${i + 1}`;
            cell2.innerHTML = `${answers[i]}`;
            cell3.innerHTML = `${quiz[i].answer}`;
            cell4.innerHTML = `${times[i].toFixed(1)}s`;

            if (quiz[i].text.length <= 24) {
                cell15.innerHTML = `${quiz[i].text}`
            } else {
                cell15.innerHTML = '…' + `${quiz[i].text}`.slice(-24);
            }

            // sprawdzenie poprawności odpowiedzi
            if (answers[i].toString() === quiz[i].answer.toString()) {
                cell5.innerHTML = `0.0s`;
                wiersz.style.color = 'green';
            } else {
                time += quiz[i].penalty;
                cell5.innerHTML = `${quiz[i].penalty.toFixed(1)}s`
                gamelog.stats[i].penalty = quiz[i].penalty.toFixed(1);
                wiersz.style.color = 'red';
            }

            i++;
        }

        gamelog.time = time;
        score.style.display = '';
        game.style.display = 'none';

        description.style.display = 'none';
        seconds.innerHTML = `Twój wynik to ${time.toFixed(1)}s`;
        document.title = `Gra zakończona!`

        // teraz można zapisać wynik pod swoim nickiem
        nick.addEventListener('change', checkNick);
        nick.addEventListener('keyup', checkNick);

        checkNick();
    });

    save.addEventListener('click', statsToStorage);

    savens.addEventListener('click', () => {
        gamelog.stats = null; // jeżeli zapisujemy bez statystyk
        statsToStorage();
    })
});

// resetowanie statystyk
resetuj.addEventListener('click', () => {
    indexedDB.deleteDatabase('ReplyBase');
    location.reload();
})