import React from 'react'

function ConfirmModal(props) {
  return (
    <div className='confirm-modal'>
      <h3 className='text-center'>{props.heading}</h3>
      {props.description}
        <div className="text-center">
          <button className="btn btn-secondary" onClick={() => props.closeModal()}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={(e) => props.deleteCourse(props.courseId)}>Delete</button>
        </div>
    </div>
  )
}

export default ConfirmModal

