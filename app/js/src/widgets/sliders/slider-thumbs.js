class SliderThumbs extends Widget {
  constructor(node) {
    super(node, '.js-slider-thumbs');

    this.images = this.$node.querySelectorAll('img');
    this.slidesArray = [];

    this.sliderMaster = null;
    this.sliderThumbs = null;

    this.swiperMaster = null;
    this.swiperThumbs = null;

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
    this.generateSliderHtml();
    //
    this.events();
  }

  prepareImages() {
    this.images.forEach(item => {
      const wrapper = document.createElement('div');
      const img = document.createElement('img');

      wrapper.classList.add('swiper-slide');
      img.src = item.dataset.original;
      img.alt = item.alt;
      wrapper.insertAdjacentElement('beforeend', img);

      const result = wrapper.outerHTML;
      this.slidesArray.push(result);
    });
  }

  clearInitialHtml() {
    while (this.$node.firstChild) {
      this.$node.removeChild(this.$node.firstChild);
    }
  }

  generateSliderHtml() {
    const slides = `${this.slidesArray.join('')}`;
    this.sliderMaster = document.createElement('div');
    this.sliderThumbs = document.createElement('div');

    this.sliderMaster.classList.add('slider-thumbs__master');
    this.sliderMaster.classList.add('swiper-container');
    this.sliderMaster.classList.add('js-slider-thumbs__master');
    this.sliderThumbs.classList.add('slider-thumbs__thumbs');
    this.sliderThumbs.classList.add('swiper-container');
    this.sliderThumbs.classList.add('js-slider-thumbs__thumbs');

    this.sliderMaster.insertAdjacentHTML('beforeend',
      `
      <div class="swiper-wrapper">
        ${slides}
      </div>
      <div class="slider-thumbs__nav swiper-button-next"></div>
      <div class="slider-thumbs__nav swiper-button-prev"></div>
      `);

    this.sliderThumbs.insertAdjacentHTML('beforeend',
      `
      <div class="swiper-wrapper">
        ${slides}
      </div>
      `);

    this.$node.insertAdjacentElement('beforeend', this.sliderMaster);
    this.$node.insertAdjacentElement('beforeend', this.sliderThumbs);
  }

  events() {
    this.desktopMasterEvents();
    // this.updateCache();
    // onResize(this.updateCache.bind(this));
  }

  updateCache() {
    // Layout.isMobileLayout() ? this.mobileEvents() : this.desktopEvents();
  }

  desktopMasterEvents() {
    this.swiperThumbs = new Swiper(this.sliderThumbs, {
      spaceBetween: 10,
      slidesPerView: 3,
      loop: true,
      freeMode: true,
      loopedSlides: this.slidesArray.length, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    this.swiperMaster = new Swiper(this.sliderMaster, {
      spaceBetween: 10,
      loop: true,
      loopedSlides: this.slidesArray.length, //looped slides should be the same
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: this.swiperThumbs,
      },
    });
  }

  desktopEvents() {
    // this.initMobile ? this.initMobile = false : null;
    //
    // if (!this.initDesktop) {
    //   if (this.swiper) this.destroySwiper();
    //   this.initSwiper(this.desktopOptions);
    //   setTimeout(() => this.swiper.update(), 100);
    // }
    //
    // this.initDesktop = true;
  }

  mobileEvents() {
    // this.initDesktop ? this.initDesktop = false : null;
    //
    // if (!this.initMobile) {
    //   if (this.swiper) this.destroySwiper();
    //   this.initSwiper(this.mobileOptions);
    //   setTimeout(() => this.swiper.update(), 100);
    // }
    //
    // this.initMobile = true;
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