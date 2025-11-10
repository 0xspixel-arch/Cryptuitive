import axios from 'axios';

const defaultConfigs = {
  ollama: {
    baseURL: 'http://localhost:11434',
    model: 'llama2',
  },
  huggingface: {
    apiKey: process.env.VITE_HUGGINGFACE_API_KEY || '',
    model: 'meta-llama/Llama-2-7b-chat-hf',
  },
  openai: {
    apiKey: process.env.VITE_OPENAI_API_KEY || '',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
  },
};

let currentProvider = 'ollama';

export const setLLMProvider = (provider) => {
  if (Object.keys(defaultConfigs).includes(provider)) {
    currentProvider = provider;
  }
};

export const queryLLM = async (prompt) => {
  const systemPrompt = `You are a helpful cryptocurrency market analyst and trading assistant.
Provide concise, accurate information about cryptocurrencies, market trends, and trading strategies.
When discussing trading strategies, always remind users that past performance doesn't guarantee future results.`;

  try {
    if (currentProvider === 'ollama') {
      return await queryOllama(prompt, systemPrompt);
    } else if (currentProvider === 'huggingface') {
      return await queryHuggingFace(prompt, systemPrompt);
    } else if (currentProvider === 'openai') {
      return await queryOpenAI(prompt, systemPrompt);
    }
  } catch (error) {
    throw new Error(`LLM query failed: ${error.message}`);
  }
};

const queryOllama = async (prompt, systemPrompt) => {
  const response = await axios.post(`${defaultConfigs.ollama.baseURL}/api/generate`, {
    model: defaultConfigs.ollama.model,
    prompt: `${systemPrompt}\n\nUser: ${prompt}`,
    stream: false,
  });

  return response.data.response || 'No response generated';
};

const queryHuggingFace = async (prompt, systemPrompt) => {
  if (!defaultConfigs.huggingface.apiKey) {
    throw new Error('Hugging Face API key not configured');
  }

  const response = await axios.post(
    `https://api-inference.huggingface.co/models/${defaultConfigs.huggingface.model}`,
    {
      inputs: `${systemPrompt}\n\nUser: ${prompt}`,
      parameters: {
        max_length: 512,
        temperature: 0.7,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${defaultConfigs.huggingface.apiKey}`,
      },
    }
  );

  const result = response.data[0]?.generated_text || 'No response generated';
  return result.split('User:')[result.split('User:').length - 1].trim();
};

const queryOpenAI = async (prompt, systemPrompt) => {
  if (!defaultConfigs.openai.apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await axios.post(
    `${defaultConfigs.openai.baseURL}/chat/completions`,
    {
      model: defaultConfigs.openai.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 512,
    },
    {
      headers: {
        Authorization: `Bearer ${defaultConfigs.openai.apiKey}`,
      },
    }
  );

  return response.data.choices[0]?.message?.content || 'No response generated';
};
