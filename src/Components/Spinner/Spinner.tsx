import React, {FC} from 'react'
import "./Spinner.scss"

interface IPropsSpinner {
  diameter:number,
  weight:number,
  color:string,
  bg:string,
  time?:number,
}

export default function Spinner ({diameter=40,weight=14,color="red",bg="blue", time=1}:IPropsSpinner) {
  const style:any={
    "--spinner-diameter":`${diameter}px`,
    "--spinner-weight":`${weight}px`,
    "--spinner-color":color,
    "--spinner-bg":bg,
    "--spinner-time":`${time}s`,
  }

  return (
    <span
        style={style}
        className="lds-dual-ring w-20 h-20 block">
    </span>
  )
}
