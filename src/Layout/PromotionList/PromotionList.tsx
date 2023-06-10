import React from 'react';
import dataPromotion from "./dataPromtion"
import CartPromotion from './CartPromotion/CartPromotion';

const PromotionList = () => {
    return (
 
        <ul className='promotion-list grid grid-cols-12 gap-x-5 sm:gap-6 lg:gap-10'>
            {dataPromotion.map((promotion, index)=><li className='col-span-6 sm:col-span-4 md:col-span-3' key={index}><CartPromotion promotion={promotion} /></li>)}
            
        </ul>
    );
}

export default PromotionList;
