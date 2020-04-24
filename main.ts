console.log(localStorage.getItem('statsy'))
let dzejson = JSON.parse(localStorage.getItem('statsy'));

let tabela = document.getElementById('best') as HTMLTableElement;
let inc = 0;

while (dzejson !== null && inc < 5 && inc < dzejson.length) {
    let wiersz = tabela.insertRow(inc + 1);
    let cell1 = wiersz.insertCell(0);
    let cell2 = wiersz.insertCell(1);
    let cell3 = wiersz.insertCell(2);
    cell1.innerHTML = `${inc+1}`;
    cell2.innerHTML = `${dzejson[inc].nick}`;
    cell3.innerHTML = `${dzejson[inc].time}`;
    inc++;
}