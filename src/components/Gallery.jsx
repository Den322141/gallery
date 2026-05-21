import { ArtCard } from './ArtCard';

export const Gallery = ({ artworks, activeCardId, onActivateCard }) => {
    if (artworks.length === 0) {
        return <div className="no-results">No paintings found</div>;
    }

    return (
        <div className="gallery">
            {artworks.map(artwork => (
                <ArtCard 
                    key={artwork.id}
                    artwork={artwork}
                    isActive={activeCardId === artwork.id}
                    onActivate={onActivateCard}
                />
            ))}
        </div>
    );
};