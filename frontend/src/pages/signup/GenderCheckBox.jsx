import React from 'react'


function GenderCheckBox( {field} ) {

  return (
    <div className='flex'>
      <div className='form-control'>
        <label className='label gap-2 cursor-pointer'>
          <span className='label-text font-semibold'>Male</span>
          <input
            type="radio"
            value='Male'
            checked={field.value === 'Male'}
            onChange={field.onChange}
            className="radio  border-black"
          />
        </label>
      </div>
      <div className='form-control'>
        <label className='label gap-2 cursor-pointer'>
          <span className='label-text font-semibold'>Female</span>
          <input
            type="radio"
            value="Female"
            checked={field.value === 'Female'}
            onChange={field.onChange}
            className="radio border-black"
          />
        </label>
      </div>

    </div>
  )
}

export default GenderCheckBox
