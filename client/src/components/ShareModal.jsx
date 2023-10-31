import React from 'react'

function ShareModal({ onClose }) {
    return (
        <div className="share-modal-backdrop" onClick={onClose}>
            <div className="share-modal-content" onClick={e => e.stopPropagation()}> 
                <button onClick={onClose}> Close </button>
                <p> Share via:</p>
                <a href="#" target="_blank" rel="noopener noreferrer" onClick={() => {
                    const url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href);
                    window.open(url, '_blank');
                }}>Facebook</a>
            </div>
        </div>
    )
}

export default ShareModal;
