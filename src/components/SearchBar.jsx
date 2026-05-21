// src/components/SearchBar.jsx
export const SearchBar = ({ searchTerm, onSearchChange, onFilterClick }) => {
    return (
        <div className="actions-bar">
            <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Painting title"
                />
            </div>
            <button className="filter-btn" onClick={onFilterClick}>
                <svg viewBox="0 0 24 24">
                    <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3"/>
                </svg>
            </button>
        </div>
    );
};