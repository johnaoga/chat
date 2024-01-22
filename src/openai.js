import OpenAI from "openai";
const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });
//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//console.log(process.env)

/*
export async function sendMsgToOpenAI(msg) {
    const res = await openai.createCompletion({
        //model: 'gpt-3.5-turbo-16k',
        model: 'text-davinci-003',
        prompt: msg,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presense_penalty: 0
    });
    return res.data.choices[0].text;
}*/

export async function sendMsgToOpenAI(msg) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: msg//'You are a helpful assistant.' + msg
            }
        ],
        model: 'gpt-3.5-turbo',

    });
    console.log(chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
}


/*export async function sendMsgToOpenAI(msg) {
    const res = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
        //model: 'gpt-3.5-turbo-16k',
        //model: 'text-davinci-003',
        prompt: msg,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presense_penalty: 0
    });
    console.log(res.choices[0]);
    return res.choices[0].text;
};*/