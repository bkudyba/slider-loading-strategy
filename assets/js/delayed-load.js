function loadNewImage(image) {
  // TODO: handle errors
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.src = image.src;
  });
}

function loadExistingImage(img) {
  // TODO: handle errors
  return new Promise((resolve, reject) => {
    const { src } = img.dataset;
    img.addEventListener('load', () => resolve(img));
    img.src = src;
  });
}

// Assume that structure is an object:
// {
// wrapperClass: class name string,
// containerClass: class name string,
// singleSlideClass: class name string,
// }

// Assume that imagesList is an array of objects
function appendNewImage(imagesList, structure) {
  return new Promise((resolve, reject) => {
    // TODO: Handle errors
    const loadQueue = [];
    const parent = document.querySelector(`.${structure.containerClass}`);

    // Create an array of promises
    imagesList.forEach((image) => {
      loadQueue.push(
        loadNewImage(image).then((img) => {
          img.classList.add(structure.singleSlideClass);
          parent.appendChild(img);
        }),
      );
    });

    // Wait for the execution of the promises array
    Promise.all(loadQueue).then(() => {
      resolve(loadQueue);
    });
  });
}

function appendExistingImage(imgList) {
  return new Promise((resolve, reject) => {
    // TODO: Handle errors
    const loadQueue = [];

    // Create an array of promises
    imgList.forEach((img) => {
      loadQueue.push(loadExistingImage(img));
    });

    // Wait for the execution of the promises array
    Promise.all(loadQueue).then(() => {
      resolve(loadQueue);
    });
  });
}
