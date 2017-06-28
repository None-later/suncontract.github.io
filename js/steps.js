(function ($) {
  "use strict";

  function resetTransitionDelay(selection, maxDelay, direction) {

    var startY = selection.min(function () {
      return $(this).offset().top;
    });

    var endY = selection.max(function () {
      return $(this).offset().top;
    });

    console.log("Interpolating delay ", maxDelay, " between ", startY, " and ", endY);

    selection.each(function () {
      var weight = ($(this).offset().top - startY) / (endY - startY);
      var delay = maxDelay * ((direction > 0) ? weight : (1 - weight));
      $(this).css("transition-delay", delay + "s");
    });

  }

  /**
   * Do form coming in and coming out animations.
   *
   * @param selector CSS selector to map out elements needed to be animated
   */
  function doAnimation(selector) {

    var body = $(window.document.body);
    var animated = $(selector);

    // Not any animated elements present
    if (!animated.length) {
      return;
    }

    // Initialize animated element states
    body.addClass("page-in");
    animated.addClass("animated");

    // Override initial visibility hack
    // resetTransitionDelay(animated, 0.3, +1);

    $(window).on("load", function () {
      body.addClass("page-loaded");
    });

  }

  function changeActiveTab(newTab) {
      $("#invest-wizard a").each(function (index) {
          if ($(this).is($(newTab))) {
              $(this).parent().prop("class", "active");
              $(this).removeAttr("disabled");

              var tabID = $(this).data("tab-content");
              $(tabID).show();

              var tabTitle = $(this).data("tab-title");
              $(tabTitle).show();
          } else {
              $(this).parent().prop("class", "");
              //$(this).prop("disabled", true);

              var tabID = $(this).data("tab-content");
              $(tabID).hide();

              var tabTitle = $(this).data("tab-title");
              $(tabTitle).hide();
          }
      });
  }

  function validateCheckboxes() {
    if ($("#accept").is(":checked")) {
        $("#btn-next").prop("disabled", false);
        $("#btn-next").removeAttr("disabled");
    } else {
        $("#btn-next").attr('disabled', 'disabled');
    }
  }

  $(document).ready(function () {
     
      doAnimation(".modal-body");

      $("#navigation_terms").on("click", function () {
          if (! this.hasAttribute("disabled")) {
              changeActiveTab("#navigation_terms");
          }
      });
      $("#navigation_email").on("click", function () {
          if (!this.hasAttribute("disabled") && $("#accept").prop("checked")) {
              changeActiveTab("#navigation_email");
          }
      });

      $(".step-buttons").on("click", function () {
          if (!this.hasAttribute("disabled")) {
              $($(this).data("navigation-target")).removeAttr("disabled");
              $($(this).data("navigation-target"))[0].click();
          }
      });

      $("#accept").click(function () {
          validateCheckboxes();
      });
      /*
      $("#citizenship").click(function () {
          validateCheckboxes();
      });*/

  });

})(jQuery);