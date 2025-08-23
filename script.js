// Quiz data
const quizQuestions = [
    {
        question: "Which of the following is a common sign of a phishing email?",
        options: [
            "Professional company logo",
            "Urgent requests for personal information",
            "Proper grammar and spelling",
            "Official company email address"
        ],
        correct: 1,
        explanation: "Phishing emails often create urgency to pressure victims into providing personal information without thinking carefully."
    },
    {
        question: "What should you do if you receive a suspicious email asking for your password?",
        options: [
            "Reply with your password immediately",
            "Click the link to verify your account",
            "Delete the email and contact the company directly",
            "Forward it to all your contacts"
        ],
        correct: 2,
        explanation: "Never provide passwords via email. Always contact the company directly through official channels to verify requests."
    },
    {
        question: "Which URL is most likely to be a phishing attempt?",
        options: [
            "https://www.amazon.com/login",
            "https://www.arnazon-security.com/verify",
            "https://signin.amazon.com",
            "https://amazon.com/account"
        ],
        correct: 1,
        explanation: "Phishing URLs often use similar-looking domains with slight misspellings or additional words to trick users."
    }
];

let currentQuestionIndex = 0;

// Smooth scrolling to detection section
function scrollToDetection() {
    document.getElementById('detection').scrollIntoView({
        behavior: 'smooth'
    });
}

// URL Analysis function
async function analyzeURL() {
    const urlInput = document.getElementById('urlInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const results = document.getElementById('results');
    
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a URL to analyze');
        return;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (e) {
        alert('Please enter a valid URL (e.g., https://example.com)');
        return;
    }
    
    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';
    loadingSpinner.style.display = 'block';
    results.style.display = 'none';
    
    try {
        // Send request to Flask backend
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });
        
        if (!response.ok) {
            throw new Error('Analysis failed');
        }
        
        const data = await response.json();
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error analyzing URL. Please try again.');
    } finally {
        // Reset button state
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze URL';
        loadingSpinner.style.display = 'none';
    }
}

// Display analysis results
function displayResults(data) {
    const results = document.getElementById('results');
    const resultTitle = document.getElementById('resultTitle');
    const resultBadge = document.getElementById('resultBadge');
    const confidenceScore = document.getElementById('confidenceScore');
    const recommendationsList = document.getElementById('recommendationsList');
    const featuresList = document.getElementById('featuresList');
    
    // Set result title and badge
    resultTitle.textContent = `Analysis Result: ${data.url}`;
    resultBadge.textContent = data.classification;
    resultBadge.className = `badge ${data.classification.toLowerCase()}`;
    
    // Set confidence score
    confidenceScore.textContent = `${Math.round(data.confidence)}%`;
    
    // Display recommendations
    recommendationsList.innerHTML = '';
    data.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
    
    // Display features analysis
    featuresList.innerHTML = '';
    data.features.forEach(feature => {
        const featureDiv = document.createElement('div');
        featureDiv.className = `feature-item ${getFeatureClass(feature.value)}`;
        
        featureDiv.innerHTML = `
            <div class="feature-name">${feature.name}</div>
            <div class="feature-description">${feature.description}</div>
        `;
        
        featuresList.appendChild(featureDiv);
    });
    
    // Show results
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth' });
}

// Get CSS class based on feature value
function getFeatureClass(value) {
    if (value === -1) return 'phishing';
    if (value === 1) return 'suspicious';
    return 'safe';
}

// Quiz functionality
function selectAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    const quizResultText = document.getElementById('quizResultText');
    const quizExplanation = document.getElementById('quizExplanation');
    
    // Disable all options
    options.forEach(option => option.disabled = true);
    
    // Show correct/incorrect answers
    options.forEach((option, index) => {
        if (index === currentQuestion.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== currentQuestion.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Show result
    setTimeout(() => {
        quizQuestion.style.display = 'none';
        quizResult.style.display = 'block';
        
        if (selectedIndex === currentQuestion.correct) {
            quizResultText.textContent = '✅ Correct!';
            quizResultText.style.color = '#28a745';
        } else {
            quizResultText.textContent = '❌ Incorrect';
            quizResultText.style.color = '#dc3545';
        }
        
        quizExplanation.textContent = currentQuestion.explanation;
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    
    // Reset states
    quizQuestion.style.display = 'block';
    quizResult.style.display = 'none';
    
    // Load question
    quizQuestion.querySelector('h3').textContent = currentQuestion.question;
    
    const options = quizQuestion.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.textContent = `${String.fromCharCode(65 + index)}) ${currentQuestion.options[index]}`;
        option.className = 'quiz-option';
        option.disabled = false;
        option.onclick = () => selectAnswer(index);
    });
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    
    // Add enter key support for URL input
    document.getElementById('urlInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeURL();
        }
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    section {
        opacity: 0;
    }
`;
document.head.appendChild(style);