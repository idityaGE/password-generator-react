import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)

  const generatePass = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numAllow, charAllow])


  useEffect(() => {
    generatePass()
  }, [length, numAllow, charAllow])

  
  const passwordRef = useRef(null)
  
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }
  
  return (
    <>
      <div id='main' className='flex flex-wrap items-center justify-center h-screen w-full'>
        <div className='flex flex-col items-center w-[50%] bg-emerald-500 h-52 rounded-3xl'>

          <h1 className='text-white text-2xl'>Password Generator</h1>

          <div className='pt-7'>
            <input
              ref={passwordRef}
              value={password}
              className='w-[30vw] rounded-sm'
              type="text" />
            <button
              onClick={copyToClipboard}
              className='bg-blue-500 px-2 text-white mx-3 rounded-md'>COPY</button>
          </div>

          <div className='mt-4 text-white'>
            <input
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
              value={length}
              type="range"
              min={6} max={30} id='range' />
            <label className='pl-3' htmlFor="range"> Length : {length}</label>
          </div>

          <div className='mt-2 text-white'>
            <input
              onChange={() => {
                setNumAllow((prev) => !prev)
              }}
              defaultChecked={numAllow}
              type="checkbox" id='numAllow' />
            <label className='pl-3' htmlFor="numAllow">Include Number</label>
          </div>

          <div className='mt-2 text-white'>
            <input
              onChange={() => {
                setCharAllow((prev) => !prev)
              }}
              defaultChecked={charAllow}
              type="checkbox" id='charAllow' />
            <label className='pl-3' htmlFor="charAllow">Include Charcters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
