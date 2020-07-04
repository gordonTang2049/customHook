import React , {
    useState,
    useRef
  } from'react';
  import './App.css';
  import {useSearch1} from './customHooks/useSearch'
  
  function App() {
  
    // useRef???
    const [useSearchStatus, setUseSearchStatus] = useState({isSubmitted: false, isLoading : true, resp : null})
  
    const [inputValue, setInputValue] = useState('credit card')
    const [subimittedVal, setSubimittedVal] = useState({
                                      firstName : '',
                                      lastName : ''
  
    })
  
    console.log(subimittedVal)  
  
    const [searchResp, setSearchResp] = useState('credit card')
    const labelVal = useRef('testLabel')
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    
    
    // const {isLoading, resp} = useSearch1()
    const fetchResponses = useSearch1(subimittedVal, {isLoading : true, resp : null})
  
    // const fetchResponses = useSearch1(subimittedVal, useSearchStatus)  
  
    
    const handleSubmit = (e) => {
        e.preventDefault()
  
        // console.log(firstNameRef)
        // console.log(lastNameRef)
        // console.log(firstNameRef.current.value)
        // console.log(lastNameRef.current.value)
        console.log('=========================================')
        setSubimittedVal({
          firstName : firstNameRef.current.value,
          lastName : lastNameRef.current.value
        })
  
    }
  
    // const handleChange = useCallback(
    //   (e) => {
    //     setInputValue(e.target.value)
    //   },[e.target.value])
  
    console.log('Loading status ' + fetchResponses.isLoading)
    console.log('response ' + fetchResponses.resp)
  
    return (
      <div className="App">
        {fetchResponses.isLoading ? (
        <>
          <pre>Loading....</pre>
  
          <form onSubmit={handleSubmit}>
              <label ref={labelVal} htmlFor="">first Name : </label>
              <input ref={firstNameRef} />
              <label ref={labelVal} htmlFor="">last Name : </label>
              <input ref={lastNameRef}   />
              <button>Submit </button>
          </form >
  
          {/* by this way, it doesn't cause rerender */}
  
          <button onClick={()=> {
            labelVal.current.innerHTML === 'nonono' || labelVal.current.innerHTML === 'test'
            ? labelVal.current.innerHTML =  'yesyesyes'
            : labelVal.current.innerHTML =  'nonono'
              }}>Clickme </button>
        </>):(<>
          <pre>Loading Status is {fetchResponses.isLoading}</pre>
          {JSON.stringify(fetchResponses.resp, null, 2)}
        </>)}
      </div>
    );
  }
  
  export default App;
  