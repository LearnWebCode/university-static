import $ from 'jquery';

class MobileMenu {
  constructor() {
    this.menu = $(".site-header__menu");
    this.openButton = $(".site-header__menu-trigger");
    this.events();
  }

  events() {
    this.openButton.on("click", this.openMenu.bind(this));
  }

  openMenu() {
    this.openButton.toggleClass("fa-bars fa-window-close");
    this.menu.toggleClass("site-header__menu--active");
  }
}

export default MobileMenu;