const asyncHandler = require("express-async-handler");
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Load the .env file if it exists
 require("dotenv").config();

// You will need to set these environment variables or edit the following values
// The endpoint you will use to access your Azure OpenAI instance
const endpoint = process.env["ENDPOINT"] || "https://enshin-azureopenai.openai.azure.com/";
// Your Azure OpenAI API key
const azureApiKey = process.env["AZURE_API_KEY"] || "e1c369f3f0a748d9b3f76c717c35cf86";
// Your Azure Cognitive Search endpoint, admin key, and index name
const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"] || "https://enshin-cognitivesearch.search.windows.net";
const azureSearchAdminKey = process.env["AZURE_SEARCH_KEY"] || "SxfWL1Or3xgGWZyGh8IG9k9DJHcV1em3qCJhwGOcEhAzSeAlbx30";
const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"] || "documents-index";


const userCheck = asyncHandler(async (req, res) => {
  const { messages } = req.query;
  // Copyright (c) Microsoft Corporation.
  // Licensed under the MIT License.

  /**
   * Demonstrates how to use Azure's Bring Your Own Data with Azure OpenAI Chat Completions.
   *
   * @summary chat completions with your own data.
   */



  async function main() {
    console.log("== Bring Your Own Data Sample ==");
    // console.log(messages);
    console.log(messages[messages.length - 1].content);
    const question = messages[messages.length - 1]
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "gpt-35-turbo-16k";
    const events =await client.getChatCompletions(deploymentId, [question], {
      temperature: 0.25,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 800,
      stop: null,
      azureSearchEndpoint: azureSearchEndpoint,
      azureSearchKey: azureSearchAdminKey,
      azureSearchIndexName: azureSearchIndexName,
      /**
       * The `azureExtensionOptions` property is used to configure the
       * Azure-specific extensions. In this case, we are using the
       * Azure Cognitive Search extension with a vector index to provide
       * the model with additional context.
       */
      azureExtensionOptions: {
        extensions: [
          {
            type: "AzureCognitiveSearch",
            endpoint: azureSearchEndpoint,
            key: azureSearchAdminKey,
            indexName: azureSearchIndexName,
          },
        ],
      },
    });
    console.log(events)
    const firstChoiceMessage = events.choices[0].message;
    let result;
events.choices.forEach(choice => {
  // console.log(choice.message.content); // Output each message
  console.log(choice.message); // Output each message
  // result
  res.status(200).json(choice.message);
});
    // events.next((a) => { console.log(a, "rtdddhgfj") });
    // console.log(events.next((a) => { console.log(a) }))
    // for await (const event of events) {
    //   for (const choice of event.choices) {
    //     console.log(choice.delta?.content, "sjhdgfkjsdhfsdjh");
    //   }
    // }

    // const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

    //   const { choices } = await client.getChatCompletions(
    //     "gpt-35-turbo-16k", // assumes a matching model deployment or model name
    //     messages[messages.length - 1].content);

    //   for (const choice of choices) {
    //     console.log(choice.text);
    //   }
  }

  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
  // try {
  //     // Find the document based on the input value
  //     const validate = await Userlist.find({ inputValue });

  //     if (validate) {
  //         res.status(200).json({ status: true });
  //     } else {
  //         res.status(200).json({ status: false });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ status: false, error: 'Internal server error' });
  //   };
})


module.exports = userCheck