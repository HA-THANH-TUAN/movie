
import { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { CgCloseO } from "react-icons/cg"
import { RiErrorWarningLine } from "react-icons/ri"
import { BsCheckCircleFill } from "react-icons/bs"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import PopUpNotify from '../../Components/PopUpNotify/PopUpNotify';
import { useSelector } from 'react-redux';
import payingApi from '../../api/payingApi';
import { RootState } from '../../redux/store';

interface INotifyPopUp{
  status:boolean,
  message:string,
  icon:React.ReactNode|string,
  textButton?:string
}

interface IStateForm {
  CardNumber:string,
  ExpireDate:string,
  CVV:string,
  CardName:string,
  focus:any,
}
interface IPropsListBank {
  Id: number,
  Name: string,
  Logo: string,
}

const PaymentForm = () => {

  const  [isPayed, setIsPayed]  = useState(false)
  const [notifyPopUp,setNotifyPopUp]=useState<INotifyPopUp>({
    status:false,
    message:"",
    icon:""
  })

  const [chooseBank, setChooseBank] = useState(0)

  const [modalPayFast, setModalPayFast] = useState(false)
  const inforMovieBooking=useSelector((state:RootState)=>state.bookingMovieManage.inforMovieBooking)
  const dataBookingCombo=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingCombo)
  const dataBookingSeat=useSelector((state:RootState)=>state.bookingMovieManage.dataBookingSeat)
  const location=useLocation()
  const {infor}=useParams()

  const checkSearch=location.search.replace(/ /g,"").match(/\?id=(?<id>[^&]+)&cimenaId=(?<cinemaId>[^&]+)&sessionId=(?<sessionId>[^&]+)/)
  console.log(">>checkSearch",checkSearch);
  const nav = useNavigate()

  const [listBankBank, setListBankBank] = useState<IPropsListBank[]>([])
  useEffect(() => {
    const callApi=async()=>{
      const data=await payingApi.getListBank()
      setListBankBank(data)
    }
    callApi()
  }, [])

  useEffect(()=>{
    let myTimeout:any
    if(isPayed){
     myTimeout= setTimeout(()=>{nav("/", { replace: true })}, 1000)
    }
    return ()=>{
      if(myTimeout){
        clearTimeout(myTimeout)
      }
    }

  }, [isPayed])

  const [formBooking, setformBooking] = useState<IStateForm>({
    CardNumber: '',
    ExpireDate: '',
    CVV: '',
    CardName: '',
    focus: '',
  });

  const handleInputChange = (evt:React.ChangeEvent<HTMLInputElement>) => {

    setformBooking({ ...formBooking, [evt.target.name]: evt.target.value });
  }

  const handleInputFocus = (evt:React.FocusEvent<HTMLInputElement>) => {
    setformBooking((prev:any) => ({ ...prev, focus: evt.target.getAttribute("type") }));
  }

  const checkForm = ()=>{
    if(chooseBank===0){
      setNotifyPopUp({
        status:true,
        message:"Hãy chọn ngân hàng thanh toán !",
        icon:<RiErrorWarningLine/>  
      })
      return false
    }
    else {
      Object.values(formBooking).forEach((value)=>{
        if(!value){
          setNotifyPopUp({
            status:true,
            message:"Hãy điền đầy đủ thông tin thanh toán !",
            icon:<RiErrorWarningLine/>
          })
          return false
        }
      })
      return true
    }
  }

  const hanldePaying = () => {
    const callApiPost=async()=>{
      const {focus, ...dataFormSend}=formBooking
      const res=await payingApi.postPaying( {
                BankId: chooseBank,
                ...dataFormSend,
                ...location.state.inforFilm,
                Price: location.state.totalPrice,
                Email:sessionStorage.getItem("Email"),
                Combo: location.state.listComboString,
                SeatCode: location.state.listSeatString,
              })
              if(res.status==200){
                console.log("200");
                setIsPayed(true)
                setNotifyPopUp({status: true, message:"Bạn đã thanh toán thành công", textButton:"Trở về", icon:<BsCheckCircleFill className='text-green-500'/>})
              }
              else{
                console.log(res.status);
                setNotifyPopUp({status: true, message:"Thanh toán thất bại ! ", icon:<CgCloseO/>})
              }
    }
    if(checkForm()){      
      callApiPost()
    }
  }

  return (
    <div className='' >
      {checkSearch&&infor ? <>
          {location.state ? <>
            {notifyPopUp.status? <PopUpNotify children={notifyPopUp.icon} message={notifyPopUp.message} textButton={notifyPopUp.textButton} handleOffPopUp={()=>{setNotifyPopUp({status: false, message:"", icon:""})}}/>: undefined}
            <div className='border-2 border-zinc-400 border-solid rounded-md max-w-xl sm:mx-auto mx-3 my-10 bg-white '>
             <>
                    <ul className='flex justify-center mt-6'>
                      {listBankBank.map(v => <li key={v.Id} onClick={() => setChooseBank(v.Id)} className={`${chooseBank == v.Id ? "border-2 border-solid rounded-lg bg-zinc-200 border-orange-500" : ""} p-1 mt-3`} ><img className='w-10 md:w-12' src={v.Logo} alt="" /></li>)}
                    </ul>
                    <h2 className=' flex justify-center mb-2 mt-5'>
                      {chooseBank == 0 ? <p className='font-semibold text-2xl '>CHỌN NGÂN HÀNG</p> : chooseBank == 2 ? <img className='object-contain h-10 md:h-14' src="https://upload.wikimedia.org/wikipedia/vi/thumb/3/3d/Argibank_logo.svg/1280px-Argibank_logo.svg.png" alt="" />
                        : <img className='object-contain h-14' src="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-TPBank.png" alt="" />}
                    </h2>
                    <div className='flex flex-col justify-center items-center ' >
                      <div className='col-span-6 relative mb-10'>
                        <Cards
                          number={formBooking.CardNumber}
                          expiry={formBooking.ExpireDate}
                          cvc={formBooking.CVV}
                          name={formBooking.CardName}
                          focused={formBooking?.focus}
                          preview={false}
                        />
                      </div>

                      <form className='grid grid-cols-12 gap-x-2 gap-y-5 mx-5 sm:mr-10'>
                        <div className='col-span-12 border border-zinc-400 border-solid rounded-md px-5  h-12'><input
                          className='h-full w-full focus:outline-none'
                          type="number"
                          name="CardNumber"
                          placeholder="Card Number"
                          value={formBooking.CardNumber}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        </div>
                        <div className='col-span-12 border border-zinc-400 border-solid rounded-md px-5  h-12'><input
                          className='h-full w-full focus:outline-none'
                          type="name"
                          name="CardName"
                          placeholder="Card Name"
                          value={formBooking.CardName}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        </div>
                        <div className='col-span-6 border border-zinc-400 border-solid rounded-md  px-5 h-12'><input
                          className='h-full w-full focus:outline-none'
                          type="expiry"
                          name="ExpireDate"
                          placeholder="Card Expiry"
                          value={formBooking.ExpireDate}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        </div>
                        <div className='col-span-6 border border-zinc-400 border-solid rounded-md  px-5 h-12'><input
                          className='h-full w-full focus:outline-none'
                          type="cvc"
                          name="CVV"
                          placeholder="Card Cvc"
                          value={formBooking.CVV}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        </div>
                        <div className='col-span-12 flex justify-center'>
                          <button type="button" onClick={hanldePaying} className='border border-solid border-orange-500 p-2 rounded-md mt-6 bg-orange-500 text-white font-medium mb-5 hover:opacity-80'>THANH TOÁN</button>
                        </div>
                      </form>
                    </div>
                  </>
            </div>
          </>:<Navigate to={`${location.pathname.replace("thanh-toan", "booking-ticket")}${location.search}`}/>
          }
       </>:<Navigate to="/"/>
}
    </div>
  );
}



export default PaymentForm;
