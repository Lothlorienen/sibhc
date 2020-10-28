class Header {
  constructor(node) {
    this.$node = node;
    this.$close = this.$node.querySelector('.js-header-menu__close');

    this.isInited = false;

    this.closeHandler = this.closeHandler.bind(this);

    this.events();
  }

  events() {
    this.resizeEvents();
    onResize(this.resizeEvents.bind(this));

    // Layout.addListener(this.onChangeLayout.bind(this));
  }

  onChangeLayout() {
    if (Layout.isDesktopLayout() === false) {

    } else {

    }
  }

  resizeEvents() {
    Layout.isTabletLayout() ? this.setClicker() : this.destroyClicker();
  }

  setClicker() {
    if (!this.isInited) this.$close.addEventListener('click', this.closeHandler);
    this.isInited = true;
  }

  destroyClicker() {
    if (!this.isInited) return;
    this.$close.removeEventListener('click', this.closeHandler);
    this.isInited = false;
  }

  closeHandler(e) {
    e.preventDefault();

    this.$node.classList.toggle('active');
    this.$node.classList.contains('active') ? hideScrollbar() : showScrollbar();
  }

  static initialize(el) {
    new Header(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.js-header-menu')) Header.initialize(document.querySelector('.js-header-menu'));
});