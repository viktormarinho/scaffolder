import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchStack } from "../fetchers/example"


const App = () => {
  const query = useQuery(['stack'], fetchStack);

  return (
    <div className="flex flex-col items-center w-screen">
      <h1 className="text-8xl text-center font-bold w-[70vw] mt-[20vh]">
        Welcome to the scaffolder
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"> React Client </span>
        project.
      </h1>
      <h2 className="text-2xl text-center mt-8 w-[40vw]">
        Hand-picked modern tech stack that aims to provide the best experience for both the developers and the end users.
      </h2>
      <div className="flex items-center gap-8 mt-8">
        {query.isLoading
          ? <LoadingCards />
          : query.data &&
          <>
            {query.data.map((tech, i) => <Card key={i} {...tech} />)}
            <ResetQueryButton />
          </>
        }
      </div>
    </div>
  )
}

const Card = ({ title, content, link }: { title: string, content: string, link: string }) => {
  return (
    <a href={link} target="_blank">
      <div className="p-4 border-black border-2 rounded-xl w-80 h-48 cursor-pointer group hover:border-blue-500 transition-colors">
        <h3 className="group-hover:text-blue-500 transition-colors text-3xl font-bold py-2">{title} <ArrowRight /></h3>
        <p>{content}</p>
      </div>
    </a>
  )
}

const ResetQueryButton = () => {
  const client = useQueryClient();

  return (
    <div className="absolute right-0 left-0 bottom-24 flex justify-center">
      <button className="transition-colors rounded-lg p-2 border-2 border-transparent hover:border-black" onClick={() => client.resetQueries(['stack'])}>
        Reset Query
      </button>
    </div>
  )
}

const LoadingCards = () => (
  <>
    <LoadingCard />
    <LoadingCard />
    <p className="absolute right-0 left-0 bottom-24 z-10 text-center text-3xl font-semibold">Fetching the Tech stack...</p>
    <LoadingCard />
    <LoadingCard />
  </>
);

const LoadingCard = () => (
  <div role="status" className="p-4 w-80 h-48 max-w-sm rounded-xl border-2 border-gray-300 shadow animate-pulse">
    <div className="h-6 bg-gray-300 rounded-full w-48 mb-6"></div>
    <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-300 rounded-full"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

const ArrowRight = () => <svg className="w-8 h-8 inline transition-colors group-hover:fill-blue-500" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fillRule="nonzero" /></svg>

export default App;