class Event {
	constructor(event, date, priority){
		this.event = event;
		this.date = date;
		this.priority = priority;
	}
}

function removeEvent(e, currEv) {
	e.target.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.firstChild);
	let eList = JSON.parse(localStorage.getItem("events"));
	eList.splice(eList.indexOf(currEv), 1);
	localStorage.setItem("events", JSON.stringify(eList));
}


function updateTable(currEv) {
	let table = document.querySelector("#table");
	let tRow = document.createElement('tr');
	let t = document.createElement('td');
	t.appendChild(document.createTextNode(currEv.event));
	tRow.appendChild(t);
	t = document.createElement('td');
	t.appendChild(document.createTextNode(currEv.date));
	tRow.appendChild(t);
	t = document.createElement('td');
	t.appendChild(document.createTextNode(currEv.priority));
	tRow.appendChild(t);
	t = document.createElement('td');
	t.appendChild(document.createTextNode('X'));
	t.addEventListener('click', e => removeEvent(e, currEv));
	tRow.appendChild(t);
	table.appendChild(tRow);
}

function clearTable() {
	let table = document.querySelector("#table");
	while(table.firstChild){
		table.removeChild(table.lastChild);
	}
}

function comp(a, b){
	if(a.date === b.date){
		return a.priority > b.priority;
	} else {
		return new Date(a.date).getTime() > new Date(b.date).getTime();
	}
}

function newEvent(eList) {
	const currEv = new Event(null, null, null);
	currEv.event = document.querySelector('#event').value;
	currEv.date = document.querySelector('#date').value;
	currEv.priority = document.querySelector('#priority').value;
	eList.unshift(currEv);
	eList.sort(comp);
	clearTable();
	eList.forEach((val) => {
		updateTable(val);
	});
	localStorage.setItem("events", JSON.stringify(eList));
}

let eList = JSON.parse(localStorage.getItem("events"));

if(eList != null){
	eList.forEach((val) => {
		updateTable(val);
	});
} else {
	eList = [];
}

let button1 = document.querySelector('#submit1');
let button2 = document.querySelector('#submit2');
button1.addEventListener('click', e => {
	e.preventDefault();
	let eList = JSON.parse(localStorage.getItem("events"));
	newEvent(eList);
	
})
button2.addEventListener('click', e => {
	e.preventDefault();
	clearTable();
	localStorage.clear();
	eList = [];
})
