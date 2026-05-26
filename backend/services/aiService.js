const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function analyzeIssue(title, description) {
  const prompt = `You are a civic assistant for "Civ Alerts", a platform reporting urban issues.
Analyze the following report and return a JSON object with a suggested 'sector' and 'priority'.

Sectors allowed: ['Agriculture', 'Santé', 'Éducation', 'Transport', 'Numérique', 'Énergie']
Priority allowed: ['Faible', 'Moyenne', 'Critique']

Report Title: ${title}
Report Description: ${description}

Return ONLY a JSON object like this:
{
  "sector": "Transport",
  "priority": "Critique",
  "reasoning": "Short explanation of why this category and priority were chosen"
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0].text;
    // Extract JSON from response (in case Claude adds conversational text)
    const jsonMatch = content.match(/\{.*\}/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return null;
  }
}

module.exports = { analyzeIssue };
