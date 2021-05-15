import { useState } from 'react';

const CLOUD_URL = 'https://api.cloudinary.com/v1_1/dy33ewvp2'

const ImageUploader = (props) => {
    const [avURL, setAvUrl] = useState('#')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:3000/u/cloudsign', {
            method: 'GET',
            headers: {
                'Authorization': props.sessionToken
            }
        })

        const { sig, ts } = await response.json()

        const file = document.getElementById('file-input').files[0]
        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'cloudinary-mayhem')
        formData.append('api_key', '287286319825983')
        formData.append('signature', sig)
        formData.append('timestamp', ts)

        const results = await (await fetch(CLOUD_URL, {
            method: 'POST',
            body: formData
        })).json()

        console.log(results)
    }

    return (
        <div>
            <form enType='multiplart/form-date' onSubmit={handleSubmit}>
                <input id='file-input' type='file' />
                <button>Upload Image</button>
            </form>
            <img src={avUrl} alt='avatar' />
        </div>
    )
}

export default ImageUploader;
