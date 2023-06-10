const fetchData = async (pathname:string)=>{
    const url=`${process.env.REACT_APP_URL_API}/${pathname}`
    const res= await fetch(url,{
        headers: {
            'accept': 'application/json',
            "Content-Type": "application/json",
          }})
    const data =await res.json()
    return data
}
export default fetchData