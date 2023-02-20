import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

import ExampleCard from "../components/ExampleCard";


const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [examples, setExamples] = useState(null);

    useEffect(() => {
      const fetchExamples = async () => {
        const { data,error } = await supabase// pulls from the database
        .from('example_data')
        .select()

        if (error){
          setFetchError('Could not retrieve data')
          setExamples(null)// if there is an error we do not want to display anything to the screen
          console.log(error)
        }

        if(data){
          setExamples(data);
          setFetchError(null);// resets the error to null if db retrieval is successful
        }
      }

      fetchExamples()

    }, [])

    return (
      <div className="page home">
        {fetchError && (<p>{fetchError}</p>)}
        {examples && (
          <div className="examples">
            <div className = "examples-grid">
              {/* order-by buttons */}
              {examples.map(examples => (
              <ExampleCard key={examples.id} example = {examples}/>
            ))}
            </div>



          </div>
        )}
      </div>
    )
  }
  
  export default Home