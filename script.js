// Define the model
var model = {
  currentImage: null,
  images: [
    {
      name: 'Iron Man',
      url: 'https://cdn.bhdw.net/im/iron-man-iron-suit-wallpaper-84239_w635.webp',
      counter: 0
    },
{
      name: 'Thor',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgwJMsI-bmEcrJY6fcRNTOhHe358y0hVP3GvuIpI8kLpHP99CFJlh5JvBwsTgqqGmkS4Q&usqp=CAU',
      counter: 0
    },
    {
      name: 'Captain America',
      url: 'https://lumiere-a.akamaihd.net/v1/images/h_avengersendgame_19751_b8067b68.jpeg',
      counter: 0
    }
  ],
  adminMode: false
};

// Define the controller
var controller = {
  init: function() {
    // Set the current image to the first one in the list
    model.currentImage = model.images[0];

    // Call the view's init function
    view.init();

    // Set up event listeners
    view.imageList.addEventListener('click', function(event) {
      var index = event.target.getAttribute('data-index');
      if (index !== null) {
        model.currentImage = model.images[index];
        view.render();
      }
    });

    view.currentImage.addEventListener('click', function() {
      model.currentImage.counter++;
      view.render();
    });

    view.adminButton.addEventListener('click', function() {
      model.adminMode = true;
      view.render();
    });

    view.cancelButton.addEventListener('click', function() {
      model.adminMode = false;
      view.render();
    });

    view.updateButton.addEventListener('click', function() {
      var newUrl = view.newUrl.value;
      var newName = view.newName.value;
      var newCounter = view.newCounter.value;
      if (newUrl !== '') {
        model.currentImage.url =newUrl;
      }
      if (newName !== '') {
        model.currentImage.name =newName;
      }
      if (newCounter !== '') {
        model.currentImage.counter = parseInt(newCounter);
      }
      model.adminMode = false;
      view.render();
    });
  },

  getCurrentImage: function() {
    return model.currentImage;
  },

  getAllImages: function() {
    return model.images;
  },

  isAdminMode: function() {
    return model.adminMode;
  },

  updateImage: function(newUrl, newName, newCounter) {
    model.currentImage.url= newUrl;
    model.currentImage.name = newName;
    model.currentImage.counter = newCounter;
  }
};

// Define the view
var view = {
  init: function() {
    // Get the DOM elements
    this.imageList = document.querySelector('#image-list');
    this.currentImage = document.querySelector('#current-image');
    this.currentName = document.querySelector('#current-name');
    this.currentCounter = document.querySelector('#current-counter');
    this.adminButton = document.querySelector('#admin-button');
    this.adminForm = document.querySelector('#admin-form');
    this.newUrl=document.querySelector('#new-url');
    this.newName = document.querySelector('#new-name');
    this.newCounter = document.querySelector('#new-counter');
    this.cancelButton = document.querySelector('#cancel-button');
    this.updateButton = document.querySelector('#update-button');

    // Render the initial view
    this.render();
  },

  render: function() {
    // Get the current image and all the images
    var currentImage = controller.getCurrentImage();
    var allImages = controller.getAllImages();

    // Clear theimage list
    this.imageList.innerHTML = '';

    // Render the image list
    allImages.forEach(function(image, index) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = image.url;
      img.alt = image.name;
      li.setAttribute('data-index', index);
  
      // Add an event listener to the image element
      img.addEventListener('click', function (event) {
        model.currentImage = model.images[index];
        view.render();
      });
  
      if (image === currentImage) {
        li.classList.add('active');
      }
  
      li.appendChild(img);
      view.imageList.appendChild(li);
    });

    // Render the current image
    this.currentImage.src = currentImage.url;
    this.currentName.textContent = currentImage.name;
    this.currentCounter.textContent = `Counter: ${currentImage.counter}`;

    // Render the admin form
  if (controller.isAdminMode() && controller.isInAdminModeClicked()) {
    this.adminForm.classList.remove('hidden');
    this.newUrl.value = currentImage.url;
   this.newName.value = currentImage.name;
    this.newCounter.value = currentImage.counter;
  } else {
    this.adminForm.classList.add('hidden');
  }
},
};


// Initialize the app
controller.init();