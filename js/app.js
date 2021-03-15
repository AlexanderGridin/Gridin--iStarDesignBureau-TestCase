document.addEventListener("DOMContentLoaded", main);

function main(){
  initCatalogueNavMobileButton(".catalogue-nav");
  initSlider("#slider");
  initTabs(".tabs");
}

function initSlider(blockSelector){
  let slider = document.querySelector(blockSelector);

  if(slider){
    handleSlider(slider);
  }

  function handleSlider(sliderBlock){
    let position = 0;

    let elementsSelectors = {
      slides: ".slider__slides .slide",
      thubmnails: ".slider__controls .slider__thumbnails button",
      directionControlNext: ".slider__controls .slider__direction-controls .next",
      directionControlPrev: ".slider__controls .slider__direction-controls .prev"
    };

    let activeClasses = {
      slide: "visible",
      thumbnail: "active"
    };

    let slides = Array.from(sliderBlock.querySelectorAll(elementsSelectors.slides));
    let slidesTotal = slides.length;
    let thumbnails = Array.from(sliderBlock.querySelectorAll(elementsSelectors.thubmnails));

    thumbnails.forEach(function(thubmnail, i){
      thubmnail.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        removeActiveClass(thumbnails, activeClasses.thumbnail);
        removeActiveClass(slides, activeClasses.slide);

        thubmnail.classList.add(activeClasses.thumbnail);
        slides[i].classList.add(activeClasses.slide);

        position = i;
      });
    });

    let nexSlideButton = sliderBlock.querySelector(elementsSelectors.directionControlNext);
    let prevSlideButton = sliderBlock.querySelector(elementsSelectors.directionControlPrev);

    nexSlideButton.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      if(position + 1 < slidesTotal){
        ++position;
      } else {
        position = 0;
      }

      removeActiveClass(thumbnails, activeClasses.thumbnail);
      removeActiveClass(slides, activeClasses.slide);

      slides[position].classList.add(activeClasses.slide);
      thumbnails[position].classList.add(activeClasses.thumbnail);
    });

    prevSlideButton.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      if(position  > 0){
        --position;
      } else {
        position = slidesTotal - 1;
      }

      removeActiveClass(thumbnails, activeClasses.thumbnail);
      removeActiveClass(slides, activeClasses.slide);

      slides[position].classList.add(activeClasses.slide);
      thumbnails[position].classList.add(activeClasses.thumbnail);
    });
  }
}

function initCatalogueNavMobileButton(blockSelector){
  let catalogueNav = document.querySelector(blockSelector);

  if(catalogueNav){
    handleCatalogueNavMobileButton(catalogueNav);
  }

  function handleCatalogueNavMobileButton(catalogueBlock){
    let elementsSelectors = {
      mobileButton: ".catalogue-nav__mobile-button",
      elementsList: ".catalogue-nav__list"
    };

    let mobileButton = catalogueBlock.querySelector(elementsSelectors.mobileButton);
    let elementsList = null;

    mobileButton.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      elementsList = catalogueBlock.querySelector(elementsSelectors.elementsList);
      elementsList.classList.toggle("open");
    })
  }
}

function initTabs(blockSelector){
  let tabsBlock = document.querySelector(blockSelector);

  if(tabsBlock){
    handleTabds(tabsBlock);
  }

  function handleTabds(tabsBlock){
    let elementsSelectors = {
      navButton: ".tabs__nav button",
      contentElement: ".tabs__content li"
    };

    let activeClasses = {
      navButton: "active",
      contentElement: "visible"
    };

    let navButtons = Array.from(tabsBlock.querySelectorAll(elementsSelectors.navButton));
    let contentElements = Array.from(tabsBlock.querySelectorAll(elementsSelectors.contentElement));

    navButtons.forEach(function(button, i){
      button.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        removeActiveClass(navButtons, activeClasses.navButton);
        removeActiveClass(contentElements, activeClasses.contentElement);

        button.classList.add(activeClasses.navButton);
        contentElements[i].classList.add(activeClasses.contentElement);
      })
    });

  }
}

function removeActiveClass(elements, activeClass){
  let totalElements = elements.length;

  for(let i = 0; i < totalElements; i++){
    let element = elements[i];

    if(element.classList.contains(activeClass)){
      element.classList.remove(activeClass);
      return;
    }
  }
}