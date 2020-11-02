class SliderThumbs extends Widget {
  constructor(node) {
    super(node, '.js-slider-thumbs');

    this.images = this.$node.querySelectorAll('img');
    this.imagesArray = [];

    // this.slider = this.queryElement('.slider');
    // this.navPrev = this.queryElement('.prev');
    // this.navNext = this.queryElement('.next');
    // this.pagination = this.queryElement('.pagination');

    this.swiper = null;

    this.initDesktop = false;
    this.initMobile = false;

    this.init();
  }

  build() {
    // Подготавливаем изображения для вставки в слайдер
    this.prepareImages();
    // Очищаем исходную разметку
    this.clearInitialHtml();
    // Вставляем в разметку
    this.buildHtml();
    this.events();
  }

  prepareImages() {
    this.images.forEach(item => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('swiper-slide');
      const img = document.createElement('img');
      img.src = item.dataset.original;
      wrapper.insertAdjacentElement('beforeend', img);
      this.imagesArray.push(wrapper);
    });
  }

  clearInitialHtml() {
    while (this.$node.firstChild) {
      this.$node.removeChild(this.$node.firstChild);
    }
  }

  buildHtml() {
    console.log(this.imagesArray);

    const slides = `${this.imagesArray.join('')}`;

    console.log(slides);
    const masterGallery = document.createElement('div');
    const thumbsGallery = document.createElement('div');

    masterGallery.classList.add('swiper-container');
    masterGallery.classList.add('js-slider-thumbs__master');
    thumbsGallery.classList.add('swiper-container');
    thumbsGallery.classList.add('js-slider-thumbs__thumbs');

    masterGallery.insertAdjacentHTML('beforeend',
      `
      <div class="swiper-wrapper">
        ${slides}
      </div>
      `);

    thumbsGallery.insertAdjacentHTML('beforeend',
      `
      <div class="swiper-wrapper">
        ${slides}
      </div>
      `);

    this.$node.insertAdjacentElement('beforeend', masterGallery);
    this.$node.insertAdjacentElement('beforeend', thumbsGallery);
  }

  events() {
    this.updateCache();
    onResize(this.updateCache.bind(this));
  }

  updateCache() {
    Layout.isMobileLayout() ? this.mobileEvents() : this.desktopEvents();
  }

  desktopEvents() {
    this.initMobile ? this.initMobile = false : null;

    if (!this.initDesktop) {
      if (this.swiper) this.destroySwiper();
      this.initSwiper(this.desktopOptions);
      setTimeout(() => this.swiper.update(), 100);
    }

    this.initDesktop = true;
  }

  mobileEvents() {
    this.initDesktop ? this.initDesktop = false : null;

    if (!this.initMobile) {
      if (this.swiper) this.destroySwiper();
      this.initSwiper(this.mobileOptions);
      setTimeout(() => this.swiper.update(), 100);
    }

    this.initMobile = true;
  }

  initSwiper(options) {
    this.swiper = new Swiper(this.slider, options);
  }

  destroySwiper() {
    this.swiper.destroy(true, true);
  }

  get desktopOptions() {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: this.navNext,
        prevEl: this.navPrev,
        disabledClass: 'disabled'
      },
      breakpoints: {
        1200: {
          spaceBetween: 40,
        },
      },
      loop: true,
      autoplay: {
        delay: 7000
      }
    }
  }

  get mobileOptions() {
    return {
      slidesPerView: 1,
      spaceBetween: 20,
      // pagination: {
      //   el: this.pagination,
      //   type: 'bullets',
      //   clickable: true,
      //   dynamicBullets: true,
      // },
      loop: true,
      autoplay: {
        delay: 7000
      }
    }
  }

  static init(el) {
    new SliderThumbs(el);
  }
}

window.SliderThumbs = SliderThumbs;