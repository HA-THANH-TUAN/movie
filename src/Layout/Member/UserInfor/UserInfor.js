import React from 'react'

export default function UserInfor() {
    return (
        <div className='userInfor'>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div >
                        <label htmlFor="website" className="block mb-2  font-medium">Họ và tên</label>
                        <input
                            type="text"
                            id="fullname"
                            value="Đặng Thị Ngọc Linh"
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    </div>
                    <div >
                        <label htmlFor="email" className="block mb-2 font-medium ">Email</label>
                        <input
                            type="email"
                            id="email"
                            value="linh123@gmail.com"
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                            placeholder="Linh123@gmail.com" />
                    </div>
                    <div >
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium ">Số điện thoại</label>
                        <input
                            type="tel"
                            id="phone"
                            className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="123-45-678"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                    </div>
                    <div >
                        <label htmlFor="birthday" className="block mb-2 text-sm font-medium">Ngày sinh</label>
                        <input type="date" id="birthday" className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div >
                        <label htmlFor="address" className="block mb-2 font-medium ">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Ho Chi Minh" />
                    </div>
                    <div >
                        <label htmlFor="city" className="block mb-2 font-medium">Tỉnh/Thành Phố</label>
                        <input
                            type="tel"
                            id="city"
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    </div>
                    <div>
                        <label htmlFor="district" className="block mb-2 font-medium ">Quận/Huyện</label>
                        <input
                            type="url"
                            id="district"
                            className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-500 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center">
                    Lưu lại
                </button>
            </form>
        </div>
    )
}
