import React from 'react'
import CreateJoinRoom from '@/components/chat/CreateJoinSection'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import FeatureSection from '@/components/common/FeatureSection'

function page() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <CreateJoinRoom />
      <FeatureSection />
      <Footer />

    </div>
  )
}

export default page