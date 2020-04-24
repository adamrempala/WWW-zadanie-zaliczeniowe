console.log(localStorage.getItem('statsy'));
var dzejson = JSON.parse(localStorage.getItem('statsy'));
var tabela = document.getElementById('best');
var inc = 0;
while (dzejson !== null && inc < 5 && inc < dzejson.length) {
    var wiersz = tabela.insertRow(inc + 1);
    var cell1 = wiersz.insertCell(0);
    var cell2 = wiersz.insertCell(1);
    var cell3 = wiersz.insertCell(2);
    cell1.innerHTML = "" + (inc + 1);
    cell2.innerHTML = "" + dzejson[inc].nick;
    cell3.innerHTML = "" + dzejson[inc].time;
    inc++;
}
