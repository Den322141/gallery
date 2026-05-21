
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;
        
        for (let i = 1; i <= Math.min(totalPages, maxVisible); i++) {
            pages.push(i);
        }
        
        if (totalPages > maxVisible) {
            pages.push('...', totalPages);
        }
        
        return pages;
    };

    return (
        <div className="pagination">
            <div 
                className={`nav-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
                <svg viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
            </div>
            <div className="pagination-controls">
                {getVisiblePages().map((page, idx) => (
                    page === '...' ? (
                        <span key={idx} style={{ color: 'var(--text-muted)', padding: '0 4px' }}>...</span>
                    ) : (
                        <button 
                            key={page}
                            className={`page-btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>
            <div 
                className={`nav-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            >
                <svg viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        </div>
    );
};