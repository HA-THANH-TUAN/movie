import React , {useEffect} from 'react'
const style={
    classNameIcon:'text-6xl md:text-7xl text-red-500'
}

export default function PopUpNotify({message,children,handleOffPopUp, textButton="Thử lại",classNameIcon=style.classNameIcon}) {
    useEffect(() => {
        document.body.style.overflowY="hidden"
        return () => {
            document.body.style.overflowY="initial"
        };
    }, []);
  return (
        <div className='modal-popup z-[1000]'>
            <div className='modal-popup-dialog '>
                <div className='modal-popup-wrapper' onClick={handleOffPopUp}>
                </div>
                <div className='modal-popup-content' >
                    <div className='max-w-[400px] sm:mx-auto bg-white rounded py-5 md:py-10 flex justify-center items-center relative flex-col'>
                        <h1 className='text-xl md:text-2xl font-medium mb-3 text-center mx-5 md:mb-10'>{message}</h1>
                        <span className={classNameIcon}>{children}</span>
                        <button  className='hover:bg-orange-400 px-4 py-2 rounded font-semibold md:text-lg mt-5 md:mt-10 text-white cursor-pointer bg-orange-500' type="button" onClick={handleOffPopUp} >{textButton}</button>
                    </div>
                </div>
            </div>
        </div>
  )
}
