# Vietnam Housing Price Predictor 🏠

This project is an intelligent system designed to predict the price of houses in Vietnam based on various features such as area, number of bedrooms, location, and legal status. The core machine learning model (XGBoost) is trained in a Jupyter Notebook and deployed via a REST API. A modern mobile-friendly web interface is provided to interact with the predictions.

## 📂 Project Structure

- HousePrice.ipynb: The Jupyter Notebook containing data exploration, preprocessing, model training (Linear Regression, Decision Tree, Random Forest, XGBoost), and evaluation.
- house_price_model.sav: The finalized, serialized XGBoost model ready for deployment.
- HousePrice_API.py: The backend Flask API that serves the model to the frontend.
- mobile-app/: A Vite-based frontend web application acting as the user interface.

## 🛠️ Prerequisites

Before running the application, ensure you have the following installed on your system:
- **Python 3.8+** (for the backend API and Notebook)
- **Node.js & npm** (for the frontend UI)

## 🚀 How to Run the Application

The application consists of two parts that must be run simultaneously in two separate terminal windows.

### Step 1: Start the Backend API (Terminal 1)

1. Open a terminal and navigate to this directory:
   `
   cd path/to/HousePrice
   `
2. Run the Flask API script:
   `
   python HousePrice_API.py
   `
   *Note: If that fails, try Flask --app HousePrice_API run.*
3. Leave this terminal running in the background. It serves as the "brain" of the application.

### Step 2: Start the Frontend UI (Terminal 2)

1. Open a **new** terminal window and navigate into the mobile-app directory:
   `
   cd path/to/HousePrice/mobile-app
   `
2. Install the necessary Node dependencies (only required the first time):
   `
   npm install
   `
3. Start the development server:
   `
   npm run dev
   `
4. The terminal will output a local URL (e.g., http://localhost:5173). Click the link or paste it into your browser to view and interact with the application!

## 🧪 Model Training

If you wish to retrain the model or view the data analysis:
1. Open Jupyter Notebook or VS Code.
2. Run all cells in HousePrice.ipynb.
3. The new model will be saved automatically as house_price_model.sav.
