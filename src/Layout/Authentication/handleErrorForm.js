
const handleCheckEmty=(content)=>{
    return !content
}
const handleCheckFormatPatern= (content, patrern)=>{
    return patrern.test(content)
}
export {handleCheckEmty,handleCheckFormatPatern}