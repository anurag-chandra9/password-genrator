import { useState ,useCallback, useEffect ,useRef} from 'react'

import './index.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed,setnumberallowed]=useState(false);
  const[charallowed,setcharallowed]=useState(false);
  const[password,setpassword]=useState("");
  const copy = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password)

},[password])

  const passwordgenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberallowed) str+="0123456789"
    if(charallowed) str+="!@#$%^&*-_+=[]{}~`"
    for (let i = 0; i <length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char)
}


setpassword(pass)
},[length,numberallowed,charallowed,setpassword])
useEffect(()=>{
  passwordgenerator();
},[length,numberallowed,charallowed,passwordgenerator])
//useRef hook
const passwordRef=useRef(null)
  

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>passwordgenerator
    <div className='classname="flex shadow rounded-lg overflow-hidden mb-4"'>
      <input type="text" value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
       />
      <button onClick={copy} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-centre gapx-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}/>
        <label htmlFor="">length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberallowed}
        id='numberinput'
        onChange={()=>{
          setnumberallowed((prev)=>!prev);
        }} />
        <label htmlFor="numberinput">numbers</label>

      </div>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={charallowed}
        id='charinput'
        onChange={()=>{
          setcharallowed((prev)=>!prev);
        }} />
        <label htmlFor="charinput">charcter</label>

      </div>

    </div>
   
  </>
  )
}
export default App
