import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/configStore'

const LoadingComponent: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading)

    if (isLoading) {
        return (
            <div className='styleLoading.bgLoading'>
                <img src={require('../../assets/loading.gif')} alt='loading' />
            </div>
        )
    } else {
        return null
    }
}

export default LoadingComponent
