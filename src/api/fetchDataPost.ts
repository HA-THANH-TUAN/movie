const fetchDataPost = async (pathname:string,body:any)=>{
    const url=`${process.env.REACT_APP_URL_API}/${pathname}`
    const res= await fetch(url,{
        method:"POST",
        body:JSON.stringify(body),
        headers: {
            'accept': 'application/json',
            "Content-Type": "application/json",
          }})
    return res
}
export default fetchDataPost