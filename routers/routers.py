from flask import Blueprint, render_template, request, redirect
from models.empresa import Empresa
from models.produto import Produto
from models.client import Client

class Router:
    def __init__(self, app):
        self.app = app
        self.blueprint = Blueprint('main', __name__)
        self.register_routers()


    def register_routers(self):
        @self.blueprint.route('/', methods=['GET'])
        def index():
            empresa = Empresa(nome='Sua Lanchonete Aqui',
                              endereco='Endereço Lanchonete aqui')

            produto = Produto(nome='Hamburguer Artesanal',
                              descricao='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis asperiores blanditiis',
                              preco='10,90')

            return render_template('index.html',
                                   empresa=empresa,
                                   produto=produto)


        @self.blueprint.route('/cadastrarpedido', methods=['POST'])
        def insert_order():
            if request.method == 'POST':
                nome_cliente = request.form['client']
                endereco_cliente = request.form['address']
                valor = request.form['total-value']

                cliente = Client(nome=nome_cliente, endereco=endereco_cliente, valor_pedido=valor)

                return redirect('/')

        self.app.register_blueprint(self.blueprint)
