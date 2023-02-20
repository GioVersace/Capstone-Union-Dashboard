import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

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
    
    const { data, error } = await supabase
      .from('example_data')
      .insert([{ expenses, projAmnt, amntSpent, date, refCode, recCollected, cardUsed }])

    if(error){
      console.log(error)
      setFormError('Please fill in all fields correctly')
    }

    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')
    }
    //console.log(expenses, projAmnt, amntSpent, date, refCode, recCollected, cardUsed)

  }

    return (
      <div className="page create">
        <form onSubmit={handleSubmit}>
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

        <button>Create New Entry</button>

        {formError && <p className="error">{formError}</p>}
      </form>
      </div>
    )
  }
  
  export default Create