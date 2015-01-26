/*  Websocket.  */
var ws = undefined;


/*!  {{{  section: 'WS-Functions'                                        */

/**
 *  Send a message on the websocket to the echo server.
 *
 *  Examples:
 *    ws_send('Look ma, websockets!');
 *
 *  @param  {String}  message to send.
 *  @api    public
 */
function ws_send(msg) {
    (typeof ws !== 'undefined') && ws.send(msg);

}
/*  End of function  ws_send.  */


/**
 *  Initialize websockets.
 *
 *  Examples:
 *    ws_initialize(document.getElementById('zelement') );
 *
 *  @param  {Node}  DOM node for the textarea element we log to. Messages are
 *                  logged with the latest message at the top.
 *  @api    public
 */
function ws_initialize(ztextarea) {
    var hostname = window.document.location.hostname;
    var port = window.document.location.port;

    if ("WebSocket" in window) {
        /*  Open a websocket to the host.  */
        var wsproto = "ws";

        if (hostname == "localhost" || hostname == "127.0.0.1") {
            ws = new WebSocket(wsproto + "://" + hostname + ":8080/ws");
        }
        else {
            ws = new WebSocket(wsproto + "://" + hostname + ":8000/ws");
        }
        /*  Handle open, message and close events.  */
        ws.onopen = function () {
            var at = Date(Date.now());
            ztextarea.value = at + ": WebSocket opened - \n";
        };
        ws.onmessage = function (msg) {
            ztextarea.value = msg.data + "\n" + ztextarea.value;
        };
        ws.onclose = function () {
            var at = Date(Date.now());
            ztextarea.value = at + ": WebSocket closed!\n" + ztextarea.value;
        };

    }
    else {
        alert("No WebSocket support in your browser.");
    }

}
/*  End of function  ws_initialize.  */


/*!
 *  }}}  //  End of section  WS-Functions.
 *  ---------------------------------------------------------------------
 */



/*!
 *  EOF
 */
