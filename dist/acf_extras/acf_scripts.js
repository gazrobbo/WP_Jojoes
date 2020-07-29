"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var headerLayouts = '';
var changeHeader = '';
var showMainEditor = '';
var sectionLayouts = '';
var mainEditor = ''; //hook into prepare to load after acf loads fields
// acf.addAction('prepare', function () {
//auto collapse all sections if found
// sectionLayouts = acf.getPostbox('acf-group_5aa6a924b02ff');
// 	// if (typeof sectionLayouts !== 'undefined') {
// 	// 	sectionLayouts = sectionLayouts.$el;
// 	// 	sectionLayouts.find('.values .layout').addClass('-collapsed');
// 	// }
//move header layout above editor if found
// headerLayouts = acf.getPostbox('acf-group_5a79fa1baf007');
// if (typeof headerLayouts !== 'undefined') {
// 	mainEditor = document.querySelector('#postdivrich');
//
// 	//move header section under title, above editor
// 	if (headerLayouts.length && mainEditor !== null) {
// 		let postBody = document.querySelector('#post-body-content');
// 		postBody.insertBefore(headerLayouts[0], mainEditor);
// 	}
// }
//when these checboxes are toggled scroll to the section shown
// showMainEditor = acf.getField('field_5c5f7e2dcf40f').$el;
// changeHeader = acf.getField('field_5c4b66a65ae2c').$el;
//
// if (showMainEditor.length) {
// 	if (document.querySelector('.block-editor__container') !== null) {
// 		showMainEditor.hide(); //hide if block editor is showing
// 	}
//
// 	showMainEditor[0].addEventListener('change', highlight_section);
// }
//
// if (changeHeader.length) {
// 	changeHeader[0].addEventListener('change', highlight_section);
// }
// });
//highlight and scroll to this section

function highlight_section(e) {
  var acfSelector = document.querySelector(e.target.dataset.ignClass);

  if (acfSelector !== null) {
    if (e.target.checked) {
      acfSelector.classList.add('highlight');
      $('html, body').animate({
        scrollTop: $(e.target.dataset.ignClass).offset().top - 50
      }, 200);
    } else {
      acfSelector.classList.remove('highlight');
    }
  }
} //TOGGLE CLASSES BASED ON DATA-IGN-CLASSES
//must be text input or true/false checkbox
//on load set the classes


document.addEventListener('DOMContentLoaded', function () {
  //get the data attribute
  var igndataattributes = document.querySelectorAll('[data-ign-class]');
  igndataattributes.forEach(function (acfinput) {
    changeIgnClasses(acfinput);
  });
  addDraggableGrid();
}); //anytime this input changes, change the class

document.addEventListener('change', function (event) {
  if (event.target.matches('[data-ign-class]')) {
    changeIgnClasses(event.target);
  }
}); //the magic of ign data class

function changeIgnClasses(acfInput) {
  //to do anything there must be a value set
  var dataValue = acfInput.getAttribute('data-ign-class'); //find the data attribute as a selector
  //first go up only to the nearest set of fields. if nothing is found query all the way up.

  var acfSelector = acfInput.closest('.acf-fields').querySelector(dataValue);

  if (acfSelector == null) {
    acfSelector = acfInput.closest(dataValue);
  }

  if (acfSelector == null) {
    acfSelector = document.querySelector(dataValue);
  } //cannot find then reutrn


  if (acfSelector == null) {
    return;
  } //if found selector, remove previous values if any


  if (acfInput.getAttribute('data-last-value')) {
    var _acfSelector$classLis;

    var lastValues = acfInput.getAttribute('data-last-value').split(' ');
    lastValues = lastValues.filter(Boolean); //remove any empty strings

    (_acfSelector$classLis = acfSelector.classList).remove.apply(_acfSelector$classLis, _toConsumableArray(lastValues));
  } //set class on the queried selector if there is a value or a check if checkbox


  if (acfInput.value !== ' ' && acfInput.value) {
    var classes = ''; //tru/false type.

    if (acfInput.type === 'checkbox') {
      classes = acfInput.checked ? 'checked' : 'unchecked';
      acfSelector.classList.add(classes);
      acfInput.setAttribute('data-last-value', classes);
    } else {
      var _acfSelector$classLis2;

      //text type
      classes = acfInput.value.split(' '); //if there is more than one class

      classes = classes.filter(Boolean); //get rid of any spaces, they are not classes.

      (_acfSelector$classLis2 = acfSelector.classList).add.apply(_acfSelector$classLis2, _toConsumableArray(classes));

      acfInput.setAttribute('data-last-value', acfInput.value);
    }
  }
} //draggable grid!! Now users can drag grid boxes in admin area instead of adding classes for it
//this function added when dom is loaded using above listener


function addDraggableGrid() {
  //get top most acf-fields which holds everything
  var acfFields = document.querySelector('#poststuff'); //start dragger at 0

  var pageX = 0; //selectors based on what is dragged

  var acfSelector = '';
  var mceIframes = document.querySelectorAll('.mce-container iframe'); //when anything inside fields is clicked and matches the handle-remove and then is dragged

  acfFields.addEventListener('mousedown', function (e) {
    if (e.target.matches('.grid-class .acf-row-handle.remove')) {
      //console.log('mouse down');
      //set coordinates
      pageX = e.pageX; //get this field item

      acfSelector = e.target.previousElementSibling.closest('.acf-row'); //on drag
      //frames needed for fix so when you drag over it doesnt break.

      mceIframes = document.querySelectorAll('.mce-container iframe');
      window.addEventListener('mousemove', dragGrid, true);
    }
  }); //anywhere where mouse is lifted

  window.addEventListener('mouseup', function () {
    //remove drag
    window.removeEventListener('mousemove', dragGrid, true); //fix iframes

    mceIframes.forEach(function (item) {
      item.style.pointerEvents = 'auto';
    });
    acfFields.style.cursor = 'auto';
  }); //allow dragging!

  function dragGrid(e) {
    e.preventDefault();
    e.stopPropagation(); //remove iframe issues by disabling click for a while

    mceIframes.forEach(function (item) {
      item.style.pointerEvents = 'none';
    }); //make mouse look like resizing

    acfFields.style.cursor = 'ew-resize'; //set card-grid to grid automatically

    $gridType = acfSelector.closest('.acf-fields').querySelector('[data-ign-class=".grid-class"]');

    if ($gridType.value.includes('card-grid')) {
      $gridType.value = $gridType.value.replace('card-grid', 'grid');
      changeIgnClasses($gridType);
    }

    if (!$gridType.value.includes('grid')) {
      $gridType.value += ' grid';
      $gridType.value = $gridType.value.trim();
      changeIgnClasses($gridType);
    } //set the grid values and update


    var gridInput = acfSelector.querySelector('[data-ign-class]');
    var oldValue = gridInput.value;
    var span = 6;

    if (oldValue.includes('span')) {
      span = /span-(\d+)/g.exec(oldValue)[1];
      span = parseInt(span);
      oldValue = oldValue.replace(/span-\d+/g, ''); //remove span from value
    }

    if (pageX !== 0 && e.pageX > pageX + 100) {
      //bigger span
      if (span < 12) {
        span++;
      }

      pageX += 100;
    }

    if (pageX !== 0 && e.pageX < pageX - 100) {
      //smaller span
      if (span > 1) {
        span--;
      }

      pageX -= 100;
    } //set actual value and update


    var newValue = 'span-' + span + ' ' + oldValue;
    newValue = newValue.trim();
    gridInput.value = newValue;
    changeIgnClasses(gridInput);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjZl9leHRyYXMvYWNmX3NjcmlwdHMuanMiXSwibmFtZXMiOlsiaGVhZGVyTGF5b3V0cyIsImNoYW5nZUhlYWRlciIsInNob3dNYWluRWRpdG9yIiwic2VjdGlvbkxheW91dHMiLCJtYWluRWRpdG9yIiwiaGlnaGxpZ2h0X3NlY3Rpb24iLCJlIiwiYWNmU2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaWduQ2xhc3MiLCJjaGVja2VkIiwiY2xhc3NMaXN0IiwiYWRkIiwiJCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaWduZGF0YWF0dHJpYnV0ZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImFjZmlucHV0IiwiY2hhbmdlSWduQ2xhc3NlcyIsImFkZERyYWdnYWJsZUdyaWQiLCJldmVudCIsIm1hdGNoZXMiLCJhY2ZJbnB1dCIsImRhdGFWYWx1ZSIsImdldEF0dHJpYnV0ZSIsImNsb3Nlc3QiLCJsYXN0VmFsdWVzIiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwidmFsdWUiLCJjbGFzc2VzIiwidHlwZSIsInNldEF0dHJpYnV0ZSIsImFjZkZpZWxkcyIsInBhZ2VYIiwibWNlSWZyYW1lcyIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJ3aW5kb3ciLCJkcmFnR3JpZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpdGVtIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwiY3Vyc29yIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCIkZ3JpZFR5cGUiLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJ0cmltIiwiZ3JpZElucHV0Iiwib2xkVmFsdWUiLCJzcGFuIiwiZXhlYyIsInBhcnNlSW50IiwibmV3VmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsYUFBYSxHQUFHLEVB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QUNOLElBQVQsRUFBWDtBQUNBQyxJQUFBQSxTQUFTLENBQUNyQixLQUFWLEdBQWtCMEIsUUFBbEI7QUFDQXRDLElBQUFBLGdCQUFnQixDQUFDaUMsU0FBRCxDQUFoQjtBQUNBO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaGVhZGVyTGF5b3V0cyA9ICcnO1xubGV0IGNoYW5nZUhlYWRlciA9ICcnO1xubGV0IHNob3dNYWluRWRpdG9yID0gJyc7XG5sZXQgc2VjdGlvbkxheW91dHMgPSAnJztcbmxldCBtYWluRWRpdG9yID0gJyc7XG5cbi8vaG9vayBpbnRvIHByZXBhcmUgdG8gbG9hZCBhZnRlciBhY2YgbG9hZHMgZmllbGRzXG4vLyBhY2YuYWRkQWN0aW9uKCdwcmVwYXJlJywgZnVuY3Rpb24gKCkge1xuXG5cdC8vYXV0byBjb2xsYXBzZSBhbGwgc2VjdGlvbnMgaWYgZm91bmRcblx0Ly8gc2VjdGlvbkxheW91dHMgPSBhY2YuZ2V0UG9zdGJveCgnYWNmLWdyb3VwXzVhYTZhOTI0YjAyZmYnKTtcblx0Ly8gXHQvLyBpZiAodHlwZW9mIHNlY3Rpb25MYXlvdXRzICE9PSAndW5kZWZpbmVkJykge1xuXHQvLyBcdC8vIFx0c2VjdGlvbkxheW91dHMgPSBzZWN0aW9uTGF5b3V0cy4kZWw7XG5cdC8vIFx0Ly8gXHRzZWN0aW9uTGF5b3V0cy5maW5kKCcudmFsdWVzIC5sYXlvdXQnKS5hZGRDbGFzcygnLWNvbGxhcHNlZCcpO1xuXHQvLyBcdC8vIH1cblxuXHQvL21vdmUgaGVhZGVyIGxheW91dCBhYm92ZSBlZGl0b3IgaWYgZm91bmRcblx0Ly8gaGVhZGVyTGF5b3V0cyA9IGFjZi5nZXRQb3N0Ym94KCdhY2YtZ3JvdXBfNWE3OWZhMWJhZjAwNycpO1xuXHQvLyBpZiAodHlwZW9mIGhlYWRlckxheW91dHMgIT09ICd1bmRlZmluZWQnKSB7XG5cdC8vIFx0bWFpbkVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3N0ZGl2cmljaCcpO1xuXHQvL1xuXHQvLyBcdC8vbW92ZSBoZWFkZXIgc2VjdGlvbiB1bmRlciB0aXRsZSwgYWJvdmUgZWRpdG9yXG5cdC8vIFx0aWYgKGhlYWRlckxheW91dHMubGVuZ3RoICYmIG1haW5FZGl0b3IgIT09IG51bGwpIHtcblx0Ly8gXHRcdGxldCBwb3N0Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3N0LWJvZHktY29udGVudCcpO1xuXHQvLyBcdFx0cG9zdEJvZHkuaW5zZXJ0QmVmb3JlKGhlYWRlckxheW91dHNbMF0sIG1haW5FZGl0b3IpO1xuXHQvLyBcdH1cblx0Ly8gfVxuXG5cdC8vd2hlbiB0aGVzZSBjaGVjYm94ZXMgYXJlIHRvZ2dsZWQgc2Nyb2xsIHRvIHRoZSBzZWN0aW9uIHNob3duXG5cdC8vIHNob3dNYWluRWRpdG9yID0gYWNmLmdldEZpZWxkKCdmaWVsZF81YzVmN2UyZGNmNDBmJykuJGVsO1xuXHQvLyBjaGFuZ2VIZWFkZXIgPSBhY2YuZ2V0RmllbGQoJ2ZpZWxkXzVjNGI2NmE2NWFlMmMnKS4kZWw7XG5cdC8vXG5cdC8vIGlmIChzaG93TWFpbkVkaXRvci5sZW5ndGgpIHtcblx0Ly8gXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2NrLWVkaXRvcl9fY29udGFpbmVyJykgIT09IG51bGwpIHtcblx0Ly8gXHRcdHNob3dNYWluRWRpdG9yLmhpZGUoKTsgLy9oaWRlIGlmIGJsb2NrIGVkaXRvciBpcyBzaG93aW5nXG5cdC8vIFx0fVxuXHQvL1xuXHQvLyBcdHNob3dNYWluRWRpdG9yWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhpZ2hsaWdodF9zZWN0aW9uKTtcblx0Ly8gfVxuXHQvL1xuXHQvLyBpZiAoY2hhbmdlSGVhZGVyLmxlbmd0aCkge1xuXHQvLyBcdGNoYW5nZUhlYWRlclswXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoaWdobGlnaHRfc2VjdGlvbik7XG5cdC8vIH1cblxuLy8gfSk7XG5cbi8vaGlnaGxpZ2h0IGFuZCBzY3JvbGwgdG8gdGhpcyBzZWN0aW9uXG5mdW5jdGlvbiBoaWdobGlnaHRfc2VjdGlvbiAoZSkge1xuXG5cdGxldCBhY2ZTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZS50YXJnZXQuZGF0YXNldC5pZ25DbGFzcyk7XG5cblx0aWYgKGFjZlNlbGVjdG9yICE9PSBudWxsKSB7XG5cdFx0aWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcblx0XHRcdGFjZlNlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpO1xuXHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRzY3JvbGxUb3A6ICQoZS50YXJnZXQuZGF0YXNldC5pZ25DbGFzcykub2Zmc2V0KCkudG9wIC0gNTBcblx0XHRcdH0sIDIwMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFjZlNlbGVjdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hsaWdodCcpO1xuXHRcdH1cblx0fVxufVxuXG4vL1RPR0dMRSBDTEFTU0VTIEJBU0VEIE9OIERBVEEtSUdOLUNMQVNTRVNcbi8vbXVzdCBiZSB0ZXh0IGlucHV0IG9yIHRydWUvZmFsc2UgY2hlY2tib3hcblxuLy9vbiBsb2FkIHNldCB0aGUgY2xhc3Nlc1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0Ly9nZXQgdGhlIGRhdGEgYXR0cmlidXRlXG5cdGxldCBpZ25kYXRhYXR0cmlidXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWlnbi1jbGFzc10nKTtcblx0aWduZGF0YWF0dHJpYnV0ZXMuZm9yRWFjaChhY2ZpbnB1dCA9PiB7XG5cdFx0Y2hhbmdlSWduQ2xhc3NlcyhhY2ZpbnB1dCk7XG5cdH0pO1xuXG5cdGFkZERyYWdnYWJsZUdyaWQoKTtcblxufSk7XG5cbi8vYW55dGltZSB0aGlzIGlucHV0IGNoYW5nZXMsIGNoYW5nZSB0aGUgY2xhc3NcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xuXHRpZiAoZXZlbnQudGFyZ2V0Lm1hdGNoZXMoJ1tkYXRhLWlnbi1jbGFzc10nKSkge1xuXHRcdGNoYW5nZUlnbkNsYXNzZXMoZXZlbnQudGFyZ2V0KTtcblx0fVxufSk7XG5cbi8vdGhlIG1hZ2ljIG9mIGlnbiBkYXRhIGNsYXNzXG5mdW5jdGlvbiBjaGFuZ2VJZ25DbGFzc2VzIChhY2ZJbnB1dCkge1xuXHQvL3RvIGRvIGFueXRoaW5nIHRoZXJlIG11c3QgYmUgYSB2YWx1ZSBzZXRcblx0bGV0IGRhdGFWYWx1ZSA9IGFjZklucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZ24tY2xhc3MnKTtcblxuXHQvL2ZpbmQgdGhlIGRhdGEgYXR0cmlidXRlIGFzIGEgc2VsZWN0b3Jcblx0Ly9maXJzdCBnbyB1cCBvbmx5IHRvIHRoZSBuZWFyZXN0IHNldCBvZiBmaWVsZHMuIGlmIG5vdGhpbmcgaXMgZm91bmQgcXVlcnkgYWxsIHRoZSB3YXkgdXAuXG5cdGxldCBhY2ZTZWxlY3RvciA9IGFjZklucHV0LmNsb3Nlc3QoJy5hY2YtZmllbGRzJykucXVlcnlTZWxlY3RvcihkYXRhVmFsdWUpO1xuXHRpZiAoYWNmU2VsZWN0b3IgPT0gbnVsbCkge1xuXHRcdGFjZlNlbGVjdG9yID0gYWNmSW5wdXQuY2xvc2VzdChkYXRhVmFsdWUpO1xuXHR9XG5cdGlmIChhY2ZTZWxlY3RvciA9PSBudWxsKSB7XG5cdFx0YWNmU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFWYWx1ZSk7XG5cdH1cblxuXHQvL2Nhbm5vdCBmaW5kIHRoZW4gcmV1dHJuXG5cdGlmIChhY2ZTZWxlY3RvciA9PSBudWxsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly9pZiBmb3VuZCBzZWxlY3RvciwgcmVtb3ZlIHByZXZpb3VzIHZhbHVlcyBpZiBhbnlcblx0aWYgKGFjZklucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1sYXN0LXZhbHVlJykpIHtcblx0XHRsZXQgbGFzdFZhbHVlcyA9IGFjZklucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1sYXN0LXZhbHVlJykuc3BsaXQoJyAnKTtcblx0XHRsYXN0VmFsdWVzID0gbGFzdFZhbHVlcy5maWx0ZXIoQm9vbGVhbik7IC8vcmVtb3ZlIGFueSBlbXB0eSBzdHJpbmdzXG5cdFx0YWNmU2VsZWN0b3IuY2xhc3NMaXN0LnJlbW92ZSguLi5sYXN0VmFsdWVzKTtcblx0fVxuXG5cdC8vc2V0IGNsYXNzIG9uIHRoZSBxdWVyaWVkIHNlbGVjdG9yIGlmIHRoZXJlIGlzIGEgdmFsdWUgb3IgYSBjaGVjayBpZiBjaGVja2JveFxuXHRpZiAoYWNmSW5wdXQudmFsdWUgIT09ICcgJyAmJiBhY2ZJbnB1dC52YWx1ZSkge1xuXHRcdGxldCBjbGFzc2VzID0gJyc7XG5cblx0XHQvL3RydS9mYWxzZSB0eXBlLlxuXHRcdGlmIChhY2ZJbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG5cdFx0XHRjbGFzc2VzID0gYWNmSW5wdXQuY2hlY2tlZCA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuXHRcdFx0YWNmU2VsZWN0b3IuY2xhc3NMaXN0LmFkZChjbGFzc2VzKTtcblx0XHRcdGFjZklucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS1sYXN0LXZhbHVlJywgY2xhc3Nlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vdGV4dCB0eXBlXG5cdFx0XHRjbGFzc2VzID0gYWNmSW5wdXQudmFsdWUuc3BsaXQoJyAnKTsgLy9pZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIGNsYXNzXG5cdFx0XHRjbGFzc2VzID0gY2xhc3Nlcy5maWx0ZXIoQm9vbGVhbik7IC8vZ2V0IHJpZCBvZiBhbnkgc3BhY2VzLCB0aGV5IGFyZSBub3QgY2xhc3Nlcy5cblx0XHRcdGFjZlNlbGVjdG9yLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG5cdFx0XHRhY2ZJbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFzdC12YWx1ZScsIGFjZklucHV0LnZhbHVlKTtcblx0XHR9XG5cblx0fVxuXG59XG5cbi8vZHJhZ2dhYmxlIGdyaWQhISBOb3cgdXNlcnMgY2FuIGRyYWcgZ3JpZCBib3hlcyBpbiBhZG1pbiBhcmVhIGluc3RlYWQgb2YgYWRkaW5nIGNsYXNzZXMgZm9yIGl0XG4vL3RoaXMgZnVuY3Rpb24gYWRkZWQgd2hlbiBkb20gaXMgbG9hZGVkIHVzaW5nIGFib3ZlIGxpc3RlbmVyXG5mdW5jdGlvbiBhZGREcmFnZ2FibGVHcmlkICgpIHtcblx0Ly9nZXQgdG9wIG1vc3QgYWNmLWZpZWxkcyB3aGljaCBob2xkcyBldmVyeXRoaW5nXG5cdGxldCBhY2ZGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9zdHN0dWZmJyk7XG5cblx0Ly9zdGFydCBkcmFnZ2VyIGF0IDBcblx0bGV0IHBhZ2VYID0gMDtcblxuXHQvL3NlbGVjdG9ycyBiYXNlZCBvbiB3aGF0IGlzIGRyYWdnZWRcblx0bGV0IGFjZlNlbGVjdG9yID0gJyc7XG5cdGxldCBtY2VJZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1jZS1jb250YWluZXIgaWZyYW1lJyk7XG5cblx0Ly93aGVuIGFueXRoaW5nIGluc2lkZSBmaWVsZHMgaXMgY2xpY2tlZCBhbmQgbWF0Y2hlcyB0aGUgaGFuZGxlLXJlbW92ZSBhbmQgdGhlbiBpcyBkcmFnZ2VkXG5cdGFjZkZpZWxkcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChlLnRhcmdldC5tYXRjaGVzKCcuZ3JpZC1jbGFzcyAuYWNmLXJvdy1oYW5kbGUucmVtb3ZlJykpIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ21vdXNlIGRvd24nKTtcblx0XHRcdC8vc2V0IGNvb3JkaW5hdGVzXG5cdFx0XHRwYWdlWCA9IGUucGFnZVg7XG5cdFx0XHQvL2dldCB0aGlzIGZpZWxkIGl0ZW1cblx0XHRcdGFjZlNlbGVjdG9yID0gZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5jbG9zZXN0KCcuYWNmLXJvdycpO1xuXG5cdFx0XHQvL29uIGRyYWdcblx0XHRcdC8vZnJhbWVzIG5lZWRlZCBmb3IgZml4IHNvIHdoZW4geW91IGRyYWcgb3ZlciBpdCBkb2VzbnQgYnJlYWsuXG5cdFx0XHRtY2VJZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1jZS1jb250YWluZXIgaWZyYW1lJyk7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0dyaWQsIHRydWUpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly9hbnl3aGVyZSB3aGVyZSBtb3VzZSBpcyBsaWZ0ZWRcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly9yZW1vdmUgZHJhZ1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnR3JpZCwgdHJ1ZSk7XG5cdFx0Ly9maXggaWZyYW1lc1xuXHRcdG1jZUlmcmFtZXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcblx0XHR9KTtcblxuXHRcdGFjZkZpZWxkcy5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG5cdH0pO1xuXG5cdC8vYWxsb3cgZHJhZ2dpbmchXG5cdGZ1bmN0aW9uIGRyYWdHcmlkIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHQvL3JlbW92ZSBpZnJhbWUgaXNzdWVzIGJ5IGRpc2FibGluZyBjbGljayBmb3IgYSB3aGlsZVxuXHRcdG1jZUlmcmFtZXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGl0ZW0uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblx0XHR9KTtcblxuXHRcdC8vbWFrZSBtb3VzZSBsb29rIGxpa2UgcmVzaXppbmdcblx0XHRhY2ZGaWVsZHMuc3R5bGUuY3Vyc29yID0gJ2V3LXJlc2l6ZSc7XG5cblx0XHQvL3NldCBjYXJkLWdyaWQgdG8gZ3JpZCBhdXRvbWF0aWNhbGx5XG5cdFx0JGdyaWRUeXBlID0gYWNmU2VsZWN0b3IuY2xvc2VzdCgnLmFjZi1maWVsZHMnKS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZ24tY2xhc3M9XCIuZ3JpZC1jbGFzc1wiXScpO1xuXHRcdGlmICgkZ3JpZFR5cGUudmFsdWUuaW5jbHVkZXMoJ2NhcmQtZ3JpZCcpKSB7XG5cdFx0XHQkZ3JpZFR5cGUudmFsdWUgPSAkZ3JpZFR5cGUudmFsdWUucmVwbGFjZSgnY2FyZC1ncmlkJywgJ2dyaWQnKTtcblx0XHRcdGNoYW5nZUlnbkNsYXNzZXMoJGdyaWRUeXBlKTtcblx0XHR9XG5cblx0XHRpZiAoISRncmlkVHlwZS52YWx1ZS5pbmNsdWRlcygnZ3JpZCcpKSB7XG5cdFx0XHQkZ3JpZFR5cGUudmFsdWUgKz0gJyBncmlkJztcblx0XHRcdCRncmlkVHlwZS52YWx1ZSA9ICRncmlkVHlwZS52YWx1ZS50cmltKCk7XG5cdFx0XHRjaGFuZ2VJZ25DbGFzc2VzKCRncmlkVHlwZSk7XG5cdFx0fVxuXG5cdFx0Ly9zZXQgdGhlIGdyaWQgdmFsdWVzIGFuZCB1cGRhdGVcblx0XHRsZXQgZ3JpZElucHV0ID0gYWNmU2VsZWN0b3IucXVlcnlTZWxlY3RvcignW2RhdGEtaWduLWNsYXNzXScpO1xuXHRcdGxldCBvbGRWYWx1ZSA9IGdyaWRJbnB1dC52YWx1ZTtcblx0XHRsZXQgc3BhbiA9IDY7XG5cblx0XHRpZiAob2xkVmFsdWUuaW5jbHVkZXMoJ3NwYW4nKSkge1xuXHRcdFx0c3BhbiA9IC9zcGFuLShcXGQrKS9nLmV4ZWMob2xkVmFsdWUpWzFdO1xuXHRcdFx0c3BhbiA9IHBhcnNlSW50KHNwYW4pO1xuXHRcdFx0b2xkVmFsdWUgPSBvbGRWYWx1ZS5yZXBsYWNlKC9zcGFuLVxcZCsvZywgJycpOyAvL3JlbW92ZSBzcGFuIGZyb20gdmFsdWVcblx0XHR9XG5cblx0XHRpZiAocGFnZVggIT09IDAgJiYgZS5wYWdlWCA+IHBhZ2VYICsgMTAwKSB7XG5cdFx0XHQvL2JpZ2dlciBzcGFuXG5cdFx0XHRpZiAoc3BhbiA8IDEyKSB7XG5cdFx0XHRcdHNwYW4rKztcblx0XHRcdH1cblx0XHRcdHBhZ2VYICs9IDEwMDtcblx0XHR9XG5cblx0XHRpZiAocGFnZVggIT09IDAgJiYgZS5wYWdlWCA8IHBhZ2VYIC0gMTAwKSB7XG5cdFx0XHQvL3NtYWxsZXIgc3BhblxuXHRcdFx0aWYgKHNwYW4gPiAxKSB7XG5cdFx0XHRcdHNwYW4tLTtcblx0XHRcdH1cblx0XHRcdHBhZ2VYIC09IDEwMDtcblx0XHR9XG5cblx0XHQvL3NldCBhY3R1YWwgdmFsdWUgYW5kIHVwZGF0ZVxuXHRcdGxldCBuZXdWYWx1ZSA9ICdzcGFuLScgKyBzcGFuICsgJyAnICsgb2xkVmFsdWU7XG5cdFx0bmV3VmFsdWUgPSBuZXdWYWx1ZS50cmltKCk7XG5cdFx0Z3JpZElucHV0LnZhbHVlID0gbmV3VmFsdWU7XG5cdFx0Y2hhbmdlSWduQ2xhc3NlcyhncmlkSW5wdXQpO1xuXHR9XG59XG4iXSwiZmlsZSI6ImFjZl9leHRyYXMvYWNmX3NjcmlwdHMuanMifQ==