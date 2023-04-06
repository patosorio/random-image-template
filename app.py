from flask import Flask, render_template
import os, random, json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-images')
def get_images():
    image_folder = 'static/images'
    images = os.listdir(image_folder)
    random.shuffle(images)
    return json.dumps(images)

if __name__ == '__main__':
    app.run(debug=True)