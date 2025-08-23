from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import os
from feature import PhishingDetector

app = Flask(__name__)
CORS(app)

# Read HTML file content
def read_html():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "<h1>Error: index.html not found</h1>"

@app.route('/')
def home():
    """Serve the main HTML page"""
    html_content = read_html()
    return render_template_string(html_content)

@app.route('/style.css')
def css():
    """Serve CSS file"""
    try:
        with open('style.css', 'r', encoding='utf-8') as f:
            css_content = f.read()
        response = app.response_class(
            css_content,
            mimetype='text/css'
        )
        return response
    except FileNotFoundError:
        return "/* CSS file not found */", 404

@app.route('/script.js')
def js():
    """Serve JavaScript file"""
    try:
        with open('script.js', 'r', encoding='utf-8') as f:
            js_content = f.read()
        response = app.response_class(
            js_content,
            mimetype='application/javascript'
        )
        return response
    except FileNotFoundError:
        return "// JavaScript file not found", 404

@app.route('/src/assets/hero-cybersecurity.jpg')
def hero_image():
    """Serve hero image"""
    try:
        from flask import send_file
        return send_file('hero-cybersecurity.jpg', mimetype='image/jpeg')
    except FileNotFoundError:
        return "", 404

@app.route('/analyze', methods=['POST'])
def analyze_url():
    """Analyze URL for phishing detection"""
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({'error': 'URL is required'}), 400
        
        url = data['url']
        
        # Validate URL
        if not url.startswith(('http://', 'https://')):
            return jsonify({'error': 'Invalid URL format. URL must start with http:// or https://'}), 400
        
        # Analyze URL using PhishingDetector
        detector = PhishingDetector()
        result = detector.analyze_url(url)
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error analyzing URL: {str(e)}")
        return jsonify({'error': 'Analysis failed. Please try again.'}), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'PhishGuard API is running'})

if __name__ == '__main__':
    print("🛡️ Starting PhishGuard Server...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🔍 API Endpoint: http://localhost:5000/analyze")
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)