from app import app

@app.route('/')
@app.route('/index')
def index():
    res = {'msg': "Hello, World!"}
    return res

@app.route('/sessionLogin', methods=['POST'])
def session_login():
    # Get the ID token sent by the client
    id_token = flask.request.json['idToken']
    # Set session expiration to 5 days.
    expires_in = datetime.timedelta(days=5)
    try:
        # Create the session cookie. This will also verify the ID token in the process.
        # The session cookie will have the same claims as the ID token.
        session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
        response = flask.jsonify({'status': 'success'})
        # Set cookie policy for session cookie.
        expires = datetime.datetime.now() + expires_in
        response.set_cookie(
            'session', session_cookie, expires=expires, httponly=True, secure=True)
        return response
    except exceptions.FirebaseError:
        return flask.abort(401, 'Failed to create a session cookie')

@app.route('/trackProduct', methods=['POST'])
def session_login():
    # Get json of product information
    id_token = flask.request.json['product']
    # mock the data stored
    doc_ref = db.collection(u'users').document(u'alovelace')
    doc_ref.set({
        u'first': u'Ada',
        u'last': u'Lovelace',
        u'born': 1815
    })
    except exceptions.FirebaseError:
        return flask.abort(401, 'Failed')
