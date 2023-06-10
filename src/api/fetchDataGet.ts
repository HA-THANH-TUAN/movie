const fetchData = async (pathname:string)=>{
    const url=`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/${pathname}`
    const res= await fetch(url,{
        headers: {
            'accept': 'application/json',
            "Content-Type": "application/json",
          }})
    const data =await res.json()
    return data
}
export default fetchData