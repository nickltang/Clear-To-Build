import axios from 'axios'

const Button = ({orderList, topLevelAssy, buttonCallback, productID}) => {
    const pid = { productID }
    const runOrderListEndpoint = 'https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunOrderList'

    const onClick = (event) => {
        let filteredList = []
        axios.post(runOrderListEndpoint, { 'product_uid': pid.productID })  // Run Order List
            .then((response) => {
                console.log(response)
               
                filteredList = Object.values(response.data).filter((entry) => {
                    // Entry is object {GranParent_BOM_pn : A, ...}
                    console.log('Current Grandparent: ', entry['GrandParent_BOM_pn'])
                    if(entry['GrandParent_BOM_pn'] === {topLevelAssy}.topLevelAssy)
                        return entry
                    //return entry['GrandParent_BOM_pn'] === {topLevelAssy}.topLevelAssy      // This line is stuck
                })
                console.log('Filtered List: ', filteredList)
                buttonCallback(filteredList)    
            })        
    }

    return (
        <button onClick={onClick}>Clear To Build</button>
    )
}

export default Button