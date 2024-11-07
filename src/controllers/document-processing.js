import { svc_ai } from "@/api";

async function SentChatDocProcess(files) {

    let formdata = new FormData();

    formdata.append("file", files);
    formdata.append("prompt", "buatkan tabular tabel");

    try {
        const res = await svc_ai.post("/ai-document-processing/", formdata,
        {
            headers: {
                "content-type": "multipart/form-data",
            }
        });
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}


export default SentChatDocProcess
export { SentChatDocProcess }