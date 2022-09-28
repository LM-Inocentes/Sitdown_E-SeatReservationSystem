let row=10;
let col=20;
let numSeats;

//var containerseats = document.getElementById('container-seats');

var iDiv = document.createElement('div');
iDiv.id = 'testing';
//iDiv.innerHTML = 'testing';
var containerSeats = document.getElementById('container-seats-id');

containerSeats.appendChild(iDiv);

/*
document.addEventListener('DOMContentLoaded', function() {
    var div = document.createElement('div');
    div.id='testing-divs'
    div.innerHTML = 'Hi there!';
    div.className = 'row';

    document.appendChild(div);
}, false); */


let x=1;

for(var i=0; i<row; i++){
  var iDiv = document.createElement('div');
  iDiv.className = 'row';
  containerSeats.appendChild(iDiv);
  for(var j=0; j<col; j++){
    var iSeat = document.createElement('div');
    iSeat.className = 'seat';
    iSeat.id = 'seat'+x;
    x++;
    iDiv.appendChild(iSeat);
  }
}

containerSeats.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});