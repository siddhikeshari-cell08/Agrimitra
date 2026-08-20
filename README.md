# 🌱 Agrimitra

## AI-Powered Smart Soil Monitoring for Small Farmers

**Know Your Soil. Grow Smarter. Earn More.**

Agrimitra is an AI-powered smart farming prototype that monitors important soil and environmental conditions and converts sensor readings into a simple Soil Health Score.

## 🚜 Problem Statement

Small and marginal farmers often lack access to affordable and timely soil information. Traditional soil testing can be expensive, slow, and difficult to access.

This can lead to:

- Poor irrigation decisions
- Unnecessary fertilizer usage
- Higher farming costs
- Soil degradation
- Crop losses

## 💡 Our Solution

Agrimitra continuously monitors key soil conditions and uses an AI-based scoring engine to generate a Soil Health Score from 0–100.

The platform provides:

- Real-time soil monitoring
- Soil Health Score
- AI-based recommendations
- Farmer Soil Report
- Soil Credit Points
- Early warning for abnormal conditions

## 📊 Soil Parameters

Agrimitra currently monitors four key parameters:

- Soil Moisture
- Temperature
- Humidity
- Gas Stress

## ⚙️ How It Works

Sensor / Simulated IoT Data
        ↓
Frontend Dashboard
        ↓
Flask Backend API
        ↓
AI Soil Health Engine
        ↓
Soil Health Score
        ↓
AI Recommendation
        ↓
Dashboard + Farmer Soil Report

## 🧠 AI Soil Health Engine

The prototype AI engine processes:

- Moisture
- Temperature
- Humidity
- Gas Stress

and generates:

- Soil Health Score
- Soil Status
- Recommendation

## ✨ Key Features

### 1. Soil Health Score
Converts sensor readings into an easy-to-understand 0–100 score.

### 2. Live Dashboard
Displays current soil readings and soil health status.

### 3. AI Insights
Provides recommendations based on current soil conditions.

### 4. Farmer Soil Report
Generates a report containing sensor readings, score and recommendation.

### 5. Soil Credit Points
Creates a prototype soil performance/credit system for farmers.

### 6. Refreshable Sensor Readings
The prototype can generate new simulated IoT readings for demonstration.

## 🛠️ Technology Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### AI
- Python
- Rule-based prototype Soil Health Engine

### Development
- VS Code
- Git
- GitHub

## 📁 Project Structure

```text
Agrimitra/
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── reports.html
│   ├── style.css
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── data.js
│   ├── reports.js
│   └── script.js
│
├── backend/
│   └── app.py
│
├── ai/
│   ├── __init__.py
│   └── soil_health_score.py
│
├── presentation/
│   └── Agrimitra-Presentation.pdf
│
├── README.md
├── requirements.txt
└── .gitignore