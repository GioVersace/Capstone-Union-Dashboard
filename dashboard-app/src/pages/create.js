import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"
import Dropdown from "../components/dropDownBox"
import { getCurrentDate } from "../components/currentDate"
import CheckBox from '../components/CheckBox';

const Create = () => {
  const navigate = useNavigate()// used to reroute the user to another page

  /* Variables for db row */
  const [expenses, setExpenses] = useState('')
  const [subExpense, setSubExpense] = useState('')
  const [projAmnt, setProjAmnt] = useState('0.0')
  const [amntSpent, setAmntSpent] = useState('0.0')
  const [date, setDate] = useState(getCurrentDate("/"))
  const [transDate, setTransDate] = useState('')
  const [refCode, setRefCode] = useState('02.06140.xxxx.00000.000000.xxxxx.00000')// size 39
  const [recCollected, setRecCollected] = useState('')
  const [cardUsed, setCardUsed] = useState('')
  const [formError, setFormError] = useState('')
  const [isLocal, setIsLocal] = useState('')
  const [isBlackOwned, setIsBlackOwned] = useState('')
  const [isWomanOwned, setIsWomanOwned] = useState('')

  /* Values to be used for dropdown box */
  const options = [
    {value: "OneCard", label:"OneCard"},
    {value: "Journal Entry", label:"Journal Entry"},
    {value: "Check", label:"Check"},
    {value: "Other", label:"Other"},
  ];


/* Method to handle how the form deals with submits and errors that could occur */
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(isLocal)
    console.log(isWomanOwned)
    console.log(isBlackOwned)

    // if there is a piece of information that is missing it wont send it to the db to be added
    if(!projAmnt || !refCode || !recCollected || !cardUsed || !transDate){
      setFormError('Please fill in all fields correctly')
      return
    }

    if( isBlackOwned === "") setIsBlackOwned(false)// catches if the user does not intially interact with the checkboxes
    if( isWomanOwned === "") setIsWomanOwned(false)
    if( isLocal === '') setIsLocal(false)

    if( refCode.substring(9,13).includes("x") || refCode.substring(27,32).includes("x") )
    {
      setFormError("Please fix the Account Number Field. REMEMBER: only fill in the areas labeled with x's")
      return
    }
    
    const { data, error } = await supabase// connect to the db and send the data
      .from('example_data')
      .insert([{ expenses, subExpense, projAmnt, amntSpent, date, transDate, refCode, recCollected, cardUsed, isLocal, isBlackOwned, isWomanOwned }])
      .select()

    if(error){
      console.log(error)
      setFormError('Please fill in all fields correctly')
    }

    if(data){// sends the data to the db and should reroute the user to the home page
      console.log(data)
      setFormError(null)
      navigate('/')
    }
    //console.log(expenses, projAmnt, amntSpent, date, refCode, recCollected, cardUsed)

  }


  // god awful code but idk how to fix it so were gonna ride with it until we can figure something else out
  const autoFillExpenses = (number) =>{
    if( number < 4100 || number > 8500 ) return // error for ref code

    else if ( number >= 4100 && number < 4200 ){
      setExpenses("Fees")
      return
    }

    else if ( number >= 4400 && number < 4500 ){
      setExpenses("Gifts")
      return
    }

    else if ( number >= 4500 && number < 4600 ){
      setExpenses("Sales & Services of Education Departments")
      return
    }

    else if ( number === 4910 ){
      setExpenses("Other Revenues")
      return
    }

    else if ( number >= 6000 && number < 6100 ){
      setExpenses("Supplies and Office Furniture")
      return
    }

    else if ( number >= 6100 && number < 6200 ){
      setExpenses("Fixed Assets")
      return
    }

    else if ( number >= 6200 && number < 6300 ){
      setExpenses("Equipment Rental")
      return
    }

    else if ( number >= 6300 && number < 6400 ){
      setExpenses("Travel and Business")
      return
    }

    else if ( number >= 6400 && number < 6500 ){
      setExpenses("Professional Services & Consulting")
      return
    }

    else if ( number >= 6600 && number < 6700 ){
      setExpenses("Telecommunications")
      return
    }

    else if ( number >= 6700 && number < 6800 ){
      setExpenses("Mail & Postage")
      return
    }

    else if ( number >= 6800 && number < 6900 ){
      setExpenses("Printing & Publications")
      return
    }

    else if ( number >= 6900 && number < 7000 ){
      setExpenses("Dues, Memberships & Publications")
      return
    }

    else if ( number >= 7100 && number < 7200 ){
      setExpenses("Repairs, Maintenance & Other Facuilties Costs")
      return
    }

    else if ( number >= 7200 && number < 7400 ){
      setExpenses("Moving & Relocation")
      return
    }

    else if ( number >= 7400 && number < 7500 ){
      setExpenses("Purchases for Resale")
      return
    }

    else if ( number >= 7600 && number < 7700 ){
      setExpenses("Financial Aid")
      return
    }

    else if ( number === 7715 ){
      setExpenses("Insurance")
      return
    }

    else if ( number === 8010 ){
      setExpenses("Financial Charges")
      return
    }

    else if ( number >= 8100 && number < 8200 ){
      setExpenses("Miscellaneous")
      return
    }

    else if ( number === 8260 ){
      setExpenses("Transfers")
      return
    }

    else if ( number === 8320 ){
      setExpenses("Distributed Expenses")
      return
    }

    else if ( number === 8400 ){
      setExpenses("Interdepartmental Cost Recovery")
      return
    }

    else if ( number === 8500 ){
      setExpenses("Computing Charges")
      return
    }
  }

    return (
      <div className="page create">
        <form onSubmit={handleSubmit}> {/* Form that uses the function above to handle the submit */}

        {/* Each of the labels handles an individual column in the db */}
        <label htmlFor="refCode">Account Number (fill in x's with relevent codes):</label>
        <input 
          type="text"
          id="refCode"
          value={refCode}
          onChange={(e) => {
            setRefCode(e.target.value)
            autoFillExpenses( Number(refCode.substring(9,13)) )
          }}
          required
        />

        <label htmlFor="expenses">Expense:</label>
        <input 
          type="text" 
          placeholder="Enter Expense..."
          id="expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          required
        />

        <label htmlFor="subExpense">Specify Expense:</label>
        <input 
          type="text" 
          placeholder="Specify Expense..."
          id="subExpense"
          value={subExpense}
          onChange={(e) => setSubExpense(e.target.value)}
          required
        />


        <label htmlFor="projAmnt">Projected Amount:</label>
        <input
          type="number"
          id="projAmnt"
          value={projAmnt}
          onChange={(e) => setProjAmnt(Math.round(e.target.value * 100) / 100)}// for rounding purposes 
          required
        />

        <label htmlFor="amntSpent'">Amount Spent:</label>
        <input 
          type="number"
          id="amntSpent"
          value={amntSpent}
          onChange={(e) => setAmntSpent(Math.round(e.target.value * 100) / 100)}// for rounding purposes 
        />

        <label htmlFor="date'">Entry Date:</label>
        <input 
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="date'">Transaction Date (MM/DD/YYYY):</label>
        <input 
          type="text"
          id="transaction"
          value={transDate}
          onChange={(e) => setTransDate(e.target.value)}
        />

        <label htmlFor="recCollected'">Receipt Collected:</label>
        <input 
          type="text"
          id="recCollected"
          value={recCollected}
          onChange={(e) => setRecCollected(e.target.value)}
        />

        <label htmlFor="cardUsed'">Payment Type:</label>
        <Dropdown placeHolder="Select..." options={options} onChange={(value) => setCardUsed(value)} 
          required/>
        <br />

        <label>What Businesses are receiving this Funding? (Check all that apply):</label>
        <CheckBox label="Black Owned Businesses" checked={false} onChange={(value) => setIsBlackOwned(value)}/>
        <CheckBox label="Woman Owned Businesses" checked={false} onChange={(value) => setIsWomanOwned(value)}/> {/* I literally have no idea why value is the opposite of what it needs to be but whatever*/}
        <CheckBox label="Locally Sourced" checked={false} onChange={(value) => setIsLocal(value)}/>
        <br />

        <button>Create New Entry</button>

        {formError && <p className="error">{formError}</p>}
      </form>
      </div>
    )
  }
  
  export default Create