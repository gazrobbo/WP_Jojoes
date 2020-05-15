"use strict";

/**
 * Scripts within the customizer controls window.
 *
 * Contextually shows the color hue control and informs the preview
 * when users open or close the front page sections section.
 */
(function () {
  wp.customize.bind('ready', function () {
    // Only show the color hue control when there's a custom color scheme.
    wp.customize('colorscheme', function (setting) {
      wp.customize.control('colorscheme_hue', function (control) {
        var visibility = function visibility() {
          if ('custom' === setting.get()) {
            control.container.slideDown(180);
          } else {
            control.container.slideUp(180);
          }
        };

        visibility();
        setting.bind(visibility);
      });
    }); // Detect when the front page sections section is expanded (or closed) so we can adjust the preview accordingly.

    wp.customize.section('theme_options', function (section) {
      section.expanded.bind(function (isExpanding) {
        // Value of isExpanding will = true if you're entering the section, false if you're leaving it.
        wp.customize.previewer.send('section-highlight', {
          expanded: isExpanding
        });
      });
    });
  });
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWl6ZS1jb250cm9scy5qcyJdLCJuYW1lcyI6WyJ3cCIsImN1c3RvbWl6ZSIsImJpbmQiLCJzZXR0aW5nIiwiY29udHJvbCIsInZpc2liaWxpdHkiLCJnZXQiLCJjb250YWluZXIiLCJzbGlkZURvd24iLCJzbGlkZVVwIiwic2VjdGlvbiIsImV4cGFuZGVkIiwiaXNFeHBhbmRpbmciLCJwcmV2aWV3ZXIiLCJzZW5kIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFPQSxDQUFDLFlBQVk7QUFDVEEsRUFBQUEsRUFBRSxDQUFDQyxTQUFILENBQWFDLElBQWIsQ0FBa0IsT0FBbEIsRUFBMkIsWUFBWTtBQUVuQztBQUNBRixJQUFBQSxFQUFFLENBQUNDLFNBQUgsQ0FBYSxhQUFiLEVBQTRCLFVBQVVFLE9BQVYsRUFBbUI7QUFDM0NILE1BQUFBLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhRyxPQUFiLENBQXFCLGlCQUFyQixFQUF3QyxVQUFVQSxPQUFWLEVBQW1CO0FBQ3ZELFlBQUlDLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQVk7QUFDeEIsY0FBSSxhQUFhRixPQUFPLENBQUNHLEdBQVIsRUFBakIsRUFBZ0M7QUFDN0JGLFlBQUFBLE9BQU8sQ0FBQ0csU0FBUixDQUFrQkMsU0FBbEIsQ0FBNEIsR0FBNUI7QUFDSCxXQUZBLE1BRU07QUFDSEosWUFBQUEsT0FBTyxDQUFDRyxTQUFSLENBQWtCRSxPQUFsQixDQUEwQixHQUExQjtBQUNIO0FBQ0osU0FORDs7QUFRQUosUUFBQUEsVUFBVTtBQUNWRixRQUFBQSxPQUFPLENBQUNELElBQVIsQ0FBYUcsVUFBYjtBQUNILE9BWEQ7QUFZSCxLQWJELEVBSG1DLENBa0JuQzs7QUFDQUwsSUFBQUEsRUFBRSxDQUFDQyxTQUFILENBQWFTLE9BQWIsQ0FBcUIsZUFBckIsRUFBc0MsVUFBVUEsT0FBVixFQUFtQjtBQUNyREEsTUFBQUEsT0FBTyxDQUFDQyxRQUFSLENBQWlCVCxJQUFqQixDQUFzQixVQUFVVSxXQUFWLEVBQXVCO0FBRXpDO0FBQ0FaLFFBQUFBLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhWSxTQUFiLENBQXVCQyxJQUF2QixDQUE0QixtQkFBNUIsRUFBaUQ7QUFBQ0gsVUFBQUEsUUFBUSxFQUFFQztBQUFYLFNBQWpEO0FBQ0gsT0FKRDtBQUtILEtBTkQ7QUFPSCxHQTFCRDtBQTJCSCxDQTVCRCxFQTRCR0csTUE1QkgiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNjcmlwdHMgd2l0aGluIHRoZSBjdXN0b21pemVyIGNvbnRyb2xzIHdpbmRvdy5cbiAqXG4gKiBDb250ZXh0dWFsbHkgc2hvd3MgdGhlIGNvbG9yIGh1ZSBjb250cm9sIGFuZCBpbmZvcm1zIHRoZSBwcmV2aWV3XG4gKiB3aGVuIHVzZXJzIG9wZW4gb3IgY2xvc2UgdGhlIGZyb250IHBhZ2Ugc2VjdGlvbnMgc2VjdGlvbi5cbiAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHdwLmN1c3RvbWl6ZS5iaW5kKCdyZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyBPbmx5IHNob3cgdGhlIGNvbG9yIGh1ZSBjb250cm9sIHdoZW4gdGhlcmUncyBhIGN1c3RvbSBjb2xvciBzY2hlbWUuXG4gICAgICAgIHdwLmN1c3RvbWl6ZSgnY29sb3JzY2hlbWUnLCBmdW5jdGlvbiAoc2V0dGluZykge1xuICAgICAgICAgICAgd3AuY3VzdG9taXplLmNvbnRyb2woJ2NvbG9yc2NoZW1lX2h1ZScsIGZ1bmN0aW9uIChjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoJ2N1c3RvbScgPT09IHNldHRpbmcuZ2V0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuY29udGFpbmVyLnNsaWRlRG93bigxODApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbC5jb250YWluZXIuc2xpZGVVcCgxODApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHkoKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmJpbmQodmlzaWJpbGl0eSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRGV0ZWN0IHdoZW4gdGhlIGZyb250IHBhZ2Ugc2VjdGlvbnMgc2VjdGlvbiBpcyBleHBhbmRlZCAob3IgY2xvc2VkKSBzbyB3ZSBjYW4gYWRqdXN0IHRoZSBwcmV2aWV3IGFjY29yZGluZ2x5LlxuICAgICAgICB3cC5jdXN0b21pemUuc2VjdGlvbigndGhlbWVfb3B0aW9ucycsIGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgICAgICBzZWN0aW9uLmV4cGFuZGVkLmJpbmQoZnVuY3Rpb24gKGlzRXhwYW5kaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBWYWx1ZSBvZiBpc0V4cGFuZGluZyB3aWxsID0gdHJ1ZSBpZiB5b3UncmUgZW50ZXJpbmcgdGhlIHNlY3Rpb24sIGZhbHNlIGlmIHlvdSdyZSBsZWF2aW5nIGl0LlxuICAgICAgICAgICAgICAgIHdwLmN1c3RvbWl6ZS5wcmV2aWV3ZXIuc2VuZCgnc2VjdGlvbi1oaWdobGlnaHQnLCB7ZXhwYW5kZWQ6IGlzRXhwYW5kaW5nfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KShqUXVlcnkpO1xuIl0sImZpbGUiOiJjdXN0b21pemUtY29udHJvbHMuanMifQ==