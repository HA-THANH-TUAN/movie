import React from 'react'

export default function FunExchange() {
    return (
        <div className='funExchange'>
            <div>
                <p>
                    Mở rộng quyền lợi thành viên Galaxy của bạn với chương trình đổi Sao sang điểm VUI của TAPTAP.
                    <br />
                    Với:<b> 1 VUI = 10 Sao</b>
                    <br />
                    Nhiều lựa chọn dùng điểm tiện lợi với đa dạng ưu đãi và thương hiệu trên TAPTAP.
                    <br />
                    <br />
                    <b>Làm quen với TAPTAP</b>
                    <br />
                    Xem thêm tại: <a href='https://taptap.com.vn/dieu-kien-dieu-khoan/' target="_blank" rel="noreferrer" className='hover:text-amber-600'> https://taptap.com.vn/terms</a>
                    <br />
                    <br />
                    <b>Tải ứng dụng tại</b>
                    <br />
                    <a href="https://apps.apple.com/VN/app/id1487758263?mt=8" target="_blank" rel="noreferrer" className='hover:text-amber-600'>www.taptap.com.vn/qr </a>
                </p>
            </div>

            <div className='mt-5'>
                <form>
                    <div class="grid gap-6 mb-6 md:grid-cols-3">
                        <div >
                            <label class="block mb-2 ">Từ</label>
                            <input
                                type="date"
                                class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            />
                        </div>
                        <div >
                            <label class="block mb-2 ">Đến</label>
                            <input
                                type="date"
                                class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
