function loadNewImage(image) {
  // TODO: handle errors
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));

    // Simulate slow connection
    setTimeout(() => {
      img.src = image.src;
    }, 1000);
  });
}

function loadExistingImage(img) {
  // TODO: handle errors
  return new Promise((resolve, reject) => {
    const { src } = img.dataset;
    img.addEventListener('load', () => resolve(img));
    // Simulate slow connection
    setTimeout(() => {
      img.src = src;
    }, 1000);
  });
}

// Assume that structure is an object:
// {
// wrapperClass: class name string,
// containerClass: class name string,
// singleSlideClass: class name string,
// }

// Assume that srcList is an array of src strings
function appendNewImage(imagesList, structure) {
  return new Promise((resolve, reject) => {
    // TODO: Handle errors
    const loadQueue = [];
    const parent = document.querySelector(`.${structure.containerClass}`);
    imagesList.forEach((image) => {
      loadQueue.push(
        loadNewImage(image).then((img) => {
          img.classList.add(structure.singleSlideClass);
          parent.appendChild(img);
        }),
      );
    });
    Promise.all(loadQueue).then(() => {
      resolve(loadQueue);
    });
  });
}

function appendExistingImage(imgList) {
  return new Promise((resolve, reject) => {
    // TODO: Handle errors
    const loadQueue = [];
    imgList.forEach((img) => {
      loadQueue.push(loadExistingImage(img));
    });
    Promise.all(loadQueue).then(() => {
      resolve(loadQueue);
    });
  });
}
