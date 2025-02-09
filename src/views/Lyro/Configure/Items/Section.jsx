import React from 'react';

const Section = ({ title, titleIcon, description, children }) => (
  <section className="section">
    <div className='section_info'>
      <h3>
        {titleIcon && <span className="title-icon">{titleIcon}</span>}
        {title}
      </h3>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
    {children}
  </section>
);

export default Section;
