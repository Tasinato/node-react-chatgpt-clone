const InputPrompt = require("../models/input-prompt");
const openai = require("../config/openai");

module.exports = {
  async sendText(req, res) {
    // dependendo do seu config/openai.js, ajuste esta linha:
    // se configuration() retorna a instância OpenAIApi diretamente, use:
    // const openaiAPI = openai.configuration();
    const { openaiAPI } = openai.configuration();

    const { prompt } = req.body;
    const inputPrompt = new InputPrompt(prompt);

    try {
      const openaiRes = await openaiAPI.createCompletion(
        openai.textCompletion({ prompt: inputPrompt.prompt })
      );

      return res.status(200).json({
        success: true,
        data: openaiRes.data.choices[0].text,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response ? error.response.data : "there was an error on the server",
      });
    }
  },
};
