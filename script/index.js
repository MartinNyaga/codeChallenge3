//Getting the first movie when page loads
function getmovieOne(){
    fetch('http://localhost:3000/films')
    .then(takeOne => takeOne.json())
    .then(mov => {
        const fMovie = mov[0]
        firstOne(fMovie);
    })
}
getmovieOne();

//Dom for the first movie

function firstOne(oneMovie) {
    let movieOne = document.getElementById('firstMovie')
    let movieOneset = document.createElement('li')
    let tickets = oneMovie.tickets_sold;
     let capacity = oneMovie.capacity;
    let availableTickets = capacity - tickets;

    movieOneset.innerHTML = `<img src="${oneMovie.poster}">
                      <h3>${oneMovie.title}</h3>
                      <p>Description: ${oneMovie.description}</p>
                      <p>Runtime: ${oneMovie.runtime}</p>
                      <p>Showtime: ${oneMovie.showtime}</p>
                      <p>Capacity: ${oneMovie.capacity}</p>
                      <p> Available tickets: ${availableTickets}</p>`;
    
    movieOne.appendChild(movieOneset);

}

// Getting the data from server
function getData() {
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => domManipulate(data));
  }
  
  getData();

  
  // The DOM manipulation

  function domManipulate(movie){
    let card = document.getElementById('childOne');
    let div = document.getElementById('elementOne');

    for(let dub of movie){
        let dock = document.createElement('li');
        dock.innerText = dub.title;
    card.appendChild(dock);

    dock.addEventListener('click', () => {
      remInfo(); 
      moreInfo(dub, div);
    });

     //Creating the buy ticket button and event listener
     let buyTicket = document.createElement('button');
     let tickets = dub.tickets_sold;
     let capacity = dub.capacity;
     buyTicket.textContent = 'Buy Ticket'
     dock.appendChild(buyTicket)
     buyTicket.addEventListener('click', () => {
       if(tickets >= capacity){
        alert("This movie is sold out")
       }else{
        alert("Enjoy The Movie!")
        tickets++
        updateTickets(dub.id, tickets);
       }

     })
    }
  }

  // Remove displayed information after clicking another name
function remInfo() {
    let infoElements = document.getElementsByClassName('info');
    while (infoElements.length > 0) {
      infoElements[0].remove();
    }
  }

  // Update tickets sold on the server
function updateTickets(id, tickets) {
    fetch(`http://localhost:3000/films/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tickets_sold: tickets }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      
      
  }

  // Getting more information from DOM
function moreInfo(domInfo, div) {
    let info = document.createElement('li');
    info.classList.add('info');
    let tickets = domInfo.tickets_sold;
     let capacity = domInfo.capacity;
    let availableTickets = capacity - tickets;
    info.innerHTML = `<img src="${domInfo.poster}">
                      <h3>${domInfo.title}</h3>
                      <p>Description: ${domInfo.description}</p>
                      <p>Runtime: ${domInfo.runtime}</p>
                      <p>Showtime: ${domInfo.showtime}</p>
                      <p>Capacity: ${domInfo.capacity}</p>
                      <p>Tickets sold: ${domInfo.tickets_sold}</p>
                      <p>Available Tickets: ${availableTickets}`;
    div.appendChild(info);
  }