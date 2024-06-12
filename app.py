from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Configuração do MySQL
db = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='',
    database='viver_bem'
)
cursor = db.cursor()

# Criação da tabela contatos (executado apenas uma vez)
# try:
#     cursor.execute('''
#         CREATE TABLE IF NOT EXISTS contatos (
#             id INT AUTO_INCREMENT PRIMARY KEY,
#             nome VARCHAR(255) NOT NULL,
#             email VARCHAR(255) NOT NULL,
#             assunto VARCHAR(255) NOT NULL,
#             mensagem TEXT NOT NULL,
#             data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         )
#     ''')
#     db.commit()
# except mysql.connector.Error as err:
#     print(f"Erro ao criar tabela: {err}")

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para o mapa da cidade
@app.route('/mapa')
def mapa():
    return render_template('mapa.html')

# Rota para os parceiros
@app.route('/parceiros')
def parceiros():
    return render_template('parceiros.html')

# Rota para sobre nós
@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

# Rota para contato e processamento do formulário
@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        assunto = request.form['assunto']
        mensagem = request.form['mensagem']

        # Inserir no banco de dados
        try:
            sql = "INSERT INTO contatos (nome, email, assunto, mensagem) VALUES (%s, %s, %s, %s)"
            val = (nome, email, assunto, mensagem)
            cursor.execute(sql, val)
            db.commit()
            return redirect(url_for('contato'))  # Redireciona para a página inicial após enviar o formulário
        except mysql.connector.Error as err:
            print(f"Erro ao inserir no banco de dados: {err}")
            db.rollback()

    return render_template('contato.html')

if __name__ == '__main__':
    app.run(debug=True)