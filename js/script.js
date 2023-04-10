// Load Masonry and imagesLoaded libraries
var $grid = $('.grid').imagesLoaded( function() {
    // Initialize Masonry layout
    $grid.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });
  
  // Initialize variables for pagination and loading
  var currentPage = 1;
  var isLoading = false;
  
  // Load new page of items via AJAX request
  function loadMore() {
    if (!isLoading) {
      isLoading = true;
      currentPage++;
      $.ajax({
        url: 'your-url-here?page=' + currentPage,
        success: function(data) {
          // Add new items to Masonry layout
          var $items = $(data).find('.grid-item');
          $grid.append($items).imagesLoaded(function() {
            $grid.masonry('appended', $items);
            isLoading = false;
          });
        }
      });
    }
  }
  
  // Load more items when user scrolls to bottom of page
  $(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      loadMore();
    }
  });
  