
import RecentList from './recentLists';

export default function RecentHeader() {

  return (
    <div className="bg-gradient-to-r from-slate-900 to-teal-800 text-white w-full h-screen p-6 rounded-lg shadow-lg mb-6 overflow-scroll">
        <h1 className="text-4xl font-bold mb-2">Most Recent Activity</h1>
        <p className="text-lg mb-4">
          Welcome to your most recent activity page! Here you can find all your ideas that are currently in progress. Click on any idea to view its details and continue working on it.
        </p>
        <RecentList />
    </div>
  )
}
