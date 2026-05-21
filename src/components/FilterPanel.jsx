// src/components/FilterPanel.jsx
import { useState, useEffect } from 'react';

export const FilterPanel = ({ isOpen, onClose, filterState, onApply, onReset, artistsList, locationsList }) => {
    const [artists, setArtists] = useState(filterState.artists);
    const [locations, setLocations] = useState(filterState.locations);
    const [yearFrom, setYearFrom] = useState(filterState.yearFrom);
    const [yearTo, setYearTo] = useState(filterState.yearTo);
    const [artistSearch, setArtistSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [openSections, setOpenSections] = useState({
        artist: true,
        location: true,
        years: true
    });

    useEffect(() => {
        if (isOpen) {
            setArtists(filterState.artists);
            setLocations(filterState.locations);
            setYearFrom(filterState.yearFrom);
            setYearTo(filterState.yearTo);
        }
    }, [isOpen, filterState]);

    const filteredArtists = artistsList.filter(a => 
        a.toLowerCase().includes(artistSearch.toLowerCase())
    );
    
    const filteredLocations = locationsList.filter(l => 
        l.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const addArtist = (artist) => {
        if (!artists.includes(artist)) {
            setArtists([...artists, artist]);
        }
        setArtistSearch('');
    };

    const removeArtist = (artist) => {
        setArtists(artists.filter(a => a !== artist));
    };

    const addLocation = (location) => {
        if (!locations.includes(location)) {
            setLocations([...locations, location]);
        }
        setLocationSearch('');
    };

    const removeLocation = (location) => {
        setLocations(locations.filter(l => l !== location));
    };

    const handleApply = () => {
        onApply({ artists, locations, yearFrom, yearTo });
    };

    const handleReset = () => {
        setArtists([]);
        setLocations([]);
        setYearFrom(1400);
        setYearTo(2030);
        onReset();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="filter-overlay active" onClick={onClose}></div>
            <div className="filter-panel open">
                <div className="filter-content">
                    <div className="filter-section">
                        <div className="filter-section-header" onClick={() => toggleSection('artist')}>
                            <span className="filter-section-title">Artist</span>
                            <div className="toggle-icon">
                                <svg viewBox="0 0 24 24">
                                    {openSections.artist ? (
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    ) : (
                                        <>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                        </>
                                    )}
                                </svg>
                            </div>
                        </div>
                        {openSections.artist && (
                            <div className="filter-section-content">
                                <div className="search-select">
                                    <input 
                                        type="text" 
                                        placeholder="Search artist..." 
                                        value={artistSearch}
                                        onChange={(e) => setArtistSearch(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && artistSearch && filteredArtists[0]) {
                                                addArtist(filteredArtists[0]);
                                            }
                                        }}
                                    />
                                    {artistSearch && filteredArtists.length > 0 && (
                                        <div className="options-dropdown show">
                                            {filteredArtists.map(artist => (
                                                <div key={artist} className="option-item" onClick={() => addArtist(artist)}>
                                                    {artist}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="selected-items">
                                    {artists.map(artist => (
                                        <div key={artist} className="selected-tag">
                                            {artist}
                                            <button onClick={() => removeArtist(artist)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-section-header" onClick={() => toggleSection('location')}>
                            <span className="filter-section-title">Location</span>
                            <div className="toggle-icon">
                                <svg viewBox="0 0 24 24">
                                    {openSections.location ? (
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    ) : (
                                        <>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                        </>
                                    )}
                                </svg>
                            </div>
                        </div>
                        {openSections.location && (
                            <div className="filter-section-content">
                                <div className="search-select">
                                    <input 
                                        type="text" 
                                        placeholder="Search location..." 
                                        value={locationSearch}
                                        onChange={(e) => setLocationSearch(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && locationSearch && filteredLocations[0]) {
                                                addLocation(filteredLocations[0]);
                                            }
                                        }}
                                    />
                                    {locationSearch && filteredLocations.length > 0 && (
                                        <div className="options-dropdown show">
                                            {filteredLocations.map(location => (
                                                <div key={location} className="option-item" onClick={() => addLocation(location)}>
                                                    {location}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="selected-items">
                                    {locations.map(location => (
                                        <div key={location} className="selected-tag">
                                            {location}
                                            <button onClick={() => removeLocation(location)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-section-header" onClick={() => toggleSection('years')}>
                            <span className="filter-section-title">Years</span>
                            <div className="toggle-icon">
                                <svg viewBox="0 0 24 24">
                                    {openSections.years ? (
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    ) : (
                                        <>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                        </>
                                    )}
                                </svg>
                            </div>
                        </div>
                        {openSections.years && (
                            <div className="filter-section-content">
                                <div className="year-range">
                                    <div className="year-input">
                                        <label>From</label>
                                        <input 
                                            type="number" 
                                            value={yearFrom}
                                            onChange={(e) => setYearFrom(parseInt(e.target.value) || 1400)}
                                            placeholder="1400"
                                        />
                                    </div>
                                    <div className="year-separator">—</div>
                                    <div className="year-input">
                                        <label>To</label>
                                        <input 
                                            type="number" 
                                            value={yearTo}
                                            onChange={(e) => setYearTo(parseInt(e.target.value) || 2030)}
                                            placeholder="2030"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="filter-footer">
                    <button className="show-btn" onClick={handleApply}>Show the results</button>
                    <button className="clear-btn" onClick={handleReset}>Clear</button>
                </div>
            </div>
        </>
    );
};