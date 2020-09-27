/*eslint max-len: ["error", { "ignoreComments": true }]*/
function initSlider(d) {
  const itemClassName = 'carousel__photo';
  const items = d.getElementsByClassName(itemClassName);
  const totalItems = items.length;
  let currentSlide = 0;
  let moving = true;

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;

    setTimeout(() => {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction();

      // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
      let newPrevious = slide - 1;
      let newNext = slide + 1;
      let oldPrevious = slide - 2;
      let oldNext = slide + 2;

      // Test if carousel has more than three items
      if (totalItems - 1 > 3) {
        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = `${itemClassName} prev`;
        items[slide].className = `${itemClassName} active`;
        items[newNext].className = `${itemClassName} next`;
      }
    }
  }

  // To initialise the carousel we'll want to update the DOM with our own classes
  function setInitialClasses() {
    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    items[totalItems - 1].classList.add('prev');
    items[0].classList.add('active');
    items[1].classList.add('next');
  }

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (currentSlide === totalItems - 1) {
        currentSlide = 0;
      } else {
        currentSlide += 1;
      }

      // Move carousel to updated slide
      moveCarouselTo(currentSlide);
    }
  }

  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (currentSlide === 0) {
        currentSlide = totalItems - 1;
      } else {
        currentSlide -= 1;
      }

      // Move carousel to updated slide
      moveCarouselTo(currentSlide);
    }
  }

  // Set click events to navigation buttons

  function setEventListeners() {
    const next = d.getElementsByClassName('carousel__button--next')[0];
    const prev = d.getElementsByClassName('carousel__button--prev')[0];

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // Set moving to false now that the carousel is ready
    moving = false;
  }

  // make it rain
  initCarousel();
}
