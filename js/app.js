// function to get the input field text
const getInputValue = (id) => {
  const val = document.getElementById(id).value;
  document.getElementById(id).value = ""; // Clear input field
  return val;
};

// function to make url from the input text 
const makeUrl = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    return url;
}

// function to set the display property of an element 
const setDisplay = (id,dis) => {
    document.getElementById(id).style.display = dis;
}

// function to show message below the search box 
const showTextMessage = text => {
    setDisplay('spinner','none');
    setDisplay('text-message','block');
    document.getElementById('text-message').innerHTML = text;
}


// function to display data found from api
const displayData = (data) => {
    console.log(data);
  let text;
  const searchResult = document.getElementById("search-result");
  const phoneData = data.data.slice(0, 20); //get first 20 phones
  console.log(phoneData);
  const phoneNumber = phoneData.length;
  if (phoneNumber >= 20) {
    text = `Showing results ${phoneNumber} out of ${data.data.length}`; // If more than 20 phones then showing first 20
  } else if (phoneNumber < 20) {
    text = `Showing results ${phoneNumber} out of ${data.data.length}`; // If not more than 20, then showing available phones
  } else {
    text = "No Result Found"; // No phones were found
  }
  showTextMessage(text);

  phoneData.forEach((phone) => {
      console.log(phone);
    let { brand, phone_name, image} = phone; // Destructuring
    let phoneBrand, phoneName, phoneImage;
    const phoneId = phone.slug;

    // Ternary operators to check if all data are present or not. If not, then set the value as Unknown
    image === undefined ? (phoneImage = "/images/not-found.jpg") : (phoneImage = image);
    phone_name === undefined ? (phoneName = "Unknown") : (phoneName = phone_name);
    brand === undefined ? (phoneBrand = "Unknown") : (phoneBrand = brand);

    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
    <div class="col">
        <div class="card h-100">
            <img src=${phoneImage} class="card-img-top img-fluid" alt="${phoneName}">
            <div class="card-body">
                <h5 class="card-title text-center mb-3 fw-bolder">${phoneName}</h5>
                <p class="card-text"><span class="fw-bolder details">Brand:</span> ${phoneBrand} </p>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="loadDetail('${phoneId}')">
                Launch demo modal
                </button>
            </div>
        </div>
    </div>
    `;
     searchResult.appendChild(phoneDiv);
  });
};

// function to fetch api data 
const fetchData = url => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data))
    //   .then((data) => console.log(data.phone_name))
      .catch(() =>
        showTextMessage("Something went wrong. Please try again later!")
      );
}

// Search button event listener 
document.getElementById('button-search').addEventListener('click',function() {
    const inputText = getInputValue('input-field');
    console.log(inputText);
    const url = makeUrl(inputText);
    console.log(url);
    setDisplay('text-message','none');
    setDisplay('spinner','block');
    const row = document.getElementById("search-result");
    row.textContent = '';
    fetchData(url);
})

const loadDetail = (phonId) => {
  console.log(phonId);
  const url = `https://openapi.programming-hero.com/api/phone/${phonId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

const displayDetails = (data) => {
  const phoneTitle = document.getElementById("exampleModalLabel");
  phoneTitle.innerText = `${data.name}`;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${data.image ? data.image : 'images/not-found.jpg' } " class="card-img-top img-fluid" alt="${data.name}">
    <p class="card-text">ReleaseDate : ${data.releaseDate ? data.releaseDate : 'Not Found'} </p>
    
    `;
  phoneDetails.appendChild(div);
};