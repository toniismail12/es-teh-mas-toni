import { svc_wa, svc_ai } from "@/api";

async function GetContact(number) {

    const config = {
        params: { 
            number: number
        },
    }

    try {
        const res = await svc_wa.get("/contact", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}


async function GetChatHistory(number) {

    const config = {
        params: { 
            no_hp: number
        },
    }

    try {
        const res = await svc_wa.get("/chat-petani", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SentChatTabular(prompt, name, number) {

    const history = prompt?.map(item => ({
        role: item.Role.toLowerCase(),
        parts: [item.Parts]
    }));

    const jsonString = JSON.stringify(history);

    let formdata = new FormData();
    formdata.append("prompt", jsonString);
    formdata.append("name", name);
    formdata.append("number", number);

    try {
        const res = await svc_ai.post("/ai-petani/tabular", formdata,
        {
            headers: {
                "content-type": "multipart/form-data",
            }
        });
        // console.log('Response:', res);
        return res

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}


export default GetContact
export { GetContact, SentChatTabular, GetChatHistory }
