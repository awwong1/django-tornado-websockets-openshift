import os
import mysite.settings
import mysite.wsgi
import tornado.web
import tornado.websocket
import tornado.wsgi


class Application(tornado.web.Application):
    """
    Tornado application which serves our Django application.
    Tornado handles staticfiles and web sockets, Django handles everything else.
    """

    def __init__(self):
        settings = dict()
        settings["debug"] = True if mysite.settings.DEBUG else False

        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
        wsgi_app = tornado.wsgi.WSGIContainer(mysite.wsgi.application)
        static_path = mysite.settings.STATIC_ROOT

        handlers = [
            (r"/ws", WebSocketHandler),
            (r"/static/(.*)", tornado.web.StaticFileHandler, {'path': static_path}),
            (r".*", tornado.web.FallbackHandler, dict(fallback=wsgi_app)),
        ]

        tornado.web.Application.__init__(self, handlers, **settings)


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def data_received(self, chunk):
        # Don't do anything for now
        pass

    def open(self):
        self.write_message(u"ws-echo: 418 I'm a teapot (as per RFC 2324)")

    def on_message(self, message):
        self.write_message(u"ws-echo: " + message)

    def check_origin(self, origin):
        return True

