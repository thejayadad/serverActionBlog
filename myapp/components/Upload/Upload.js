'use client'
import React, {useState } from 'react'
import UploadForm from '../Forms/UploadForm'
import UploadCard from '../Card/UploadCard'

const Upload = () => {
    const [files, setFiles] = useState([])
  return (
    <div>
        <UploadForm setFiles={setFiles} />
        <div className='flex gap-4'>
            {
                files.map((file, index) => (
                    <UploadCard
                    key={index}
                    file={file}
                    setFiles={setFiles}
                    index={index}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Upload