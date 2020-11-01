class Sliders {
  constructor() {
    document.querySelectorAll('.js-home-slider').forEach(item => HomeSlider.init(item))
    document.querySelectorAll('.js-carousel-slider').forEach(item => CarouselSlider.init(item))
  }

  static init() {
    new Sliders();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Sliders.init();
});
