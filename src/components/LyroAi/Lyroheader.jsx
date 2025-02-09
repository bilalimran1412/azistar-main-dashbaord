import React from 'react'

function Lyroheader({title, text, Fhref, FIcon, buttonText, Shref, SIcon, buttonSText, Sclass, onButtonClick}) {
    return (
        <div className='hdr_st_so hdr_deta '>
            <div className='hdr_sajhs'>
                <h2>{title}</h2>
                <p style={{ color: 'gray' }}>{text}</p>
            </div>
            <div className='flex_cols'>
                <a href={Fhref}>
                    <button onClick={onButtonClick} className='add_new_deta'>
                        <span>{FIcon}</span>
                        {buttonText}
                        
                    </button>
                </a>
                <a href={Shref}>
                    <button className={Sclass}>
                        <span>{SIcon}</span>
                        {buttonSText}
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Lyroheader