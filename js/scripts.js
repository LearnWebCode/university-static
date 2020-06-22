import "../css/style.css"

// Our modules / classes
import MobileMenu from "./modules/MobileMenu"
import HeroSlider from "./modules/HeroSlider"


// Instantiate a new object using our modules/classes
var mobileMenu = new MobileMenu()
var heroSlider = new HeroSlider()

// Allow new JS and CSS to load in browser without a traditional page refresh
if (module.hot) {
  module.hot.accept()
}
