import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  /* Variables for db row */
  const [expenses, setExpenses] = useState('')
  const [projAmnt, setProjAmnt] = useState('')
  const [amntSpent, setAmntSpent] = useState('')
  const [date, setDate] = useState('')
  const [refCode, setRefCode] = useState('')
  const [recCollected, setRecCollected] = useState('')
  const [cardUsed, setCardUsed] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!expenses || !projAmnt || !amntSpent || !date || !refCode || !recCollected || !cardUsed){
      setFormError('Please fill in all fields correctly')
      return
    }

    const { data,error } = await supabase
      .from("example_data")
      //updates each piece of the array
      .update({ expenses, projAmnt, amntSpent, date, refCode, recCollected, cardUsed })
      .eq( 'id',id )// used to find the specific id that we are deleting from the table
      .select() //IMPORTANT NOTE: WE ARE USING SUPABASE V2 SO WE MUST USE SELECT TO ACTUALLY HAVE THINGS HAPPEN WHEN WE GET THE DATA

    if( error ){
      console.log(error)
      setFormError('Please fill in all fields correctly')
    }
    if( data ){
      setFormError(null)
      navigate('/')// sends the user back to the home page
    }

  }
  
  useEffect(() => {
    const fetchExample = async () =>{ // retreieves one row of data from the db with the correct Id
      const { data,error } = await supabase
        .from("example_data")
        .select()
        .eq( 'id',id )// finds the correct ID we are looking
        .single()// changes it from an array of data to a single piece of data we can use

      if( error ){
        navigate('/', { replace: true })
      }
      if( data ){// here we use the single piece of data to access different traits
        setExpenses(data.expenses)
        setProjAmnt(data.projAmnt)
        setAmntSpent(data.amntSpent)
        setDate(data.date)
        setRefCode(data.refCode)
        setRecCollected(data.recCollected)
        setCardUsed(data.cardUsed)

        console.log(data)
      }

    }

    fetchExample()
  }, [id, navigate])// have to send ID and navigate depenencies to the method to use


    return (
      <div className="page update">
        <form onSubmit={handleSubmit} > {/* Form that uses the function above to handle the submit */}

          {/* Each of the labels handles an individual column in the db */}

          <label htmlFor="expenses">Expense:</label>
          <input 
            type="text" 
            id="expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />


          <label htmlFor="projAmnt">Projected Amount:</label>
          <input
            type="number"
            id="projAmnt"
            value={projAmnt}
            onChange={(e) => setProjAmnt(e.target.value)}
          />

          <label htmlFor="amntSpent'">Amount Spent:</label>
          <input 
            type="number"
            id="amntSpent"
            value={amntSpent}
            onChange={(e) => setAmntSpent(e.target.value)}
          />

          <label htmlFor="date'">Today's Date:</label>
          <input 
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="refCode">Reference Code:</label>
          <input 
            type="text"
            id="refCode"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
          />

          <label htmlFor="recCollected'">Receipt Collected:</label>
          <input 
            type="text"
            id="recCollected"
            value={recCollected}
            onChange={(e) => setRecCollected(e.target.value)}
          />

          <label htmlFor="cardUsed'">Card Used:</label>
          <input 
            type="text"
            id="cardUsed"
            value={cardUsed}
            onChange={(e) => setCardUsed(e.target.value)}
          />

          <button>Update Current Entry</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    )
}
  
  export default Update