import IdeaChart from '@/app/components/dashboardComponents/bar'
import IdeasByStatus from '@/app/components/dashboardComponents/example'
import IdeaCategoryChart from '@/app/components/dashboardComponents/pie'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full h-screen flex justify-start items-start overflow-scroll'>
      {/* <IdeaChart /> */}
      <IdeasByStatus />
      <IdeaCategoryChart />
    </div>
  )
}
