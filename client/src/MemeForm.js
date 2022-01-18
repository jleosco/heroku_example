import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from 'axios'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
function MemeForm() {
    const [files, setFiles] = useState([])
    const [title, setTitle] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let data = new FormData()
        data.append('file', files[0].file)
        data.append('title', title)
        try {
            let res =  await axios.post('/api/memes', data)
            console.log(res)
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <p>title</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                <button type='submit'>add</button>
            </form>
        </div>
    )
}
export default MemeForm