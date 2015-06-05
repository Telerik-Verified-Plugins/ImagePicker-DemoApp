(function (global) {
  var DemoViewModel,
      app = global.app = global.app || {};

  DemoViewModel = kendo.data.ObservableObject.extend({
    
    defaultSettings: function () {
      if (!this.checkSimulator()) {
        imagePicker.getPictures(
          this.onSuccess,
          this.onError,
          {
            // looks default to me :)
          }
        );
      }
    },

    maxTwoHighQuality: function () {
      if (!this.checkSimulator()) {
        imagePicker.getPictures(
          this.onSuccess,
          this.onError,
          {
            maximumImagesCount: 2,
            quality: 90,
            outputType: imagePicker.OutputType.FILE_URI // which is the default btw
          }
        );
      }
    },

    maxThreeLowQualityRescale: function () {
      if (!this.checkSimulator()) {
        imagePicker.getPictures(
          this.onSuccess,
          this.onError,
          {
            maximumImagesCount: 3,
            quality: 20,
            width: 400
            // this works, it's just not used in this demo:
            // outputType: imagePicker.OutputType.BASE64_STRING
          }
        );
      }
    },

    onSuccess: function (result) {
      if (result.length > 0) {
        var content = '';
        for (var i = 0; i < result.length; i++) {
          content += '<img src="'+result[i]+'" style="max-width:200px"/>';
        }
        document.getElementById("imageOutput").innerHTML = content;
      } else {
        // picker was cancelled
        console.log("no images were selected");
      }
    },

    onError: function (message) {
      alert("Error from ImagePicker plugin: " + JSON.stringify(message));
    },

    checkSimulator: function() {
      if (window.navigator.simulator === true) {
        alert('This plugin is not available in the simulator.');
        return true;
      } else if (window.imagePicker === undefined) {
        alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
        return true;
      } else {
        return false;
      }
    }
  });

  app.demoService = {
    viewModel: new DemoViewModel()
  };
})(window);