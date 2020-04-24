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
console.log(localStorage.getItem('statsy'));
var quiz = [
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
var stopbut = document.querySelector('#stop');
stopbut.setAttribute('disabled', 'disabled');
var score = document.getElementById("score");
score.style.display = 'none';
var answers = [];
var times = [];
var i = 0;
while (i != quiz.length) {
    answers.push("");
    times.push(0);
    i++;
}
var time = 0.0;
var sleep = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
var ender = true;
var countTime = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ender === true)) return [3 /*break*/, 2];
                document.getElementById("timer").innerHTML = time.toFixed(2).toString();
                return [4 /*yield*/, sleep(10)];
            case 1:
                _a.sent();
                time += 0.01;
                times[currentQuestion] += 0.01;
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}); };
countTime();
var currentQuestion = 0;
function left() {
    var i = 0;
    var j = 0;
    while (i != answers.length) {
        if (answers[i] === "") {
            j++;
        }
        i++;
    }
    return j;
}
var answer = document.querySelector('#answer');
function loadPage(pageNo) {
    document.getElementById("gamehead").innerHTML = "Pytanie nr " + (pageNo + 1);
    document.getElementById("questiontext").innerHTML = quiz[pageNo].text;
    document.getElementById("penaltytext").innerHTML = "B\u0142\u0105d: +" + quiz[pageNo].penalty + " sekund";
    answer.value = answers[pageNo];
    if (pageNo === 0)
        document.getElementById("back").setAttribute('disabled', 'disabled');
    else
        document.getElementById("back").removeAttribute('disabled');
    if (pageNo === quiz.length - 1)
        document.getElementById("forward").setAttribute('disabled', 'disabled');
    else
        document.getElementById("forward").removeAttribute('disabled');
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
    document.title = left() + " questions left";
    if (left() == 0)
        stopbut.removeAttribute('disabled');
    else
        stopbut.setAttribute('disabled', 'disabled');
}
answer.addEventListener('keydown', saveAns);
answer.addEventListener('change', saveAns);
var gamelog = {
    nick: "",
    time: 0.00,
    stats: []
};
stopbut.addEventListener('click', function () {
    ender = false;
    var i = 0;
    var tabela = document.getElementById("replies");
    while (i < answers.length) {
        gamelog.stats.push({
            number: i + 1,
            answer: answers[i],
            time: times[i],
            penalty: 0.00
        });
        var wiersz = tabela.insertRow(i + 1);
        var cell1 = wiersz.insertCell(0);
        var cell2 = wiersz.insertCell(1);
        var cell3 = wiersz.insertCell(2);
        var cell4 = wiersz.insertCell(3);
        var cell5 = wiersz.insertCell(4);
        cell1.innerHTML = "" + (i + 1);
        cell2.innerHTML = "" + answers[i];
        cell3.innerHTML = "" + quiz[i].answer;
        cell4.innerHTML = times[i].toFixed(2) + "s";
        if (answers[i].toString() === quiz[i].answer.toString()) {
            cell5.innerHTML = "0.00s";
        }
        else {
            time += quiz[i].penalty;
            cell5.innerHTML = quiz[i].penalty.toFixed(2) + "s";
            gamelog.stats[i].penalty = quiz[i].penalty.toFixed(2);
        }
        i++;
    }
    gamelog.time = time;
    score.style.display = 'block';
    document.getElementById("seconds").innerHTML = "Tw\u00F3j wynik to " + time.toFixed(2);
});
function saveNick() {
    gamelog.nick = document.getElementById("nick").value;
}
document.getElementById("nick").addEventListener('keydown', saveNick);
document.getElementById("nick").addEventListener('change', saveNick);
document.getElementById("save").addEventListener('click', function () {
    saveNick();
    if (localStorage.getItem('statsy') === null) {
        localStorage.setItem('statsy', JSON.stringify([gamelog]));
    }
    else {
        var dzejson = JSON.parse(localStorage.getItem('statsy'));
        var b = dzejson.length - 1;
        var a = 0;
        var s = a;
        while (a !== b) {
            s = ((b - a) / 2) | 0 + a;
            if (dzejson[s].time <= gamelog.time) {
                a = s;
            }
            else {
                b = s;
            }
        }
        dzejson.splice(s, 0, gamelog);
        localStorage.setItem('statsy', JSON.stringify(dzejson));
    }
    console.log(localStorage.getItem('statsy'));
});
