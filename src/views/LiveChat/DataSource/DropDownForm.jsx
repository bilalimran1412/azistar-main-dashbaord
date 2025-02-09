import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Loader from '../Loader/Loader';

function DropDownForm({ closeForm, onSubmit }) {
  const [url, setUrl] = useState('');
 const [showLoader, setShowLoader] = useState(false);




  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      onSubmit(url);
      closeForm();
    }, 3000);
    
  };

  return (
    <div className='drop_dwn_form'>
      <div className='inr_drop_dn_frm'>
        <div className='frm-outer'>
          <div className='hdr_form'>
            <div className='title_form'>
              <h2>Add website content from URL</h2>
              <div className='icon_close' onClick={closeForm}><MdClose /></div>
            </div>
          </div>
          <div className='form_show url_sub_form'>
            <form onSubmit={handleSubmit}>
              <label className='input_lble_url'>
              <input placeholder='Enter Url of your website' required type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
              <span>e.g. https://example.com/</span>
              </label>
              <div className='submit_btn'>
                <button className='btn' type='submit' disabled={showLoader}>
                    {showLoader ? 'Uploading...' : 'Upload'}
                  </button>              
                  </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default DropDownForm;