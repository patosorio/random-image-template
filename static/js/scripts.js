var imagesAdded = new Set();

// Function to check if an image has already been added to the grid
function isImageAlreadyAdded(imageSrc) {
    var images = document.querySelectorAll('.grid-item img');
    for (var i = 0; i < images.length; i++) {
      if (images[i].src === imageSrc) {
        return true;
      }
    }
    return false;
}
  
  // Function to add a new image to the grid
function addImageToGrid(imageSrc) {
    var container = document.querySelector('.grid-container');
    var item = document.createElement('div');
    item.classList.add('grid-item');
    var img = document.createElement('img');
    img.src = 'static/images/' + imageSrc;

    img.onload = function () {
      // Check image dimensions and add appropriate class to grid item
      if (img.naturalWidth / img.naturalHeight > 1.5) {
        item.classList.add("wide");
      } else if (img.naturalHeight / img.naturalWidth > 1.5) {
        item.classList.add("tall");
      }
      item.appendChild(img);
      container.appendChild(item);
    };
    
    // item.appendChild(img);
    // container.appendChild(item);
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to load images at regular intervals
function loadImages() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var images = JSON.parse(xhr.responseText);
      shuffleArray(images);
      for (var i = 0; i < images.length; i++) {
        addImageToGrid(images[i]);
      }
    }
  };
  xhr.open("GET", "/get-images", true);
  xhr.send();
}

  
// Call the function when the page is loaded
document.addEventListener('DOMContentLoaded', function(){
    loadImages();
});