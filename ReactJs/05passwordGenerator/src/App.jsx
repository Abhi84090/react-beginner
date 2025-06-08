import {useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length,setLength] = useState(8);
  const[numAllowed,setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}`~"

    for(let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
      setPassword(pass)
    }

  },[length,numAllowed,charAllowed, setPassword ])

  const copyPassToClipBoard = useCallback( () => {
      passwordRef.current?.select();
      passwordRef.current?.setSelection(0,101)
      window.navigator.clipboard.writeText(password)
  },
  [password])
  
  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,charAllowed,setPassword])

  return (
    <>
      <div className ="w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8  bg-gray-700 
      text-orange-500">
        <h1 className='text-white text-center my-4 '>
          Password Generator  </h1>
        <div className=" bg-white  flex shadow rounded-lg 
        overflow-hidden mb-4" >
          <input type="text"
            value={password} 
            className="outline-none  w-full py-1 px-2 my-2"
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPassToClipBoard}
            className=' hover:bg-sky-400 outline-none bg-blue-700 text-white
            px-3 py-0.5 shrink-0'
          >Copy</button>
        </div>
        <div className='flex flex-row flex-items-center gap-x-1'>
          <div className='flex-items-center gap-x-1' >
              <input type="range" 
              min={6} 
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length : {length} </label>
          </div>
          <div className='flex-items-center ' >
              <input type="checkbox" 
                defaultChecked={numAllowed}
                id='numberInput'
                onChange={()=>{
                    setNumAllowed((prev) => !prev);
                }}
              />Number
          </div>
          <div className='flex-items-center gap-x-1' >
              <input type="checkbox" 
                defaultChecked={charAllowed}
                id='charInput'
                onChange={()=>{
                    setCharAllowed((prev) => !prev);
                }}
              />Characters
          </div>

        </div>
      </div>
    </>
  )
}

export default App
