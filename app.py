from flask import Flask
from flask import jsonify
from flask_cors import CORS
import random
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    nums={}
    for x in range(12):
        nums[x]=random.randint(1,101)   
    return jsonify(nums)

if __name__ == '__main__':
    app.run()