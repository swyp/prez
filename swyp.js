// Generated by CoffeeScript 1.3.3
(function() {
  var eventsForDevice, isTouchDevice, mouseEvents, receiveMessage, testing, touchEvents;

  testing = false;

  isTouchDevice = "ontouchstart" in document.documentElement;

  touchEvents = ["touchstart", "touchmove", "touchend"];

  mouseEvents = ["mousedown", "mousemove", "mouseup"];

  eventsForDevice = (isTouchDevice ? touchEvents : mouseEvents);

  receiveMessage = function(e) {
    var message;
    message = e.data;
    if (message === "HIDE_SWYP") {
      return $('#swypframe').hide();
    }
  };

  $(function() {
    var $stylesheet, $swypWindow, $swypframe;
    window.addEventListener("message", receiveMessage, false);
    $stylesheet = $('<link/>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', 'swyp.css');
    $('head').append($stylesheet);
    $swypframe = $('<iframe/>').attr('id', 'swypframe').attr('scrolling', 'no').attr('src', testing ? 'http://127.0.0.1:3000' : 'https://swypserver.herokuapp.com');
    $('body').append($swypframe);
    $swypWindow = $('#swypframe')[0].contentWindow;
    /*your specific implementation!
    */

    window.fileURL = "http://swyp.us/out/filePrompt.jpg";
    window.pickFileButtonPressed = function() {
      return filepicker.getFile(null, {
        'modal': true,
        services: [filepicker.SERVICES.IMAGE_SEARCH, filepicker.SERVICES.COMPUTER, filepicker.SERVICES.URL, filepicker.SERVICES.WEBCAM, filepicker.SERVICES.FACEBOOK, filepicker.SERVICES.DROPBOX]
      }, function(url, metadata) {
        return window.updatePromptWithNewFileURL(url, metadata.type);
      });
    };
    $('#filePreview').live(eventsForDevice[0], function(e) {
      var imgSrc;
      imgSrc = $(this).attr('src');
      $('#swypframe').show();
      return $swypWindow.postMessage({
        e: 'dragstart',
        typeGroups: window.typeGroups,
        img: imgSrc,
        touches: [e.screenX, e.screenY]
      }, "*");
    });
    return window.updatePromptWithNewFileURL = function(fileURL, fileType) {
      var previewImageURL, typeGroup;
      window.fileURL = fileURL;
      typeGroup = {
        contentURL: fileURL,
        contentMIME: fileType
      };
      window.typeGroups = [typeGroup];
      previewImageURL = fileURL;
      if (fileType.substring(0, "image".length) !== "image") {
        previewImageURL = "http://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Text_document_with_page_number_icon.svg/500px-Text_document_with_page_number_icon.svg.png";
      }
      return $('#filePreview').attr('src', previewImageURL);
    };
  });

}).call(this);
