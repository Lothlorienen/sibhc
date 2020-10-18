class Sliders {
  constructor() {
    document.querySelectorAll('.js-home-slider').forEach(item => HomeSlider.init(item))
  }

  static init() {
    new Sliders();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  Sliders.init();
});
