import "../../../css/popupModal.css";

export const PopupModal = ({ show, onClose, children }) => {
    return (
        <div className={`modal-mask ${show ? "visible" : "hidden"}`} onClick={onClose}>
            <div className="modal-wrapper">
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};
