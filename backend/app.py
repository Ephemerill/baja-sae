from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all domains on all routes for simplicity in development
CORS(app)

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Biola Racing'})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
