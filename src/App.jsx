// src/App.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Gallery } from './components/Gallery';
import { Pagination } from './components/Pagination';
import { Toast } from './components/Toast';
import { FilterPanel } from './components/FilterPanel';
import { fetchArtworks, getAllArtists, getAllLocations } from './data/artworks';
import './styles/globals.css';

function App() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', visible: false });
    const [activeCardId, setActiveCardId] = useState(null);
    const [filterState, setFilterState] = useState({
        artists: [],
        locations: [],
        yearFrom: 1400,
        yearTo: 2030
    });
    const [allArtistsList, setAllArtistsList] = useState([]);
    const [allLocationsList, setAllLocationsList] = useState([]);

    const itemsPerPage = 6;

    useEffect(() => {
        const loadArtworks = async () => {
            setLoading(true);
            const data = await fetchArtworks();
            setArtworks(data);
            setAllArtistsList(getAllArtists(data));
            setAllLocationsList(getAllLocations(data));
            setLoading(false);
        };
        
        loadArtworks();
    }, []);

    const filteredArtworks = useMemo(() => {
        if (artworks.length === 0) return [];
        
        let result = [...artworks];
        
        if (searchTerm) {
            result = result.filter(art => 
                art.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (filterState.artists.length > 0) {
            result = result.filter(art => filterState.artists.includes(art.artist));
        }
        
        if (filterState.locations.length > 0) {
            result = result.filter(art => filterState.locations.includes(art.location));
        }
        
        result = result.filter(art => 
            art.date >= filterState.yearFrom && art.date <= filterState.yearTo
        );
        
        return result;
    }, [artworks, searchTerm, filterState]);

    const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
    const paginatedArtworks = filteredArtworks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        document.querySelector('.gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const showToast = (message) => {
        setToast({ message, visible: true });
    };

    const handleFilterApply = useCallback((newFilterState) => {
        setFilterState(newFilterState);
        setCurrentPage(1);
        setIsFilterOpen(false);
        
        let count = [...artworks];
        if (newFilterState.artists.length > 0) {
            count = count.filter(art => newFilterState.artists.includes(art.artist));
        }
        if (newFilterState.locations.length > 0) {
            count = count.filter(art => newFilterState.locations.includes(art.location));
        }
        count = count.filter(art => 
            art.date >= newFilterState.yearFrom && art.date <= newFilterState.yearTo
        );
        
        showToast(`Found ${count.length} artworks`);
    }, [artworks]);

    const handleFilterReset = useCallback(() => {
        const newFilterState = {
            artists: [],
            locations: [],
            yearFrom: 1400,
            yearTo: 2030
        };
        setFilterState(newFilterState);
        setCurrentPage(1);
        showToast('All filters cleared');
    }, []);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="container">
                    <div className="loading">Loading artworks...</div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />
            
            <main className="container">
                <SearchBar 
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onFilterClick={() => setIsFilterOpen(true)}
                />
                
                <Gallery 
                    artworks={paginatedArtworks}
                    activeCardId={activeCardId}
                    onActivateCard={setActiveCardId}
                />
                
                {totalPages > 1 && (
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </main>
            
            <FilterPanel 
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filterState={filterState}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
                artistsList={allArtistsList}
                locationsList={allLocationsList}
            />
            
            {/* <Toast 
                message={toast.message}
                isVisible={toast.visible}
                onHide={() => setToast(prev => ({ ...prev, visible: false }))}
            /> */}
        </>
    );
}

export default App;