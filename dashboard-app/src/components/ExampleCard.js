//import { format } from 'date-fns'

const exampleCard = ({ example }) => {
    return (
        <div className="example-card">
            <h3>Expenses: { example.expenses }</h3>
            <p>Projected Amount: { example.projAmnt }</p>
            <p>Amount Spent: { example.amntSpent }</p>
            <p>Date: { example.date }</p>
            <p>Receipt Collected: { example.recCollected }</p>
            <p>Card Used: { example.cardUsed }</p>
            <br />

        </div>

    )
}


export default exampleCard