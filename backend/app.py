from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

# Point to the frontend dist folder
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')

CORS(app)

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Biola Racing'})

# Catch-all route to serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)