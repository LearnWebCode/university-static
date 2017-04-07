import $ from 'jquery';

class Search {
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.searchField = $("#search-term");
    this.searchOverlay = $(".search-overlay");
    this.closeButton = $(".search-overlay__close");

    this.typingTimer;
    this.isLoaderVisible = false;

    this.events();
  }

  events() {
    this.searchField.on("keyup", this.typingHandler.bind(this));
    this.openButton.on("click", this.openSearch.bind(this));
    this.closeButton.on("click", this.closeSearch.bind(this));
    document.addEventListener("keyup", this.keyPressHandler.bind(this));
  }

  typingHandler() {
    if (this.searchField.val() == "") {
      $("#professor-results, #program-results, #general-results, #campus-results, #event-results").html('');
      this.isLoaderVisible = false;
    } else if (!this.isLoaderVisible) {
      $("#professor-results, #program-results, #general-results, #campus-results, #event-results").html('<div class="spinner-loader"></div>');
      this.isLoaderVisible = true;
    }


    clearTimeout(this.typingTimer);
    if (this.searchField.val()) {
      this.typingTimer = setTimeout(this.searchJSON.bind(this), 1300);
    }
  }

  keyPressHandler(event) {
    // if escape key is pressed
    if (event.keyCode == 27) {
      if ($(".search-overlay").hasClass("search-overlay--active")) {
        this.closeSearch();
      }
    }

    // if s key is pressed
    if (event.keyCode == 83) {
      if (!$(".search-overlay").hasClass("search-overlay--active")) {
        this.openSearch();
      }
    }
  }

  openSearch() {
    var self = this;
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    setTimeout(function() {
      self.searchField.val("");
      self.searchField.focus();
    }, 301);
  }

  closeSearch() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }

  searchJSON() {
    console.log(this);
    var usersInput = this.searchField.val();
    $.getJSON("http://localhost:8888/university-demo/app/wp-json/wp/v2/professors?search=" + usersInput, function(rawData) {
      
      var data = rawData.filter(function(item) {
        return item.type == 'professors';
      });

      var professorsHTML = '<h2 class="search-overlay__section-title">Professors:</h2><ul class="professor-cards">';

      if (data.length > 0) {
        $.each(data, function(key, professor) {
          professorsHTML += '<li class="professor-card__list-item"><a href="' + professor.link + '" class="professor-card"><img class="professor-card__image" src="' + professor.better_featured_image.media_details.sizes.professorSmall.source_url + '"><span class="professor-card__name">' + professor.title.rendered + '</span></a></li> ';
        })
      } else {
        professorsHTML += '<p>No professors match that search.</p>';
      }

      $("#professor-results").html(professorsHTML);
      this.isLoaderVisible = false;
      
    });

    var pagesAndPosts = null;

    searchPosts();


    function searchPosts() {
      $.getJSON("http://localhost:8888/university-demo/app/wp-json/wp/v2/posts?search=" + usersInput, function(rawData) {
        
        var data = rawData.filter(function(item) {
          return item.type == 'post' || item.type == 'page';
        });

        //pagesAndPosts = pagesAndPosts.concat(data);
        var pagesAndPosts = data;
        var generalHTML = '<h2 class="search-overlay__section-title">General Information:</h2><ul class="link-list min-list">';

        if (pagesAndPosts.length > 0) {
          $.each(pagesAndPosts, function(key, page) {
            generalHTML += '<li><a href="' + page.link + '">' + page.title.rendered + '</a></li> ';
          })
        } else {
          generalHTML += '<p>No general information matches that search.</p>';
        }


        generalHTML += '</ul>';
        $("#general-results").html(generalHTML);
        this.isLoaderVisible = false;

      });
    }


    $.getJSON("http://localhost:8888/university-demo/app/wp-json/wp/v2/programs?search=" + usersInput, function(rawData) {
      
      var data = rawData.filter(function(item) {
        return item.type == 'programs';
      });

      var programsHTML = '<h2 class="search-overlay__section-title">Programs:</h2><ul class="link-list min-list">';
      
      if (data.length > 0) {
        $.each(data, function(key, program) {
          programsHTML += '<li><a href="' + program.link + '">' + program.title.rendered + '</a></li>';
        })
      } else {
        programsHTML += '<p>No programs match that search. View a <a href="/university-demo/app/programs">list of all our available programs</a>.</p>';
      }

      programsHTML += '</ul>';

      $("#program-results").html(programsHTML);
      this.isLoaderVisible = false;
    });


    $.getJSON("http://localhost:8888/university-demo/app/wp-json/wp/v2/campuses?search=" + usersInput, function(rawData) {
      
      var data = rawData.filter(function(item) {
        return item.type == 'campuses';
      });

      var campusesHTML = '<h2 class="search-overlay__section-title">Campuses:</h2><ul class="link-list min-list">';
      
      if (data.length > 0) {
        $.each(data, function(key, campus) {
          campusesHTML += '<li><a href="' + campus.link + '">' + campus.title.rendered + '</a></li>';
        })
      } else {
        campusesHTML += '<p>No campuses match that search. View a <a href="/university-demo/app/campuses">list of all our campuses</a>.</p>';
      }

      campusesHTML += '</ul>';

      $("#campus-results").html(campusesHTML);
      this.isLoaderVisible = false;
    });

    // get events ajax
    $.ajax({
      url: magicalData.ajax_url,
      type: 'post',
      data: {
        action: 'get_events',
        searchTerm: usersInput
      },
      success: function(response) {
        $("#event-results").html(response);
      }
    });
  }

}

export default Search;