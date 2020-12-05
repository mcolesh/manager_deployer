from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/manager/product_type')
def get_product_type():
    #return request.json['key']
    return jsonify({'product_type': 'NCS',
                'title': 'NCS Manager Deployer',
                'description': 'CloudBand Infrastructure Software Manager Deployer',
                'version': '1.0.0.0'}), 200

@app.route('/manager_user_info', methods=['GET', 'POST'])
def get_user_info():
    return jsonify({'username': 'cbis-admin'})

'''
@app.route('/manager_user_info', methods=['GET', 'POST'])
def api2():
    #return jsonify({"result": request.json['key']})
    return '/api/2'
'''

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080, debug=True)
