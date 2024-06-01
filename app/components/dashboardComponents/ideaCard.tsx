import Link from "next/link";

interface Idea {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
    createdAt: string; // Should be a valid date string, e.g., "2024-05-31T00:22:20.161Z"
  }

  interface IdeaCardProps {
    idea: Idea; // Define the idea prop using the Idea interface
  }
  

const IdeaCard = ({ idea }: IdeaCardProps) => {

    return (
      <Link href={{
        pathname: `/dashboard/recent/${idea.id}`,
        query: {
          title: idea?.title,
          description: idea?.description,
          tags: idea?.tags,
          category: idea?.category,
          status: idea?.status,
          createdAt: idea?.createdAt,
          id: idea?.id
        }
      }} className="bg-white rounded-lg flex flex-col justify-start items-start  shadow-md shadow-zinc-950 p-6">
        <h2 className="text-2xl font-semibold mb-4">{idea.title}</h2>
        <p className="text-gray-600 mb-4">{idea.description}</p>
        <div className="flex items-center  w-full justify-between">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Category:</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">{idea.category}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Tags:</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">{idea.tags}</span>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-gray-600 mr-2">Status:</span>
          <span className={`px-2 py-1 rounded-md ${idea.status === 'OPEN' ? 'bg-yellow-400 text-yellow-900' : (idea.status === 'IN_PROGRESS' ? 'bg-blue-400 text-blue-900' : 'bg-green-400 text-green-900')}`}>
            {idea.status}
          </span>
        </div>
        <p className="text-gray-500 mt-4">Created At: {new Date(idea.createdAt).toLocaleString()}</p>
      </Link>
    );
  };
  
  export default IdeaCard;
  