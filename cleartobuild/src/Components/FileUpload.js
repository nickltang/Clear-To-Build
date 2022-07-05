import axios from 'axios'

const FileUpload = ({importFileCallback, runOrderListCallback}) => {

    // On file selection, make Import File and Run Order List POST requests
    const handleFileChange = (event) => {
        const formData = new FormData()
        formData.append('filepath', event.target.files[0])

        const headers = {
            'content-type': 'multipart/form-data'
        }


        let pid = ''
        const importFileEndpoint = 'https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/ImportFile'
        //const runOrderListEndpoint = 'https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunOrderList'

        // Import File, then Run Order List
            // TO DO: Run Order List returns empty response (problem with product_uid?)
        axios.post(importFileEndpoint, formData, headers)  // Import File
        .then((response) => {
            console.log(response)
            pid = response.data
            importFileCallback(pid)     // Update Parent Component
        }, (error) => {
            console.log(error)
        })

        /*
        .then(axios.post(runOrderListEndpoint, { 'product_uid': pid })  // Run Order List
            .then((response) => {
                console.log(response)
                runOrderListCallback(response.data)     // Update Parent Component
            }, (error) => {
                console.log(error)
            })) */
    }

    return (
        <div>
            <input type='file' onChange={handleFileChange}/>
        </div>
    )
}

export default FileUpload