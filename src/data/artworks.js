// src/data/artworks.js
export const fetchArtworks = async () => {
    try {
        const response = await fetch("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiSpec = await response.json();

        const paintings = apiSpec.paths["/paintings"]
            .get
            .responses["200"]
            .content["application/json"]
            .example;

        if (!paintings || !Array.isArray(paintings)) {
            throw new Error('Invalid data structure received from API');
        }

        return paintings.map((item, index) => ({
            id: index + 1,
            title: (item.title || "Unknown Title").toUpperCase(),
            date: item.year || 0,
            artist: item.artist || "Unknown Artist",
            location: item.location || "Unknown Location",
            image: item.imageUrl || "",
            originalTitle: (item.title || "Unknown Title").toUpperCase(),
            originalDate: item.year || 0,
        }));
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        return [];
    }
};

export const getAllArtists = (artworks) => [...new Set(artworks.map(a => a.artist))];
export const getAllLocations = (artworks) => [...new Set(artworks.map(a => a.location))];