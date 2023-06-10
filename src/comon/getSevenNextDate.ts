const getSevenNextDate=(dateStartValueOf: number, numberNext: number): number[]=>{
    let arrayDate: number[]=[]
    for(let i=0; i< numberNext ;i++ ){
        const dateObj:number=new Date(dateStartValueOf + 86400000*i).valueOf()
        arrayDate=[...arrayDate, dateObj]       
    }
    return arrayDate
    
}

export default getSevenNextDate