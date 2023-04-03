export default function Modal({ id, title, body, action, actionLabel }) {
  return (
    <div className="modal" tabIndex="-1" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ title }</h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {body}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            {(action && actionLabel) ? (
            <button type="button" className="btn btn-primary"
              data-bs-dismiss="modal" onClick={action}>
              {actionLabel}
            </button>
            ) : null }
          </div>
        </div>
      </div>
    </div>
  )
}