export default function LS(key) {
    
    const item = typeof window !== "undefined" ? localStorage.getItem(key) : null ;

    return item;
    
}
