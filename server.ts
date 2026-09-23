import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini client initialization warning:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Interview Follow-up / Response generator
app.post('/api/interview/ai-response', async (req: Request, res: Response) => {
  try {
    const {
      role,
      level,
      currentQuestion,
      userAnswer,
      nextQuestion,
      isLastQuestion,
      nlpScores,
    } = req.body;

    if (!ai || !process.env.GEMINI_API_KEY) {
      // Graceful algorithmic response if Gemini API key is not supplied
      let acknowledgment = '';
      if (nlpScores?.overallScore >= 75) {
        acknowledgment = 'Thank you. That was a clear, well-structured explanation with relevant technical depth.';
      } else if (nlpScores?.overallScore >= 50) {
        acknowledgment = 'Thank you for your answer. You covered some fundamental points well.';
      } else {
        acknowledgment = 'Thank you for sharing your thoughts. Let us proceed forward.';
      }

      if (isLastQuestion) {
        return res.json({
          reply: `${acknowledgment} That concludes all our interview questions for today! I am compiling your comprehensive performance report and NLP analysis now.`,
          usedGemini: false,
        });
      }

      return res.json({
        reply: `${acknowledgment}\n\nLet's move to the next question:\n\n${nextQuestion}`,
        usedGemini: false,
      });
    }

    const systemPrompt = `You are a professional, encouraging, yet rigorous technical AI interviewer conducting a mock interview for a ${level} ${role}.
The candidate just answered this question:
Question: "${currentQuestion}"
Candidate's Answer: "${userAnswer}"
Candidate's automated NLP score for this answer: ${nlpScores?.overallScore || 70}/100.

Your job:
1. Provide a brief 1-2 sentence professional interviewer reaction acknowledging their answer (do NOT reveal numbers or scores!).
2. ${isLastQuestion ? 'Politely announce that this concludes the interview and that their comprehensive NLP report is ready.' : `Transition smoothly into the next question:\n"${nextQuestion}"`}
Keep your tone conversational, natural, and realistic, exactly like an experienced human interviewer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Generate the next interviewer response.',
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || (isLastQuestion ? 'Thank you. That completes our interview!' : `Thank you. Next question: ${nextQuestion}`);

    res.json({
      reply,
      usedGemini: true,
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/interview/ai-response:', error?.message);
    const { nextQuestion, isLastQuestion } = req.body;
    const fallbackReply = isLastQuestion
      ? 'Thank you! That completes all questions for this session. Generating your final report now.'
      : `Thank you for your answer. Let's move to the next question:\n\n${nextQuestion}`;
    res.json({
      reply: fallbackReply,
      usedGemini: false,
      fallbackNotice: 'Used fallback response pipeline.',
    });
  }
});

// AI Final Report Synthesizer
app.post('/api/interview/ai-summary', async (req: Request, res: Response) => {
  try {
    const { role, level, finalScore, evaluations, strengths, weaknesses } = req.body;

    if (!ai || !process.env.GEMINI_API_KEY) {
      return res.json({
        personalizedFeedback: `Overall score: ${finalScore}/100. You demonstrated commendable familiarity with ${role} concepts. To advance to the next level, continue deepening your grasp of architectural edge cases and practical implementations.`,
        usedGemini: false,
      });
    }

    const prompt = `Synthesize concise final executive feedback for a candidate who just completed a ${level} ${role} mock interview.
Overall Score: ${finalScore}/100.
Observed strengths: ${strengths?.join(', ')}.
Observed areas to improve: ${weaknesses?.join(', ')}.

Provide 3 paragraphs:
1. An objective evaluation of their technical depth and clarity.
2. Concrete topics and concepts to master next.
3. Encouragement and interview readiness verdict.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a veteran engineering hiring director delivering mock interview performance feedback.',
        temperature: 0.6,
      },
    });

    res.json({
      personalizedFeedback: response.text || 'Performance evaluated successfully.',
      usedGemini: true,
    });
  } catch (err: any) {
    console.error('Error generating AI summary:', err);
    res.json({
      personalizedFeedback: `Overall score: ${req.body.finalScore}/100. Solid effort demonstrating good foundational understanding for ${req.body.role}. Focus on structuring complex technical trade-offs for upcoming interviews.`,
      usedGemini: false,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`InterviewBot Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
