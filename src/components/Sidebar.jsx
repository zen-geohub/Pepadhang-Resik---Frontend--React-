import { useState } from "react";
import { HiHome, HiFilter, HiDocumentAdd, HiQuestionMarkCircle } from "react-icons/hi";

function Sidebar() {
  const [test, setTest] = useState('')

  function Test() {
    console.log(test);
    setTest('test')
  }

  return (
    <aside className='flex flex-col justify-between p-2 bg-primary-color h-screen w-fit text-white'>
      <div className='flex flex-col gap-4'>
        <button onClick={Test} className='btn-sidebar'>
          <span><HiHome className='text-2xl'/></span>
          <span>Home</span>
        </button>
      
        <button className='btn-sidebar'>
          <span><HiFilter className='text-2xl'/></span>
          <span>Filter</span>
        </button>
      
        <button className='btn-sidebar text-start'>
          <span><HiDocumentAdd className='text-2xl'/></span>
          <span>Permohonan<br/>Reklame</span>
        </button>
      </div>

      <button className='btn-sidebar'>
        <span><HiQuestionMarkCircle className='text-2xl'/></span>
        <span>Panduan</span>
      </button>
    </aside>
  )
}

export default Sidebar