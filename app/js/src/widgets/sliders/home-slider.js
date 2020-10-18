class HomeSlider extends Widget {
  constructor(node) {
    super(node, '.js-home-slider');

    this.swiper = null;
    this.content = this.queryElement('.content');
    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');

    this.init();
  }

  build() {
    this.events();
  }

  destroy() {

  }

  events() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper(this.content, {
      slidesPerView: 1,
      spaceBetween: 40,
      navigation: {
        nextEl: this.navNext,
        prevEl: this.navPrev,
        disabledClass: 'disabled'
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      autoplay: {
        delay: 7000
      }
    })
  }

  static init(el) {
    new HomeSlider(el);
  }
}

window.HomeSlider = HomeSlider;