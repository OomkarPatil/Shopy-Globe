import BlurIn from './ui/blur-in';
import Globe from './ui/globe';

const Page = () => {
  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden gap-8 rounded-lg  bg-[#EEF7FF]   ">

      {/* Title */}
      
      <div className="flex-1 pl-10 sm:pr-10">
        
        <BlurIn
        word="Welcome To Shoppy Globe"
        className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-500/90 to-black bg-clip-text text-left
        font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"/>
        
        
      
      </div>

      {/* Globe Component */}
      
      <div className="flex-1 flex justify-center">
      <Globe className="absolute top-28 right-[-450px]" />
     </div>

    </div>
  );
}

export default Page