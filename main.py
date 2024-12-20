from flask import Flask
from routers.routers import Router

class App:
    def __init__(self):
        self.server = Flask(__name__)
        self.router = [Router(self.server)]

if __name__ == '__main__':
    app = App()
    app.server.run(debug=True)