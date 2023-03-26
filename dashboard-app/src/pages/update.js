import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import Dropdown from "../components/dropDownBox"
import { getCurrentDate } from "../components/currentDate"
import CheckBox from '../components/CheckBox';

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  /* Variables for db row */
  const [expenses, setExpenses] = useState('')
  const [projAmnt, setProjAmnt] = useState('0.0')
  const [amntSpent, setAmntSpent] = useState('0.0')
  const [date, setDate] = useState()
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

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!expenses || !projAmnt || !amntSpent || !date || !transDate || !refCode || !recCollected || !cardUsed){
      setFormError('Please fill in all fields correctly')
      return
    }

    const { data,error } = await supabase
      .from("example_data")
      //updates each piece of the array
      .update({ expenses, projAmnt, amntSpent, date, transDate, refCode, recCollected, cardUsed, isLocal, isBlackOwned, isWomanOwned })
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
        setIsLocal(data.isLocal)
        setIsBlackOwned(data.isBlackOwned)
        setIsWomanOwned(data.isWomanOwned)

        console.log(data)
      }

    }

    fetchExample()
  }, [id, navigate])// have to send ID and navigate depenencies to the method to use

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

          <label htmlFor="date'">Entry Date:</label>
          <input 
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="date'">Transaction Date (MM/DD/YYYY):</label>
          <input 
            type="text"
            id="transaction"
            value={transDate}
            onChange={(e) => setTransDate(e.target.value)}
          />

          <label htmlFor="refCode">Account Number (fill in x's with relevent codes):</label>
          <input 
            type="text"
            id="refCode"
            value={refCode}
            onChange={(e) => {
              setRefCode(e.target.value)
              autoFillExpenses( Number(refCode.substring(9,13)) )
              console.log(Number(refCode.substring(9,13)))
            }}
          />

          <label htmlFor="recCollected'">Receipt Collected:</label>
          <input 
            type="text"
            id="recCollected"
            value={recCollected}
            onChange={(e) => setRecCollected(e.target.value)}
          />

          <label htmlFor="cardUsed'">Payment Type:</label>
          <Dropdown placeHolder="Select..." options={options} onChange={(value) => setCardUsed(value)}/>
          <br />

          <label>What Businesses are receiveing this Funding? (Check all that apply):</label>
          <CheckBox label="Black Owned Businesses" checked={isBlackOwned} onChange={(value) => setIsBlackOwned(value)}/>
          <CheckBox label="Woman Owned Businesses" checked={isWomanOwned} onChange={(value) => setIsWomanOwned(value)}/>
          <CheckBox label="Locally Sourced" checked={isLocal} onChange={(value) => setIsLocal(value)}/>
          <br />

          <button>Update Current Entry</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    )
}
  
  export default Update