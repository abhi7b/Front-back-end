from flask import Flask, jsonify, request
from utilities import predict_pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3001"]) 

@app.post('/predict')

def predict():
    data = request.json
    print(data)
    try:
        alcohol = data['alcohol']  
        ash = data['ash']       
        malic_acid = data['malic_acid']      
        alcalinity_of_ash = data['alcalinity_of_ash']
    except KeyError:
        return jsonify({'error': 'No text sent'})

    # sample = [sample]
    predictions = predict_pipeline(alcohol,ash,malic_acid,alcalinity_of_ash)
    print(predictions)
    try:
        result = jsonify(predictions)
    except TypeError as e:
        print(e)
        result = jsonify({'error': str(e)})
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)