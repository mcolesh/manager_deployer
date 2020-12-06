import json
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/api/deployer/product_type')
def get_product_type():
    # return request.json['key']
    return jsonify({'product_type': 'NCS',
                    'title': 'NCS Manager Deployer',
                    'description': 'Nokia Container Services Manager Deployer',
                    'version': '1.0.0.0'})


@app.route('/api/deployer/user_info')
def get_user_info():
    return jsonify({'username': 'cbis-admin'})


@app.route('/api/login')
def login():
    return jsonify({})


@app.route('/api/pages')
def pages():
    with open('managers.json', 'r') as managers:
        managers_dic = json.load(managers)
        return jsonify(managers_dic)


@app.route('/api/pages_status')
def pages_status():
    with open('managers_status.json', 'r') as managers_status:
        managers_status_dic = json.load(managers_status)
        return jsonify(managers_status_dic)


'''
@app.route('/manager_user_info', methods=['GET', 'POST'])
def api2():
    #return jsonify({"result": request.json['key']})
    return '/api/2'
'''

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
