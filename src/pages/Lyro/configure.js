import React from 'react'
import Layout from '../../components/Layout/Layout'
import Configures from '../../views/Lyro/Configure'
import '../../views/Lyro/Playground/playground.css'

function Configure() {
  return (
    <Layout>
        <div className='configur_gen'>
          <Configures/>
        </div>
    </Layout>
  )
}

export default Configure