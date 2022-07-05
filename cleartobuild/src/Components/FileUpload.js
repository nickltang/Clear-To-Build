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

        // Import File and Run Order List
            // TO DO: Run Order List returns empty response (problem with product_uid?)
        axios.post('https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/ImportFile', formData, headers)
        .then((response) => {
            console.log('Import File Response: ', response)
            pid = response.data
            importFileCallback(pid)
        }, (error) => {
            console.log(error)
        }).then(
            axios.post('https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunOrderList', { 'product_uid': "310-000206" })
            .then((response) => {
                console.log('pid: ', pid)
                console.log('Run Order List Response: ', response)
                let resData = response.data
                runOrderListCallback(resData)
            }, (error) => {
                console.log(error)
            }))
    }

    return (
        <div>
            <input type='file' onChange={handleFileChange}/>
        </div>
    )
}

export default FileUpload