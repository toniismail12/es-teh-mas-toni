import { svc_iam } from "@/api";

async function GetPengeluaran(date) {

    const config = {
        params: { 
            date: date,
        },
    }

    try {
        const res = await svc_iam.get("/tn/pengeluaran", config);
        // console.log('Response:', res);
        return res?.data

    } catch (error) {
        console.error('Error:', error);
        return "error"
    }

}

async function SavePengeluaran(id, keterangan, nominal, date) {

    const data = {
        id: id,
        keterangan: keterangan,
        nominal: parseInt(nominal),
        date: date,
    }

    // console.log(data)

    try {
        const res = await svc_iam.post("/tn/pengeluaran?id="+id, data);
        // console.log('Response:', res);

    } catch (error) {
        console.error('Error:', error);
        alert("error create")
        return "error"
    }

}

async function DeletePengeluaran(id) {

    try {

        const res = await svc_iam.delete(`/tn/pengeluaran?id=${id}`);
    
        // console.log('Response:', response.data);
        alert("success delete")

        return res

    } catch (error) {
        console.error('Error:', error)
        alert(error.response.data.message)
        return "error"
    }

}

export default GetPengeluaran
export { GetPengeluaran, SavePengeluaran, DeletePengeluaran }
