'use client'
import React, {useState} from 'react'
import {FiX, FiLock, } from "react-icons/fi"
import Image from 'next/image'



const UploadCard = ({file, setFiles, index, setIsEdit}) => {
    const [loading, setLoading] = useState(false);


    const validate = ({ title, tags }) => {
      const errors = {};
  
      if(title.length > 100){
        errors.title = 'title is too long'
      }else{
        errors.title = ''
      }
  
      if(tags.length > 5){
        errors.tags = 'tags is too long'
      }else{
        errors.tags = ''
      }
      
      return errors?.title || errors?.tags ? 'error' : 'success';
    }
  
    const handleChangeTitle = (e) => {
      const { value } = e.target;
      
      const newFile = {
        ...file,
        title: value,
        status: validate({title: value, tags: file?.tags})
      }
  
      setFiles(files => files.map((item, i) => i === index ? newFile : item))
    }
  
    const handleInputTags = (e) => {
      if(e.key === 'Enter' || e.key === ','){
        let tag = e.target.value.trim().replaceAll(/\s+/g, ' ').replaceAll(',', '');
  
        if(tag.length > 1 && !file?.tags?.includes(tag)){
          const newFile = {
            ...file,
            tags: [...file.tags, tag],
            status: validate({title: file.title, tags: [...file.tags, tag]})
          }
  
          setFiles(files => files.map((item, i) => i === index ? newFile : item))
        }
  
        e.target.value = '';
      }
    }
  
  
    const handleRemoveTag = (tag) => {
      const newTags = file.tags.filter(t => t !== tag);
  
      const newFile = {
        ...file,
        tags: newTags,
        status: validate({title: file.title, tags: newTags})
      }
  
      setFiles(files => files.map((item, i) => i === index ? newFile : item))
    }
  
    const handleChangePublic = () => {
      setFiles(files => files.map((item, i) => 
        i === index ? {...file, public: !file.public} : item
      ))
    }
  
    const handleRemoveFile = () => {
      if(setIsEdit)
        return setIsEdit(false);
  
      setFiles(files => files.filter((_, i) => i !== index))
    }
  
    const handleUpdatePhoto = async () => {
      if(loading || file?.status === 'error') return;
  
      setLoading(true)
      const res = await updatePhoto(file);
      setLoading(false)
  
      if(res?.errMsg)
        toast.error(res.errMsg);
  
      setIsEdit(false);
    }

    return (
        <div className={`upload_card ${file?.status} bg-white border border-gray-200 rounded-md p-4 shadow-md mb-4 relative`}>
        <Image
      src={file?.imgUrl}
      alt={file?.title}
      width={280}
      height={280}
      title={file?.title}
    />
     {file?.errMsg ? (
      <div className='text-center'>
        <h4>{file?.status}</h4>
        <span>{file?.errMsg}</span>
      </div>
    ) : (
      <div>
        <div className='mt-4' title={`${file?.title?.length} / 100`}>
          <input
            type='text'
            autoComplete='off'
            placeholder='Add A Title'
            defaultValue={file?.title}
            onChange={handleChangeTitle} 
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>
        <div className='flex mt-4' title={`${file?.tags?.length} / 5`}>
          {file?.tags?.map((tag) => (
            <div className='flex items-center bg-gray-200 rounded-md mr-2 mb-2 p-2' key={tag}>
              <span>{tag}</span>
              <FiX className='ml-2 cursor-pointer' onClick={() => handleRemoveTag(tag)} />
            </div>
          ))}
          <input type='text' autoComplete='off' onKeyUp={handleInputTags} className='flex-1 p-2 border border-gray-300 rounded-md' />
        </div>
        <label className='flex items-center mt-4'>
          <input type='checkbox' checked={file?.public} onChange={handleChangePublic} className='mr-2 cursor-pointer' />
          <span>Make Public</span>
          <FiLock className='ml-2' />
        </label>
      </div>
    )}

    <button 
    onClick={handleRemoveFile}
    className='absolute top-2 right-2 bg-crimson text-red-300 w-6 h-6 rounded-full'>
      <FiX className='text-xl' />
    </button>
    {setIsEdit ? (
      <button
        className='up_c_btn_update bg-blue-500 text-white px-4 py-2 rounded-md mt-2'
        onClick={handleUpdatePhoto}
        disabled={loading || file?.status === 'error'}
      >
        {loading ? 'Loading...' : 'Update a Photo'}
      </button>
    ) : null}

    </div>
  )
}

export default UploadCard