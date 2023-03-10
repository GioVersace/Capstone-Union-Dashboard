//import { format } from 'date-fns'
import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

// have to accept the props in the arguments part of the const
const exampleCard = ({ example, onDelete }) => {
    const handleDelete = async () => {// function that handles the deletion of a row in the db
        const { data,error } = await supabase
            .from('example_data')
            .delete()
            .eq('id', example.id) // used to find the specific id that we are deleting from the table
            .select()  //IMPORTANT NOTE: WE ARE USING SUPABASE V2 SO WE MUST USE SELECT TO ACTUALLY HAVE THINGS HAPPEN WHEN WE GET THE DATA

        if( error ){
            console.log(error)
        }
        if( data ){
            console.log(data)
            onDelete(example.id)// sent to the home.js page to deal with updating local storage
        }
    }



    return (
        <div className="example-card">
            {/* Each of the p's below handles an individual column in the db */}

            <h3>Expenses: { example.expenses }</h3>
            <p>Projected Amount: { example.projAmnt }</p>
            <p>Amount Spent: { example.amntSpent }</p>
            <p>Date: { example.date }</p>
            <p>Receipt Collected: { example.recCollected }</p>
            <p>Payment Type: { example.cardUsed }</p>
            <p>Account Number: { example.refCode }</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <Link to={'/' + example.id}>
                    Click Here To Update               
                </Link>
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
                Delete Entry
            </button>
            <br />

        </div>

    )
}


export default exampleCard