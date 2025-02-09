import React, { useState, useEffect } from 'react';
import Playground from './Playground';
import UnPlayground from './UnPlayground';

function Index() {
  const [data, setData] = useState([]);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseURL}/scrap_data`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      {data.length > 0 ? <Playground data={data} /> : <UnPlayground />}
    </>
  );
}

export default Index;