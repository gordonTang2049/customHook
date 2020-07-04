import React , {
  useState,
  useRef,
  useEffect
} from'react';
import './App.css';
import {useSearch1} from './customHooks/useSearch'

function App() {


  const [subimittedVal, setSubimittedVal] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSameInputVal, setIsSameInputVal] = useState(false)
  // prevent same value search
  const [useSearchStatus, setUseSearchStatus] = useState({isLoading : true, resp : null})

  
  
  const inputRef = useRef('')
  
  // const {isLoading, resp} = useSearch1()

  
  // dependency isSubmit /
  const fetchResponses = useSearch1(subimittedVal, useSearchStatus)


// if I only use fetchResponses as dependency, when search the same value
// it won't reset setIsSubmitted for me 
  useEffect(() => {

    // set time out for same value loading for better user experience
    return () => {

       setIsSubmitted(false)
       setIsSameInputVal(false)
    }
  }, [fetchResponses, isSameInputVal])


  const handleSubmit = (e) => {
      e.preventDefault()
      setSubimittedVal(inputRef.current.value)
      setIsSubmitted(true)
      
      if(inputRef.current.value === subimittedVal){
        setIsSameInputVal(true)
      }
      
  }

  

  return (
    <div className="App">

        <form style={{margin : 30 }} onSubmit={handleSubmit}>
              <label  htmlFor="SearchInputBox">Search Input Box : </label>
              <input ref={inputRef}   />
              <button>Submit </button>
          </form >
      {/* Because I am not using isloading from response */}
      {subimittedVal && isSubmitted ? (
        <>
            <h1>Loading....</h1>
            
        </>):(
        <>
          
          <pre>Loading Status is {fetchResponses.isLoading.toString()}</pre>
          <pre>isSubmit Status is {isSubmitted.toString()}</pre>
          {JSON.stringify(fetchResponses.resp, null, 2)}
          

        </>)}
    </div>
  );
}

export default App;
