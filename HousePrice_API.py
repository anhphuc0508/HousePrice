import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

filename = 'house_price_model.sav'

try:
    loaded_model = pickle.load(open(filename, 'rb'))
except Exception as e:
    print(f"Warning: Model file not found. Vui lòng chạy HousePrice.ipynb để tạo file mô hình trước! Lỗi: {e}")
    loaded_model = None

@app.route('/', methods=['GET'])
def home():
    return "<h1>House Price REST API is running!</h1><p>Gửi POST request tới <b>/houseprice/v1/predict</b> với các features để dự đoán giá nhà.</p>"

@app.route('/houseprice/v1/predict', methods=['POST'])
def predict():
    if not loaded_model:
        return jsonify({"error": "Mô hình chưa được huấn luyện. Vui lòng chạy HousePrice.ipynb trước!"}), 500
        
    try:
        features = request.json
        
     
        features_list = [
            float(features.get("Area", 0)),
            float(features.get("Frontage", 0)),
            float(features.get("Access Road", 0)),
            float(features.get("House direction", 0)),
            float(features.get("Balcony direction", 0)),
            float(features.get("Floors", 0)),
            float(features.get("Bedrooms", 0)),
            float(features.get("Bathrooms", 0)),
            float(features.get("Legal status", 0)),
            float(features.get("Furniture state", 0))
        ]
        
        prediction = loaded_model.predict([features_list])
        
        response = {
            "prediction_price_billion_vnd": round(float(prediction[0]), 2),
            "status": "success"
        }
        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)  # Chạy port 5001 để tránh trùng với API tiểu đường
