import React, { useState } from 'react';
import UserTransaction from './UserTransaction/UserTransaction';
const Member = () => {
    return (
        <div className='member'>
            <div className='xl:max-w-7xl mx-auto flex flex-wrap'>
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={"text-xl font-bold px-5 py-4 shadow-lg rounded block leading-normal text-amber-600 bg-white"}>
                                GIAO DỊCH CỦA TÔI</a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full  mb-6 shadow-lg rounded min-h-screen">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                 <UserTransaction />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Member;



