import { useState } from 'react'
import FileUpload from './FileUpload'
import Table from './Table'

const Form = () => {
    const [topLevelAssy, setTopLevelAssy] = useState("")
    const [desiredQty, setDesiredQty] = useState("")
    const [productID, setProductID] = useState("Upload file to display product ID")
    const [orderList, setOrderList] = useState([])
    const [tableAvailable, setTableAvailable] = useState(false)

    // TO DO: New value is one character behind
    const handleTopLevelAssyInputChange = (event) => {
        setTopLevelAssy(event.target.value)
        console.log('New topLevelAssy: ' + topLevelAssy)
    }

    // TO DO: New value is one character behind
    const handleDesiredQtyInputChange = (event) => {
        setDesiredQty(event.target.value)
        console.log('New desiredQty: ' + desiredQty)
    }


    // Updates product ID after calling the Import File endpoint 
        // TO DO: setProductID doesn't actually set the productID to data
    const importFileCallback = (data) => {
        console.log('IF callback productID: ', data)
        setProductID(data)
        console.log('IF callback productID after: ', productID)
    }


    // Updates order list after calling the Run Order List endpoint 
        // TO DO: setOrderList doesn't actually set the orderList to data
    const runOrderListCallback = (data) => {
        console.log('ROL callback order list: ', data)
        setOrderList(data)
        console.log('ROL order list after: ', orderList)
    }


    // On clicking Clear To Build, filter the order list for descendants of top level assembly and display table
    const onClick = (event) => {
        const filteredList = orderList.filter((list) => {
            console.log('Filter by Top Level Assy: ', topLevelAssy)
            return list.GrandParent_BOM_pn === topLevelAssy
        })

        setOrderList(filteredList)
        console.log('CTB order list: ', orderList)

        setTableAvailable(true)
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

            <button onClick={onClick}>Clear To Build</button>

            {tableAvailable ? <Table orderList={orderList} /> : ''}
        </div>
    )
}

export default Form