import "./CustomButton.scss"

function CustomButton({ type = "button", className, loading = false, children }) {
    return (
        <>
            <button
                type={type}
                className={className}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Đang xử lý...
                    </>
                ) : (
                    children
                )}
            </button>
        </>
    )
}

export default CustomButton;