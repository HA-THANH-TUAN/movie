import React, {FC} from 'react';
interface IStateCartPromotion{
    promotion:{title:string,description:string,imgPromotion:string}
}
const CartPromotion:FC<IStateCartPromotion> = ({ promotion }) => {
    return (
            <div className='cart-image my-4 md:my-2 flex flex-col items-center rounded-md'>
                <div className='w-full rounded-[inherit]'>
                    <div className='wraper-image relative flex justify-center items-center w-full rounded-[inherit]'>
                        <img className='object-cover rounded-[inherit]  w-full' src={promotion.imgPromotion} alt="promotionImage" />
                        <div className='overlap-cart invisible w-full h-full p-4 rounded-[inherit] absolute flex flex-col items-center justify-center  sm:justify-between'>
                            <div className='text-white sm:block hidden'>
                                <h2 className='font-medium text-sm md:text-lg mb-4'>{promotion.title}</h2>
                                <p className='text-sm md:text-lg'>{promotion.description}</p>
                            </div>
                            <button className='px-2 py-1 md:px-3 md:py-2 border-solid border border-white text-white font-medium text-sm md:text-lg hover:bg-orange-500 rounded-sm' type="button">CHI TIẾT</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default CartPromotion;
