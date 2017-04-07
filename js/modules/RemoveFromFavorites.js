import $ from 'jquery';

class RemoveFromFavorites {
  constructor() {
    this.button = $(".remove-favorite");
    this.events()
  }

  events() {
    this.button.on("click", this.deleteFavorite);
  }

  deleteFavorite() {
    var self = this;
    $.ajax({
      url: window.magicalData.ajax_url,
      type: 'post',
      data: {
        action: 'delete_like',
        title: $(this).attr("data-title")
      },
      success: function(response) {
        if (response == "Post deleted") {
          $(self).parents("li").slideUp(300, function() {
            if ($(".favorites-list li:visible").length == 0) {
              $(".favorites-list").after("<p>You have not favorited any pages yet.</p>");
            }
          });
        }

        if (response == "You do not have permission to delete that post.") {
          $(self).html("Stop trying to hack");
        }

        
      }
    });
  }
}

export default RemoveFromFavorites;