import $ from 'jquery';

class AddToFavorites {
  constructor() {
    this.button = $(".add-to-favorites");
    this.events();
  }

  events() {
    this.button.on('click', this.saveFavorite.bind(this));
  }

  saveFavorite() {
    var self = this;
    $.ajax({
      url: window.magicalData.ajax_url,
      type: 'post',
      data: {
        action: 'add_like',
        title: self.button.attr("data-title")
      },
      success: function(response) {
        console.log(response);

        if (response == 'post created') {
          self.button.html('Successfully added to your favorites...').addClass("btn--inactive").unbind("click");
        }

        if (response == 'wrong user') {
          self.button.html('Stop trying to hack').addClass("btn--inactive").unbind("click");
        }

        if (response == 'no permission') {
         self.button.html('You must be signed in to favorite a page.').addClass("btn--inactive").unbind("click"); 
        }
        
      }
    });
  }
}

export default AddToFavorites;