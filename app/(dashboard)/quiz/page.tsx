'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard_layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, CheckCircle, XCircle, Target, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const quizData = {
  title: 'Calculus Practice Quiz',
  subject: 'Mathematics',
  totalQuestions: 10,
  timeLimit: 30, // minutes
  questions: [
    {
      id: 1,
      question: 'What is the derivative of f(x) = x³ + 2x² - 5x + 3?',
      options: ['3x² + 4x - 5', '3x² + 4x + 5', 'x⁴ + 2x³ - 5x² + 3x', '3x² - 4x - 5'],
      correct: 0,
      explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, we get 3x² + 4x - 5.',
    },
    {
      id: 2,
      question: 'What is ∫(2x + 3)dx?',
      options: ['x² + 3x + C', '2x² + 3x + C', 'x² + 3x', '2x + 3x + C'],
      correct: 0,
      explanation: 'Using the power rule for integration: ∫xⁿdx = xⁿ⁺¹/(n+1) + C',
    },
    {
      id: 3,
      question: 'What is the limit of (x² - 4)/(x - 2) as x approaches 2?',
      options: ['0', '4', '2', 'undefined'],
      correct: 1,
      explanation: 'Factor the numerator: (x-2)(x+2)/(x-2) = x+2. As x→2, the limit is 4.',
    },
  ],
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6 p-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {quizData.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Test your knowledge in {quizData.subject}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div className="p-6 bg-secondary/30 rounded-lg border border-border/30">
                  <div className="text-3xl font-bold text-foreground">{quizData.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground mt-1">Questions</div>
                </div>
                <div className="p-6 bg-secondary/30 rounded-lg border border-border/30">
                  <div className="text-3xl font-bold text-foreground">{quizData.timeLimit}</div>
                  <div className="text-sm text-muted-foreground mt-1">Minutes</div>
                </div>
                <div className="p-6 bg-secondary/30 rounded-lg border border-border/30">
                  <div className="text-3xl font-bold text-foreground">All</div>
                  <div className="text-sm text-muted-foreground mt-1">Topics Covered</div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500  bg-teal-500 hover:bg-teal-600 transition-colors text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-teal-500/30 flex items-center gap-2"
                  onClick={() => setQuizStarted(true)}
                >
                  Start Quiz Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === quizData.questions[index].correct
    ).length;
    const isPassed = score >= 70;

    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6 p-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`p-4 rounded-full ${isPassed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {isPassed ? (
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  ) : (
                    <XCircle className="h-12 w-12 text-red-500" />
                  )}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {isPassed ? 'Quiz Passed!' : 'Quiz Complete!'}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Here are your results for {quizData.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6 sm:p-8 pt-0">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{score}%</div>
                <div className="text-muted-foreground">
                  {correctAnswers} out of {quizData.questions.length} questions correct
                </div>
                <Badge
                  className={`mt-3 text-sm font-medium px-3 py-1 ${isPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {isPassed ? 'Well done!' : 'Keep practicing!'}
                </Badge>
              </div>

              <div className="space-y-6 pt-2">
                <h3 className="text-xl font-semibold text-foreground pb-2 border-b border-border/30">
                  Question Review
                </h3>
                <div className="space-y-4">
                  {quizData.questions.map((question, index) => {
                    const userAnswer = selectedAnswers[index];
                    const isCorrect = userAnswer === question.correct;

                    return (
                      <Card
                        key={index}
                        className={`border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'} bg-card/50 overflow-hidden`}
                      >
                        <CardContent className="p-4 sm:p-5 space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-foreground">Question {index + 1}</h4>
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-foreground/90">{question.question}</p>

                          <div className="space-y-3 pt-2">
                            <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                              <p className="text-sm font-medium text-foreground/80">Your answer</p>
                              <p className="text-foreground">{question.options[userAnswer] || 'Not answered'}</p>
                            </div>

                            {!isCorrect && (
                              <div className="p-3 rounded-lg bg-green-500/10">
                                <p className="text-sm font-medium text-foreground/80">Correct answer</p>
                                <p className="text-foreground">{question.options[question.correct]}</p>
                              </div>
                            )}

                            <div className="p-3 rounded-lg bg-blue-500/10">
                              <p className="text-sm font-medium text-foreground/80">Explanation</p>
                              <p className="text-foreground">{question.explanation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                >
                  Retake Quiz
                </Button>
                <Button variant="outline" className="flex-1 h-12 border-green-500/50 hover:bg-green-500/10">
                  View More Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 p-6">
        {/* Quiz Header */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  {quizData.title}
                </h1>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="font-medium">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-foreground">Question {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-lg text-foreground/90 leading-relaxed">{currentQ.question}</p>

            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={value => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-xl border transition-all cursor-pointer hover:bg-green-500/5 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-border/50 hover:border-green-500/30'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div
                    className={`flex items-center justify-center h-5 w-5 rounded-full border mt-0.5 flex-shrink-0 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-border'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <Label
                    htmlFor={`q${currentQuestion}-${index}`}
                    className="flex-1 text-base font-normal leading-snug cursor-pointer"
                  >
                    {option}
                  </Label>
                  <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-${index}`} className="sr-only" />
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Question Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {quizData.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? 'default' : 'outline'}
                  size="sm"
                  className={`h-10 w-10 p-0 rounded-lg transition-all ${
                    selectedAnswers[index] !== undefined
                      ? currentQuestion === index
                        ? 'bg-primary/90'
                        : 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20'
                      : ''
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
