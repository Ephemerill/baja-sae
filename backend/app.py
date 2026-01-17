from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

# Initialize Flask app with the correct folder for static React files
# 'dist' is the default build folder for Vite. If you use Create React App, use 'build'.
app = Flask(__name__, static_folder='dist', static_url_path='')

# Enable CORS to allow requests from your frontend domains if they are hosted separately,
# though serving from the same origin (below) makes this less critical for production.
CORS(app)

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Biola Racing'})

# Catch-all route to serve the React app
# This ensures that routing is handled by React Router on the client side
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # If the requested path exists in the static folder, serve it (e.g., images, css)
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    # Otherwise, return index.html so React Router can handle the route
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)