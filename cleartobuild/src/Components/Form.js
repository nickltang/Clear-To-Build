import { useState } from 'react'
import FileUpload from './FileUpload'
import Table from './Table'
import Button from './Button'

const Form = () => {
    const [topLevelAssy, setTopLevelAssy] = useState("")
    const [desiredQty, setDesiredQty] = useState("")
    const [productID, setProductID] = useState("Upload file to display product ID")
    const [orderList, setOrderList] = useState([])
    const [tableAvailable, setTableAvailable] = useState(false)
    const [warning, setWarning] = useState('')


    const handleTopLevelAssyInputChange = (event) => {
        setTopLevelAssy(event.target.value)
    }


    const handleDesiredQtyInputChange = (event) => {
        setDesiredQty(event.target.value)
    }


    // Passed as a prop into File Upload
    // Updates product ID after calling the Import File endpoint 
    const importFileCallback = (data) => {
        setProductID(data)
    }


    // Passed as a prop into File Upload
    // Updates order list after calling the Run Order List endpoint 
    const runOrderListCallback = (data) => {
        setOrderList(data)
    }


    // Passed as a prop into Button
    // Updates order list and 
    const buttonCallback = (list) => {
        setOrderList(list)
        if(topLevelAssy !== '' && desiredQty !== '' && productID !== "Upload file to display product ID"){
            setTableAvailable(true)
        } else
            setWarning('Please complete the form before submitting.')
    }
    

    return (
        <div className="container">
             <form>
                <label>Upload your BOM</label>
                <FileUpload 
                    importFileCallback={importFileCallback} 
                    runOrderListCallback={runOrderListCallback} 
                    productID={productID}/>

                <label>Product ID</label>
                <label id="pid-label">{productID}</label>

                <label>Top Level Assembly</label>
                <input
                    onChange={handleTopLevelAssyInputChange}
                    value={topLevelAssy}
                    name='topLevelAssy'
                    />
            
                <label>Desired Quantity</label>
                <input
                    onChange={handleDesiredQtyInputChange}
                    value={desiredQty}
                    name='desiredQty'/>
            </form>
            <p>Product ID: {productID}<br/>Top Level Assy: {topLevelAssy}<br/>DesiredQty: {desiredQty}</p>

            <p id="warning">{warning}</p>

            <Button productID={productID} buttonCallback={buttonCallback} topLevelAssy={topLevelAssy}>Clear To Build</Button>

            {tableAvailable ? <Table orderList={orderList} desiredQty={desiredQty} topLevelAssy={topLevelAssy}/> : ''}
        </div>
    )
}

export default Form