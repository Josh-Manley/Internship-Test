let allCars = document.querySelector('.cars');

async function getCars() {
  let listCars = `https://exam.razoyo.com/api/cars?make={make}`;

  fetch(listCars)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
    });
}
getCars();

async function getCar() {
  let listCar = `https://exam.razoyo.com/api/cars/`;

  fetch(listCar)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      // Call filterCarsByMake function after data is fetched
      filterCarsByMake('', data);

      populateMakes(data.makes);
    });
}

getCar();

// Function to handle opening and closing car info
function openInfo(car, index, data) {
  let moreInfo = document.getElementById(`more-info-${index}`);
  let openBtn = document.getElementById(`open-btn-${index}`);

  if (!moreInfo) {
    moreInfo = document.createElement('div');
    moreInfo.setAttribute('id', `more-info-${index}`);
    moreInfo.classList.add('more-info');
    let sideInfo = document.createElement('ul');
    let priceInfo = document.createElement('li');
    let mpgInfo = document.createElement('li');
    let seatInfo = document.createElement('li');
    let image = document.createElement('img');

    priceInfo.setAttribute('id', 'side-info-price');
    mpgInfo.setAttribute('id', 'side-info-mpg');
    seatInfo.setAttribute('id', 'side-info-seats');

    priceInfo.textContent = `Price: $${car.price}`;
    mpgInfo.textContent = `MPG: ${car.mpg}`;
    seatInfo.textContent = `Seats: ${car.seats}`;
    image.src = car.image;

    moreInfo.append(image);
    moreInfo.append(sideInfo);
    sideInfo.appendChild(priceInfo);
    sideInfo.appendChild(mpgInfo);
    sideInfo.appendChild(seatInfo);

    document.getElementById(`car-${index}`).appendChild(moreInfo);
    openBtn.textContent = '-'; 

    moreInfo.offsetHeight;

    setTimeout(() => {
      moreInfo.classList.add('open');
    }, 10);
  } else {
  
    if (moreInfo.classList.contains('open')) {
      // If more info is open, close it
      moreInfo.classList.remove('open');
      openBtn.textContent = '+'; 
    } else {
      // If more info is closed, open it
      moreInfo.classList.add('open');
      openBtn.textContent = '-';
    }
  }
}

// Function to populate select options with makes
function populateMakes(makes) {
  let select = document.getElementById('filter');

  select.innerHTML = '';

  // Add a default option
  let defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Any';
  select.appendChild(defaultOption);

  // Add options for each make
  makes.forEach(make => {
    let option = document.createElement('option');
    option.value = make;
    option.textContent = make;
    select.appendChild(option);
  });
}

// Add an event listener to the select element
document.getElementById('filter').addEventListener('change', function () {
 
  filterCarsByMake(this.value);
});

// Function to filter cars by make
function filterCarsByMake(make) {

  let listCar = `https://exam.razoyo.com/api/cars/`;

  fetch(listCar)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      let filteredCars = [];

      if (make) {
       
        filteredCars = data.cars.filter(car => car.make === make);
      } else {
        // If no make is selected, display all cars
        filteredCars = data.cars;
      }

      allCars.innerHTML = '';

      // Loop through the filtered cars and display them
      filteredCars.forEach((car, index) => {
        let li = document.createElement('li');
        li.setAttribute('id', `car-${index}`);

        let carInfo = document.createElement('p');
        carInfo.textContent = `${car.year} ${car.make} ${car.model}`;
        li.appendChild(carInfo);
        allCars.appendChild(li);

        let openBtn = document.createElement('button');
        openBtn.setAttribute('id', `open-btn-${index}`);
        openBtn.textContent = '+';
        openBtn.addEventListener('click', () => openInfo(car, index, data));
        li.appendChild(openBtn);
        carInfo.appendChild(openBtn);
      });
    });
}
