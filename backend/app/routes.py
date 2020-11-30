from app import app

@app.route('/')
@app.route('/index')
def index():
    res = {'msg': "Hello, World!"}
    return res