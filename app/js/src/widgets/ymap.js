class YMap extends Widget {
  constructor(node) {
    super(node, '.js-ymap');

    // Map settings
    this.yandexMap = null;
    this.mapPlacemark = null;
    this.isMapInited = false;
    this.url = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1';

    // Observer
    this.observer = null;
    this.offset = {
      top: null,
      bottom: null,
    };
    this.resizeEvents = this.resizeEvents.bind(this);
    this.checkEntries = this.checkEntries.bind(this);

    this.init();
  }

  initializeMap() {
    this.yandexMap = new ymaps.Map(this.$node, {
      center: [56.031297, 92.828928],
      zoom: 16,
    }, {
      searchControlProvider: 'yandex#search'
    });

    // Отключаем прокрутку на карте
    this.yandexMap.behaviors.disable('scrollZoom');

    this.mapPlacemark = new ymaps.Placemark(this.yandexMap.getCenter(),
      {
        iconCaption: 'Сибирский хлебопекарный центр',
        balloonContentHeader: "Сибирский хлебопекарный центр",
        balloonContentBody: "Пищевое сырьё.",
        balloonContentFooter: "ул. Маерчака, 55, Красноярск, Россия",
      },
      {
        preset: 'islands#redIcon',
        // iconColor: '#0095b6'
      });

    this.yandexMap.geoObjects.add(this.mapPlacemark);

    // this.yMapCallback();
  }

  // yMapCallback() {
  //   //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  //   const layer = this.yandexMap.layers.get(0).get(0);
  //
  //   //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
  //   this.waitForTilesLoad(layer).then(() => {
  //   //Скрываем
  //     console.log('gggggg')
  //   });
  // }
  //
  // waitForTilesLoad(layer) {
  //   return new ymaps.vow.Promise((resolve, reject) => {
  //     const tc = this.getTileContainer(layer);
  //     let readyAll = true;
  //
  //     tc.tiles.each((tile, number) => {
  //       if (!tile.isReady()) readyAll = false;
  //     });
  //
  //     readyAll ? resolve() : tc.events.once("ready", () => resolve());
  //   });
  // }
  //
  // getTileContainer(layer) {
  //   for (var k in layer) {
  //     if (layer.hasOwnProperty(k)) {
  //       if (
  //         layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
  //         || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
  //       ) return layer[k];
  //     }
  //   }
  //   return null;
  // }

  loadScript(url, callback) {
    const script = document.createElement("script");

    if (script.readyState) {  //IE
      script.onreadystatechange = () => {
        if (script.readyState === "loaded" ||
          script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Другие браузеры
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  yMapBuild() {
    this.loadScript(this.url, () => ymaps.load(this.initializeMap.bind(this)));
  }

  build() {
    this.events();
    onResize(this.resizeEvents);
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
    offResize(this.resizeEvents);
  }

  resizeEvents() {
    this.updateOffset();
  }

  events() {
    this.updateOffset();
    this.initObserver();
  }

  updateOffset() {
    const viewportHeight = document.documentElement.clientHeight;
    this.offset.top = viewportHeight * -100 / 1e2;
    this.offset.bottom = viewportHeight * -100 / 1e2;
  }

  initObserver() {
    this.observer = this.createObserver();
    this.observer.observe(this.$node);
  }

  createObserver() {
    return new IntersectionObserver(this.checkEntries, this.observerConfig);
  }

  checkEntries(entries) {
    for (let entry of entries) {
      const {intersectionRatio, boundingClientRect: cords} = entry;

      if (intersectionRatio > 0) {
        if (!this.isMapInited) {
          this.yMapBuild();
          this.isMapInited = true;
        }

        return null;
      }
      else if ((cords.top > this.offset.top) && this.isMapInited) {
        this.destroy();

        return null;
      }
    }
  }

  get observerConfig() {
    return {
      rootMargin: '100% 0% 100% 0%',
      threshold: 0,
    }
  }

  static init(el) {
    el && new YMap(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-ymap').forEach(item => YMap.init(item));
});
