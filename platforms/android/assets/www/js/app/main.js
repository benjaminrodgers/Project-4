/**
 *
 * main
 *
 * main.js
 * @author Kerri Shotts
 * @version 1.0.0
 *
 * Copyright (c) 2013 Packt Publishing
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*jshint
         asi:true,
         bitwise:true,
         browser:true,
         curly:true,
         eqeqeq:false,
         forin:true,
         noarg:true,
         noempty:true,
         plusplus:false,
         smarttabs:true,
         sub:true,
         trailing:false,
         undef:true,
         white:false,
         onevar:false 
 */
/*global define*/
define( [ "yasmf", "app/views/noteListView" ], function( _y, NoteListView ) {
  // define our app object
  var APP = {};
  // APP.start will load the first view and kick us off
  APP.start = function() {
  var gN = _y.UI.globalNotifications;
var notifications = {
	"pause":
{ notification: "applicationPause", handler: APP.onPause },
"resume":
{ notification: "applicationResume", handler: APP.onResume },
"online":
{ notification: "applicationOnline", handler:
APP.onConnectionStatusChanged },
"offline":
{ notification: "applicationOffline", handler:
APP.onConnectionStatusChanged },
"batterycritical":
{ notification: "batteryCritical", handler:
APP.onBatteryStatusChanged },
"batterylow":
{ notification: "batteryLow", handler:
APP.onBatteryStatusChanged },
"batterystatus":
{ notification: "batteryStatus", handler:
APP.onBatteryStatusChanged },
"menubutton":
{ notification: "menuButtonPressed", handler:
APP.onMenuButtonPressed },
"searchbutton":
{ notification: "searchButtonPressed",handler:
APP.onSearchButtonPressed }
};
for ( var DOMEvent in notifications ) {
if ( notifications.hasOwnProperty ( DOMEvent ) ) {
var notification = notifications[DOMEvent];
gN.registerNotification( notification.notification );
gN.addListenerForNotification( notification.notification,
notification.handler );
(function (notification) {
window.addEventListener( DOMEvent, function () {
var args = Array.prototype.slice.call(arguments);
gN.notify(notification, args);
}, false);
})(notification.notification);
}
}
    // find the rootContainer DOM element
    var rootContainer = _y.ge( "rootContainer" );
    // create a new note list
    var noteListView = new NoteListView();
    // store this for future reference
    APP.noteListView = noteListView;
    // initialize it
    noteListView.init();
    // create a new navigation controller
    var navigationController = new _y.UI.NavigationController();
    navigationController.initWithOptions( {
      rootView: noteListView,
      parent: rootContainer
    } );
    APP.navigationController = navigationController;
  };
  return APP;
} );
