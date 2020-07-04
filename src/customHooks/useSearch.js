import {
    useState,
    useEffect
} from 'react'

const axios = require('axios')



export const useSearch = (inputVal, defaultVal) => {

    const [state, setState] = useState(defaultVal)

    useEffect(()=>{

        const reponse = async () => {

            try{

                const resp = await axios.post('https://ds365api.search365.ai/search', {

                    "filterData": "",
                    "page": "",
                    "pageSize": "10",
                    "sort": "modified",
                    "didYouMean": "",
                    "advancedQuery": "",
                    "profile": "all",
                    "query": `"${inputVal}"`
                    
                })
                
                // console.log(resp.data.body)

                setState({
                    searchResult : resp.data.body,
                    ...state
                })

                console.log('state searchResult =========================')
                console.log(state.searchResult)

            }catch(e){

                console.log(e)

            }finally{

                setState({
                    ...state,
                    loading : false  
                })

            }

        }

            if(inputVal){
                reponse()
            }


    },[inputVal, state])

    return state
}


export const useSearch1 = (val, defaultVal) => {

    const [data, setData] = useState(defaultVal)


    const reponse = async () => {

        try{

            const resp = await axios.post('https://ds365api.search365.ai/search', {

                "filterData": "",
                "page": "",
                "pageSize": "10",
                "sort": "modified",
                "didYouMean": "",
                "advancedQuery": "",
                "profile": "all",
                "query": `"${val}"`
                
            })
            
            console.log(resp)

            setData({
                isLoading : false,
                resp
            })

            

        }catch(e){

            console.log(e)

        }
        // finally{

        //     // setState({
        //     //     ...state,
        //     //     loading : false  
        //     // })

        // }

    }

    
    useEffect(()=>{

            if(val){
                reponse()
            }


    },[val])

    return data
}