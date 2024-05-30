import React from 'react'
import Welcome from '../components/dashboardComponents/welcome'
import IdeaSubmission from '../components/dashboardComponents/submission'
import IdeaList from '../components/dashboardComponents/ideaList'
import IdeaDetails from '../components/dashboardComponents/ideaDetail'
import AiExpansion from '../components/dashboardComponents/aiExpansion'
import ProgressTracking from '../components/dashboardComponents/progress'

export default function Page() {
  return (
    <div className=' w-full h-screen overflow-scroll'>
        <Welcome />
        <div className='flex mt-4 justify-evenly items-center'>
            <IdeaSubmission />
            <IdeaList />
        </div>
        <AiExpansion />
        <ProgressTracking />
    </div>
  )
}
