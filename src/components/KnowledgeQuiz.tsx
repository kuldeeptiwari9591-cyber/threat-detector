import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Trophy, 
  RefreshCw,
  Target,
  Award
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const KnowledgeQuiz = () => {
  const { toast } = useToast();
  
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which of the following is a clear sign of a phishing email?",
      options: [
        "Professional formatting and grammar",
        "Urgent language demanding immediate action",
        "Email from your company's IT department",
        "Attachment with .pdf extension"
      ],
      correctAnswer: 1,
      explanation: "Phishing emails often use urgent, threatening language to pressure victims into acting quickly without thinking.",
      difficulty: 'Easy'
    },
    {
      id: 2,
      question: "What should you do if you hover over a link and the URL doesn't match the sender?",
      options: [
        "Click it anyway if the email looks legitimate",
        "Forward the email to colleagues for verification",
        "Do not click the link and report it as suspicious",
        "Copy and paste the URL into your browser"
      ],
      correctAnswer: 2,
      explanation: "Mismatched URLs are a major red flag. Never click suspicious links and always report them to your IT security team.",
      difficulty: 'Medium'
    },
    {
      id: 3,
      question: "Which domain is most likely to be a phishing attempt targeting PayPal users?",
      options: [
        "paypal.com",
        "support.paypal.com",
        "paypaI-security.com",
        "paypal.co.uk"
      ],
      correctAnswer: 2,
      explanation: "This uses a capital 'I' instead of lowercase 'l' in PayPal, which is a common typosquatting technique used by attackers.",
      difficulty: 'Hard'
    },
    {
      id: 4,
      question: "What is the safest way to verify a suspicious security alert from your bank?",
      options: [
        "Click the link in the email to check your account",
        "Call the phone number provided in the email",
        "Log into your account through the bank's official website",
        "Reply to the email asking for verification"
      ],
      correctAnswer: 2,
      explanation: "Always use official channels. Go directly to your bank's website or call their official number to verify any security concerns.",
      difficulty: 'Medium'
    },
    {
      id: 5,
      question: "Which of these password practices is most secure?",
      options: [
        "Using the same strong password for all accounts",
        "Using different passwords with a password manager",
        "Writing passwords down in a notebook",
        "Using memorable dates and names"
      ],
      correctAnswer: 1,
      explanation: "Using unique passwords for each account with a reputable password manager is the gold standard for password security.",
      difficulty: 'Easy'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "Choose one of the options before proceeding",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        toast({
          title: "Quiz Completed!",
          description: `You scored ${score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)} out of ${questions.length}`,
        });
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "Excellent! You're well-prepared against phishing attacks.";
    if (percentage >= 60) return "Good job! Consider reviewing some security best practices.";
    return "Keep learning! Review our educational content to improve your security awareness.";
  };

  if (quizCompleted) {
    const finalScore = score + (userAnswers[userAnswers.length - 1] === questions[questions.length - 1].correctAnswer ? 1 : 0);
    
    return (
      <section id="quiz" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center shadow-elevated">
              <Trophy className={`h-16 w-16 mx-auto mb-6 ${getScoreColor(finalScore, questions.length)}`} />
              <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
              <div className="mb-6">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(finalScore, questions.length)}`}>
                  {finalScore}/{questions.length}
                </div>
                <p className="text-muted-foreground">{getScoreMessage(finalScore, questions.length)}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm">Question {index + 1}</span>
                    {userAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={resetQuiz} variant="hero" size="lg">
                <RefreshCw className="h-5 w-5 mr-2" />
                Take Quiz Again
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Challenge yourself with our cybersecurity quiz and see how well you can identify threats
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm">Score: {score}/{currentQuestion}</span>
              </div>
            </div>
            <Progress value={((currentQuestion) / questions.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="p-8 shadow-card">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  className={`
                    ${questions[currentQuestion].difficulty === 'Easy' ? 'bg-success text-success-foreground' : ''}
                    ${questions[currentQuestion].difficulty === 'Medium' ? 'bg-warning text-warning-foreground' : ''}
                    ${questions[currentQuestion].difficulty === 'Hard' ? 'bg-destructive text-destructive-foreground' : ''}
                  `}
                >
                  {questions[currentQuestion].difficulty}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'border-success bg-success/10 text-success'
                          : 'border-destructive bg-destructive/10 text-destructive'
                        : 'border-primary bg-primary/10'
                      : showResult && index === questions[currentQuestion].correctAnswer
                      ? 'border-success bg-success/10 text-success'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'border-success bg-success text-success-foreground'
                            : 'border-destructive bg-destructive text-destructive-foreground'
                          : 'border-primary bg-primary text-primary-foreground'
                        : showResult && index === questions[currentQuestion].correctAnswer
                        ? 'border-success bg-success text-success-foreground'
                        : 'border-muted-foreground'
                    }`}>
                      {showResult && (
                        selectedAnswer === index || index === questions[currentQuestion].correctAnswer
                      ) && (
                        index === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-4 w-4" />
                        ) : null
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Explanation:
                </h4>
                <p className="text-muted-foreground">{questions[currentQuestion].explanation}</p>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              <Button 
                onClick={handleNextQuestion}
                variant="hero"
                size="lg"
                disabled={selectedAnswer === null}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Badge component for difficulty levels
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};