const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
// Update total and count
const updateSelectedCount = () => {
    const selectedseats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedseats].map((seat) => [...seats].indexOf(seat));
    // localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedseatsCount = selectedseats.length;

    count.innerText = selectedseatsCount;
    total.innerText = selectedseatsCount * ticketPrice;
}
// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    // localStorage.setItem('selectedMovieIndex',e.target.selectedIndex);
    updateSelectedCount();

})
// seat click event
container.addEventListener('click', (e) => {

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        
        e.target.classList.toggle('selected');
        
        updateSelectedCount();
    }
})
// Get data from local storage and populate ui
function populateUI() {
    let selectedSeats = 0
    // const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const seatsLength = selectedSeats?.length;
    if(selectedSeats !== null && seatsLength > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
// initial count and total set
updateSelectedCount()
