var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Z https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array#6274398
function shuffle(array) {
    var counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
// treść quizu
var quiz = [
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
quiz = shuffle(quiz); // tasujemy pytania
// nazwy selektorów odpowiadają nazwom id elementów
var answer = document.querySelector('#answer');
var game = document.getElementById("game");
var score = document.getElementById("score");
var startpage = document.getElementById("startpage");
var stats = document.getElementById("stats");
var start = document.getElementById("start");
var tabela = document.getElementById('best');
var nick = document.getElementById('nick');
var answers = []; // tablica, do której zbieramy odpowiedzi użytkownika
var times = []; // tablica, do której zbieramy spędzony czas
var currentQuestion = 0; // miejsce aktualnego pyt. w tablicy (po potasowaniu)
// na początku wyświetlamy tylko zawartość powitalną (startpage)
game.style.display = 'none';
score.style.display = 'none';
var statJSON; // tutaj pobierzemy tabelę z listą wyników
var request = window.indexedDB.open("ReplyBase", 1), // otwieramy bazę
db, // odwołanie do bazy danych
tx, // odwołanie do transakcji
store; // odwołanie do tabeli z jedynym rekordem – JSON-ową tabelą wyników
// jeżeli bazy nie ma, tworzymy ją
request.onupgradeneeded = function (e) {
    db = request.result;
    store = db.createObjectStore("Replies", {
        keyPath: "qID"
    });
    var ret = store.put({ qID: 1, questionText: [] });
    // jeżeli nie załadowała się pusta JSON Array, ponawiamy próbę
    ret.onerror = function (e) {
        indexedDB.deleteDatabase('ReplyBase');
        location.reload();
    };
};
// tworzymy zawartość tabeli
request.onsuccess = function (e) {
    db = request.result;
    tx = db.transaction("Replies", "readwrite"); // początek transakcji
    store = tx.objectStore("Replies");
    var q1 = store.get(1); // pobranie jedynego rekordu
    q1.onsuccess = function () {
        statJSON = q1.result.questionText;
        // max. 5 najlepszych wyników
        var inc = 0;
        while (statJSON !== null && inc < 5 && inc < statJSON.length) {
            var wiersz = tabela.insertRow(inc + 1);
            var cell1 = wiersz.insertCell(0);
            var cell2 = wiersz.insertCell(1);
            var cell3 = wiersz.insertCell(2);
            cell1.innerHTML = "" + (inc + 1);
            cell2.innerHTML = "" + statJSON[inc].nick;
            cell3.innerHTML = statJSON[inc].time.toFixed(1) + "s";
            inc++;
        }
    };
    tx.oncomplete = function () {
        db.close(); // zakończenie transakcji
    };
};
// w przypadku nieutworzenia bazy danych, ponawiamy próbę
request.onerror = function (e) {
    indexedDB.deleteDatabase('ReplyBase');
    location.reload();
};
// ładowanie strony pytania (tryb gry)
function loadPage(pageNo) {
    currentQuestion = pageNo;
    // aktualizacja informacji dot. pytania
    document.getElementById("gamehead").innerHTML = "Pytanie nr " + (pageNo + 1);
    document.getElementById("questiontext").innerHTML = quiz[pageNo].text;
    document.getElementById("penaltytext").innerHTML = "B\u0142\u0105d: +" + quiz[pageNo].penalty + " sekund";
    document.getElementById("image").setAttribute('src', "" + quiz[pageNo].image);
    answer.value = answers[pageNo];
    // włączenie/wyłączenie odpowiednich przyciskóœ nawigacyjnych
    if (pageNo === 0)
        document.getElementById("back").setAttribute('disabled', 'disabled');
    else
        document.getElementById("back").removeAttribute('disabled');
    if (pageNo === quiz.length - 1)
        document.getElementById("forward").setAttribute('disabled', 'disabled');
    else
        document.getElementById("forward").removeAttribute('disabled');
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
document.getElementById('start').addEventListener('click', function () {
    var stopbut = document.querySelector('#stop');
    var pytania = document.querySelector('#questions');
    var score = document.getElementById("score");
    var save = document.getElementById("save");
    var savens = document.getElementById("savens");
    // gra zaczyna być widoczna, powitanie przestaje
    game.style.display = '';
    startpage.style.display = 'none';
    // ustawienie początkowe przycisku i tytułu
    stopbut.setAttribute('disabled', 'disabled');
    document.title = '11 pytań do końca';
    // ustawienie licznika, zmiennej przerwania, tablicy statystyk,
    var time = 0.0;
    var ender = true;
    var gamelog = {
        nick: "",
        time: 0.00,
        stats: []
    };
    var i = 0;
    while (i != quiz.length) {
        answers.push("");
        times.push(0);
        // dodanie do panelu przycisków pytań
        pytania.innerHTML += "<div class='questionbutton' data-id='" + i + "'\n             onclick=loadPage(" + i + ")><p>" + (i + 1) + "</p></div>\n";
        var quest = document.createElement('div');
        i++;
    }
    // spanie asynchroniczne (oczekiwanie odp. czasu)
    var sleep = function (milliseconds) {
        return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
    };
    // liczy, ile pytań zostało 
    function left() {
        var i = 0;
        var j = 0;
        while (i != answers.length) {
            var but = document.querySelector(".questionbutton[data-id='" + i + "']");
            // przy okazji ustawia odpowiednie kolory w panelu
            if (answers[i].length < 1) {
                j++;
                but.style.backgroundColor = '#cccccc';
            }
            else {
                but.style.backgroundColor = 'orange';
            }
            i++;
        }
        return j;
    }
    // stoper (liczy do momentu, kiedy ustawimy zmienną przerwania na false)
    var countTime = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ender === true)) return [3 /*break*/, 2];
                    document.getElementById("timer").innerHTML = time.toFixed(1).toString();
                    return [4 /*yield*/, sleep(100)];
                case 1:
                    _a.sent();
                    time += 0.1;
                    times[currentQuestion] += 0.1;
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    }); };
    // zapisuje odpowiedź do tabeli statystyk
    function saveAns() {
        answers[currentQuestion] = answer.value;
        // przy okazji odpalam left
        if (left() == 0) {
            document.title = 'Możesz zatrzymać quiz';
            stopbut.removeAttribute('disabled');
        }
        else {
            document.title = left() + " pyta\u0144 do ko\u0144ca";
            stopbut.setAttribute('disabled', 'disabled');
        }
    }
    // sprawdza, czy w polu nicku coś jest; ustawia przyciski pod tym kątem
    function checkNick() {
        if (nick.value.length < 1) {
            save.setAttribute('disabled', 'disabled');
            savens.setAttribute('disabled', 'disabled');
        }
        else {
            save.removeAttribute('disabled');
            savens.removeAttribute('disabled');
        }
    }
    // zapisuje przyciski do bazy
    function statsToStorage() {
        gamelog.nick = nick.value;
        var request = window.indexedDB.open("ReplyBase", 1), db, tx, store;
        request.onupgradeneeded = function (e) {
            var db = request.result, store = db.createObjectStore("Replies", {
                keyPath: "qID"
            });
            var ret = store.put({ qID: 1, questionText: [] });
            ret.onsuccess = function (e) {
                console.log("OK");
            };
        };
        request.onsuccess = function (e) {
            db = request.result;
            tx = db.transaction("Replies", "readwrite");
            store = tx.objectStore("Replies");
            var q1 = store.get(1);
            q1.onsuccess = function () {
                console.log(q1.result);
                console.log(q1.result.questionText);
                var dzejson = q1.result.questionText;
                // szukanie odpowiedniego miejsca w tabeli (bin-search)
                var b = dzejson.length;
                var a = 0;
                var s = a;
                while (a !== b) {
                    s = Math.floor((b - a) / 2) + a;
                    if (dzejson[s].time < gamelog.time) {
                        a = s + 1;
                    }
                    else {
                        b = s;
                    }
                }
                dzejson.splice(a, 0, gamelog);
                var gotit = store.put({ qID: 1, questionText: dzejson });
                // jeżeli zapis się uda, odświeżamy stronę
                gotit.onsuccess = function (e) {
                    location.reload();
                };
                // jeżeli nie, informujemy o tym
                gotit.onerror = function (e) {
                    alert("Saving failed, try again");
                };
            };
            q1.onerror = function (e) {
                alert("Saving failed, try again");
            };
            tx.oncomplete = function () {
                db.close();
            };
        };
    }
    countTime(); // włączam zegar
    loadPage(0); // ładuję pierwsze pytanie
    // reaguję na kilknięcia i zmiany funkcją zapisującą
    answer.addEventListener('keydown', saveAns);
    answer.addEventListener('change', saveAns);
    // koniec gry
    stopbut.addEventListener('click', function () {
        var tabela = document.getElementById("replies");
        var article = document.querySelector('article');
        var seconds = document.getElementById("seconds");
        ender = false; // czas stop
        // uzupełnienie statystyk
        var i = 0;
        while (i < answers.length) {
            gamelog.stats.push({
                number: i + 1,
                questionID: quiz[i].id,
                answer: answers[i],
                time: times[i],
                penalty: 0.00
            });
            // tworzenie tabeli
            var wiersz = tabela.insertRow(i + 1);
            var cell1 = wiersz.insertCell(0);
            var cell2 = wiersz.insertCell(1);
            var cell3 = wiersz.insertCell(2);
            var cell4 = wiersz.insertCell(3);
            var cell5 = wiersz.insertCell(4);
            var cell15 = wiersz.insertCell(1);
            cell1.innerHTML = "" + (i + 1);
            cell2.innerHTML = "" + answers[i];
            cell3.innerHTML = "" + quiz[i].answer;
            cell4.innerHTML = times[i].toFixed(1) + "s";
            if (quiz[i].text.length <= 24) {
                cell15.innerHTML = "" + quiz[i].text;
            }
            else {
                cell15.innerHTML = '…' + ("" + quiz[i].text).slice(-24);
            }
            // sprawdzenie poprawności odpowiedzi
            if (answers[i].toString() === quiz[i].answer.toString()) {
                cell5.innerHTML = "0.0s";
                wiersz.style.color = 'green';
            }
            else {
                time += quiz[i].penalty;
                cell5.innerHTML = quiz[i].penalty.toFixed(1) + "s";
                gamelog.stats[i].penalty = quiz[i].penalty.toFixed(1);
                wiersz.style.color = 'red';
            }
            i++;
        }
        gamelog.time = time;
        score.style.display = '';
        game.style.display = 'none';
        article.style.display = 'none';
        seconds.innerHTML = "Tw\u00F3j wynik to " + time.toFixed(1) + "s";
        document.title = "Game finished!";
        // teraz można zapisać wynik pod swoim nickiem
        nick.addEventListener('change', checkNick);
        nick.addEventListener('keyup', checkNick);
        checkNick();
    });
    save.addEventListener('click', statsToStorage);
    savens.addEventListener('click', function () {
        gamelog.stats = null; // jeżeli zapisujemy bez statystyk
        statsToStorage();
    });
});
// resetowanie statystyk
document.querySelector('input[value="Resetuj"]').addEventListener('click', function () {
    indexedDB.deleteDatabase('ReplyBase');
    location.reload();
});
