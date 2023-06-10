const fetchDataPost = async (pathname:string,body:any)=>{
    const url=`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/${pathname}`
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