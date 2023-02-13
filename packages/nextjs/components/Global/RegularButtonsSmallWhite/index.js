import React from 'react'
import { usePlaceholder } from '@ethereansos/interfaces-core'
import { Link } from 'react-router-dom'
import { Typography } from '@ethereansos/interfaces-ui'

import style from '../../../all.module.css'

const RegularButtonDuoSmallWhite  = (props) => {
    return (
        <>
            <button className={style.RegularButtonDuoSmallWhite}>Increase</button>
            <button className={style.RegularButtonDuoSmallGray}>Decrease</button>
        </>
    )
}

    export default RegularButtonDuoSmallWhite