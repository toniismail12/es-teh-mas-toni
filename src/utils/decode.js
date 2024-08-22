export default function Decode(value) {
    
    if(value === undefined) {
        return Array()
    }
    
    var encodedData = value;

    // Decode from Base64
    var decodedData = atob(encodedData);

    // Parse JSON
    var jsonData = JSON.parse(decodedData);

    return jsonData;
}
