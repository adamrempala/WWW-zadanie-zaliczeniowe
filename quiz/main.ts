console.log(localStorage.getItem('statsy'))
let quiz = [
    {
        "text": "W którym roku miała miejsce bitwa pod Poitiers?",
        "answer": 732,
        "penalty": 30
    },
    {
        "text": "W którym roku podpisano traktat z Verdun, skutkujący rozpadem państwa Franków?",
        "answer": 843,
        "penalty": 30
    },
    {
        "text": "W którym roku katedra w Lincoln stała się najwyższą budowlą na świecie, przewyższając piramidę Cheopsa?",
        "answer": 1311,
        "penalty": 70
    },
    {
        "text": "W którym roku miała miejsce Hidżra, ucieczka Mahometa z Mekki do Medyny?",
        "answer": 622,
        "penalty": 20
    },
    {
        "text": "W którym roku szlachta polska i litewska podpisały unię w Horodle?",
        "answer": 1413,
        "penalty": 50
    },
    {
        "text": "W którym roku, według większości historyków, wielki książę kijowski Włodzimierz przyjął chrzest?",
        "answer": 988,
        "penalty": 65
    },
    {
        "text": "W którym roku zakończyła się I wyprawa krzyżowa?",
        "answer": 1097,
        "penalty": 40
    },
    {
        "text": "W którym roku powstał słynny zegar astronomiczny w Pradze, działający do dziś?",
        "answer": 1410,
        "penalty": 40
    },
    {
        "text": "W którym roku powstał Uniwersytet Boloński?",
        "answer": 1088,
        "penalty": 25
    },
    {
        "text": "W którym roku król Anglii Jan bez Ziemi wydał Wielką Kartę Swobód?",
        "answer": 1215,
        "penalty": 25
    },
    {
        "text": "W którym roku papież Grzegorz XI, przeniósłszy się do Rzymu, zakończył niewolę awiniońską?",
        "answer": 1377,
        "penalty": 40
    }
];

let stopbut = document.querySelector('#stop');
stopbut.setAttribute('disabled', 'disabled');
let score = document.getElementById("score");
score.style.display = 'none';
let answers = []
let times = []

let i = 0;

while (i != quiz.length) {
    answers.push("");
    times.push(0)
    i++;
}


let time = 0.0;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let ender = true;

const countTime = async () => {while (ender === true) {
    document.getElementById("timer").innerHTML = time.toFixed(2).toString();
    await sleep(10)
    time += 0.01;
    times[currentQuestion] += 0.01;
}}

countTime();


let currentQuestion = 0;

function left() {
    let i = 0;
    let j = 0;

    while (i != answers.length) {
        if (answers[i] === "") {
            j++;
        }
        i++;
    }

    return j;
}

let answer = document.querySelector('#answer') as HTMLInputElement;

function loadPage(pageNo) {
    document.getElementById("gamehead").innerHTML = `Pytanie nr ${pageNo + 1}`;
    document.getElementById("questiontext").innerHTML = quiz[pageNo].text;
    document.getElementById("penaltytext").innerHTML = `Błąd: +${quiz[pageNo].penalty} sekund`
    answer.value = answers[pageNo];
    if (pageNo === 0) document.getElementById("back").setAttribute('disabled', 'disabled');
    else document.getElementById("back").removeAttribute('disabled');
    if (pageNo === quiz.length - 1) document.getElementById("forward").setAttribute('disabled', 'disabled');
    else document.getElementById("forward").removeAttribute('disabled');
    answer.focus();
}

loadPage(0);



function clickBack() {
    currentQuestion -= 1;
    loadPage(currentQuestion);
}

function clickForward() {
    currentQuestion += 1;
    loadPage(currentQuestion);
}


function saveAns() {
    answers[currentQuestion] = answer.value;
    document.title = `${left()} questions left`

    if (left() == 0)
        stopbut.removeAttribute('disabled');
    else
        stopbut.setAttribute('disabled', 'disabled');

}

answer.addEventListener('keydown', saveAns);
answer.addEventListener('change', saveAns);

let gamelog = {
    nick: "",
    time: 0.00,
    stats: []
};

stopbut.addEventListener('click', () => {
    ender = false;
    let i = 0;
    let tabela = document.getElementById("replies") as HTMLTableElement;
    
    while (i < answers.length) {
        gamelog.stats.push(
            {
                number: i+1,
                answer: answers[i],
                time: times[i],
                penalty: 0.00,
            }
        );
        let wiersz = tabela.insertRow(i + 1);
        let cell1 = wiersz.insertCell(0);
        let cell2 = wiersz.insertCell(1);
        let cell3 = wiersz.insertCell(2);
        let cell4 = wiersz.insertCell(3);
        let cell5 = wiersz.insertCell(4);
        cell1.innerHTML = `${i+1}`;
        cell2.innerHTML = `${answers[i]}`;
        cell3.innerHTML = `${quiz[i].answer}`;
        cell4.innerHTML = `${times[i].toFixed(2)}s`;

        if (answers[i].toString() === quiz[i].answer.toString()) {
            cell5.innerHTML = `0.00s`;
        }
            
        else {
            time += quiz[i].penalty;
            cell5.innerHTML = `${quiz[i].penalty.toFixed(2)}s`
            gamelog.stats[i].penalty = quiz[i].penalty.toFixed(2);
        }

        i++;
    }
    gamelog.time = time;
    score.style.display = 'block';
    document.getElementById("seconds").innerHTML = `Twój wynik to ${time.toFixed(2)}`;
});

function saveNick() {
    gamelog.nick = (<HTMLInputElement>document.getElementById("nick")).value;
}

document.getElementById("nick").addEventListener('keydown', saveNick);
document.getElementById("nick").addEventListener('change', saveNick);

document.getElementById("save").addEventListener('click', () => {
    saveNick();
    if(localStorage.getItem('statsy') === null) {
        localStorage.setItem('statsy', JSON.stringify([gamelog]));
    }
    else {
        let dzejson = JSON.parse(localStorage.getItem('statsy'));
        let b = dzejson.length - 1;
        let a = 0;
        let s = a;
        while (a !== b) {
            s = ((b - a) / 2) | 0 + a;
            if (dzejson[s].time <= gamelog.time) {
                a = s;
            } else {
                b = s;
            }
        }
        dzejson.splice(s, 0, gamelog);
        localStorage.setItem('statsy', JSON.stringify(dzejson));
    }
    console.log(localStorage.getItem('statsy'));
})