import React from 'react';
import { connect } from 'react-redux';
import ItemCinema from './ItemCinema/ItemCinema';  

const ListItemCinemaDetail = (props) => {
    const {dataCalenderMovie, dataIdCinema}=props
    const convertCinemaMovie=dataCalenderMovie?.reduce((previousValue, currentValue) => {
        return {...previousValue, [currentValue.id]:currentValue}},{})

    return (
        <div className='sticky top-0'>
            { dataIdCinema.length ?dataIdCinema.map((v,i)=><ItemCinema dataItemCinema={convertCinemaMovie[v]} key={i}/>) : undefined}
        </div>
    );
}


const mapStateToProps = (state) => ({
    dataCalenderMovie:state.movieDetailPageManage.calenderMovie,
})

export default connect(mapStateToProps)(ListItemCinemaDetail)
