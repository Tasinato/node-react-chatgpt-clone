const { Configuration, OpenAIApi } = require("openai");

module.exports = class OpenAIClient {

  static configuration() {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });

    return new OpenAIApi(configuration);
  }

  static textCompletion({ prompt }) {
    return {
      model: "text-davinci-003",
      prompt: String(prompt),
      temperature: 0,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    };
  }

  // ✅ método unificado para teste ou uso direto
  static async gerarNomeAula() {
    const openai = this.configuration();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        'diga um nome legal para uma aula de chatgpt\n\n' +
        'Aula de Node com ChatGPT: "Explorando o Poder do Node com ChatGPT".',
      temperature: 0,
      max_tokens: 256,
    });

    console.log(response.data.choices[0].text);
    return response.data.choices[0].text;
  }
};
