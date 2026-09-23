# InterviewBot – AI Mock Interviewer (NLP Mini Project)

An AI-powered mock interview web application designed as a Natural Language Processing (NLP) academic mini-project for college-level demonstration.

---

## 1. Project Objective

The objective of **InterviewBot** is to provide an interactive, realistic technical and HR interview simulation environment where candidate responses are systematically analyzed using real Natural Language Processing techniques. 

Instead of functioning as an opaque black box, InterviewBot transparently exposes every stage of its linguistic evaluation pipeline—from tokenization and stopword removal to TF-IDF vector cosine similarity and keyword extraction—culminating in an objective, mathematically defensible scoring report.

---

## 2. Main Features

- **Multi-Role & Multi-Level Configuration**:
  - Roles: Python Developer, Java Developer, Web Developer, Data Analyst, Machine Learning Engineer, Software Engineer, and General Interview.
  - Experience Levels: Beginner, Intermediate, and Advanced.
  - Interview Types: Technical, HR, and Mixed.
  - Question Counts: 5, 10, or 15 questions.
- **Realistic Chatbot Interview Flow**:
  - Conducts conversational interviews one question at a time.
  - Evaluates each answer in real time using local NLP pipelines and server-side LLM conversational transitions.
  - Seamless fallback mode for 100% offline functionality.
- **Voice Dictation (Speech-to-Text)**:
  - Real-time voice answer dictation using the Web Speech API (`webkitSpeechRecognition`).
  - Active audio waveform pulse with inline candidate text editing before submission.
- **Live NLP Diagnostic Inspector**:
  - Direct examination modal revealing the exact tokenization, stopwords filtered, extracted technical entities, TF-IDF cosine similarity score, and sentiment metrics for any answer.
- **Comprehensive Performance Report**:
  - Transparent scores across 4 key dimensions: Technical Knowledge (30%), Answer Relevance (35%), Completeness (20%), and Communication/Clarity (15%).
  - Visual competency analytics powered by Recharts (5-dimension Radar Chart & Question-by-Question progression Bar Chart).
  - Dynamic Strengths and Areas to Improve computed from actual user responses.
  - Recommended study topics and actionable advice.
  - Print/Export ready format with celebratory confetti completion.
- **Candidate Progress & History Dashboard**:
  - Persistent localStorage history tracking longitudinal score improvements with interactive line charts.
- **Interactive NLP Sandbox**:
  - Live experimental tool where professors and evaluators can input arbitrary sentences to observe immediate tokenization, stopword filtering, keyword matching, and similarity vector calculations.
- **Academic Viva Voce Defense Sheet**:
  - Built-in presentation guide with answers to common examination questions.

---

## 3. NLP Concepts Implemented

1. **Text Preprocessing**:
   - Case folding (normalization to lowercase).
   - Non-alphanumeric punctuation cleansing while preserving syntactic markers (e.g., `O(1)`, `C++`).
   - Whitespace stripping and normalization.
2. **Tokenization**:
   - Splitting continuous textual responses into atomic tokens using boundary regex patterns.
3. **Stop-word Removal**:
   - Filtering non-informative grammatical words using a curated English stopword lexicon of 100+ words.
4. **Technical Keyword & Entity Extraction**:
   - Multi-word n-gram scanning to identify role-specific entities (e.g., "hash table", "garbage collection", "attention mechanism", "virtual dom").
5. **Semantic Relevance via Vector Space Model**:
   - Term Frequency (TF) and Inverse Document Frequency (IDF) representations of candidate answers against gold-standard benchmark responses.
   - Vector Dot Product Cosine Similarity:
     $$\text{Cosine Similarity} = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$
6. **Lexical Sentiment & Tone Analysis**:
   - Polarity mapping of confident and professional technical markers versus hesitation or negative hedges.
7. **Transparent Mathematical Scoring Equation**:
   $$\text{Final Score} = (0.35 \times \text{Relevance}) + (0.30 \times \text{Technical}) + (0.20 \times \text{Completeness}) + (0.15 \times \text{Clarity})$$

---

## 4. Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti.
- **Visual Analytics**: Recharts (Radar, Line, and Bar charts).
- **Backend**: Express.js with Vite middleware.
- **AI / LLM Integration**: Google GenAI TypeScript SDK (`@google/genai` with `gemini-3.8-flash`) executed server-side.
- **Speech**: Web Speech API (`SpeechRecognition`).
- **Persistence**: Browser `localStorage` abstraction.

---

## 5. Setup Instructions

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (optional):
   Copy `.env.example` to `.env` and set your `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY="YOUR_KEY_HERE"
   ```
   *Note: If no API key is set, the application operates in algorithmic fallback mode with full NLP scoring.*
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:3000`.

---

## 6. Future Improvements

- Custom question bank authoring for specialized company job descriptions.
- Voice output / Text-to-Speech (TTS) for the interviewer persona.
- Integration of Transformer-based embeddings (e.g. SBERT / BERT embeddings).
- Audio filler-word detection ("um", "uh", "like") via live audio stream analysis.
