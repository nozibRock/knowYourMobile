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

// function to show message below the search box 
const showTextMessage = text => {
    setDisplay('spinner','none');
    setDisplay('text-message','block');
    document.getElementById('text-message').innerHTML = text;
}