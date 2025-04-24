document.addEventListener('DOMContentLoaded', function () {
    fetch('json/data.json')
      .then(response => response.json())
      .then(data => {
        const carousel = document.getElementById('carousel');
        let carouselHTML = '';
  
        data.carouselItems.forEach((item) => {
          carouselHTML += `
            <div class="carousel-item-a intro-item bg-image" style="background-image: url(${item.bgImage})">
              <div class="overlay overlay-a"></div>
              <div class="intro-content display-table">
                <div class="table-cell">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="intro-body">
                          <p class="intro-title-top">${item.topTitle}</p>
                          <h1 class="intro-title mb-4">${item.mainTitle}</h1>
                          <p class="intro-subtitle intro-price">
                            <a href="#">
                              <span class="price-a">
                                ${item.priceText || item.priceLink || ''}
                                ${item.priceLink ? `
                                  <i class="ion-ios-arrow-forward"></i>
                                  <i class="ion-ios-arrow-forward"></i>
                                  <i class="ion-ios-arrow-forward"></i>` : ''}
                              </span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
        });
        
  
        carousel.innerHTML = carouselHTML;
  
        // Initialize Owl Carousel
        $('#carousel').owlCarousel({
          items: 1,
          loop: true,
          nav: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true
        });
      })
      .catch(error => console.error('Error loading carousel data:', error));
  });
  

/* Property crousel */document.addEventListener('DOMContentLoaded', function () {
  function generatePropertyHTML(property) {
    return `
      <div class="carousel-item-b intro-item">
        <div class="card-box-a card-shadow">
          <div class="img-box-a">
            <img src="${property.image}" alt="${property.title.join(' ')}" class="img-a img-fluid">
          </div>
          <div class="card-overlay">
            <div class="card-overlay-a-content">
              <div class="card-header-a">
                <h2 class="card-title-a">
                  <a href="property-single.html">${property.title.join('<br />')}</a>
                </h2>
              </div>
              <div class="card-body-a">
                <div class="price-box d-flex">
                  <span class="price-a">rent | $12,000</span>
                </div>
                <a href="#" class="link-a">Click here to view <span class="ion-ios-arrow-forward"></span></a>
              </div>
              <div class="card-footer-a">
                <ul class="card-info d-flex justify-content-around">
                  <li><h4 class="card-info-title">Area</h4><span>${property.area}<sup>2</sup></span></li>
                  <li><h4 class="card-info-title">Beds</h4><span>${property.beds}</span></li>
                  <li><h4 class="card-info-title">Baths</h4><span>${property.baths}</span></li>
                  <li><h4 class="card-info-title">Garages</h4><span>${property.garages}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    `;
  }

  function initPropertyCarousel() {
    $('#property-carousel').owlCarousel({
      items: 3,
      loop: true,
      nav: true,
      dots: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });
  }

  function loadProperties() {
    const carousel = $('#property-carousel');
    carousel.html('');

    if (carousel.data('owl.carousel')) {
      carousel.trigger('destroy.owl.carousel');
      carousel.removeClass('owl-loaded');
      carousel.find('.owl-stage-outer').children().unwrap();
    }

    fetch('json/property.json')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        carousel.html(data.map(generatePropertyHTML).join(''));
        initPropertyCarousel();
      })
      .catch(error => {
        console.error('Error:', error);
        carousel.html('<div class="col-12 text-center">Error loading properties</div>');
      });
  }

  loadProperties();
});
