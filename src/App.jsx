import React, { useState, useReducer, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { favouritesReducer, initialState } from './reducers/favouritesReducer';

function App() {
    const { photos, loading, error } = useFetchPhotos();
    const [favourites, dispatch] = useReducer(favouritesReducer, initialState);
    const [query, setQuery] = useState('');

    // useCallback for search handler
    const handleSearch = useCallback((e) => {
        setQuery(e.target.value);
    }, []);

    // useMemo for filtering
    const filteredPhotos = useMemo(() => {
        return photos.filter((p) => 
            p.author.toLowerCase().includes(query.toLowerCase())
        );
    }, [photos, query]);

    // Showing a loading spinner while fetching for the data
    if (loading) return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='spinner mb-4'></div>
            <p className='text-gray-600 font-medium'>Fetching Photos...</p>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">
        Error: {error}
        </div>
    );

    return (
        <div className='max-w-6xl mx-auto p-4 pb-10'>
            {/* <h1 className='text-3xl font-bold text-center mb-8'>Photos Gallery</h1> */}
            <header className="text-center mb-5">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Photo Gallery</h1>
                <p className="text-gray-500">Search by author keyword or find your favorites</p>
            </header>

            <input
                type="text"
                placeholder="Search by author (e.g., 'Alejandro')..."
                className='w-full p-3 mb-8 border-2 border-gray-300 rounded-xl focus:border-blue-500 placeholder:text-gray-500 outline-none'
                onChange={handleSearch}
            />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {filteredPhotos.map((photo) => (
                    <div key={photo.id} className='border border-gray-300 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden'>
                        <img
                            src={photo.download_url}
                            alt={photo.author}
                            className='w-full h-48 object-cover'
                        />
                        <div className='p-4 flex justify-between items-center'>
                            <span className='font-semibold truncate mr-2'>{photo.author}</span>
                            <button
                                onClick={() => dispatch({ type: 'TOGGLE', id: photo.id })}
                                className='text-2xl border rounded-full border-blue-300'
                            >
                                {favourites.includes(photo.id) ? '❤️' : '🤍'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
