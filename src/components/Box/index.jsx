import React from 'react';
import PropTypes from 'prop-types';

const BoxSelect = ({ child }) => {
    return (
        <div className='mn-box-select'>
            <div className='inr_dat_box'>
                {child}
            </div>
        </div>
    );
};

BoxSelect.propTypes = {
    child: PropTypes.node.isRequired,
};

export default BoxSelect;
