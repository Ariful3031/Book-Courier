import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Coverage() {
    const [serviceCenters, setServiceCenters] = useState([]);
    const mapRef = useRef(null);
    const position = [23.6850, 90.3563];

    useEffect(() => {
        fetch("/services-Center.json")
            .then(res => res.json())
            .then(data => setServiceCenters(data))
            .catch(err => console.error("Error loading service centers:", err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(c =>
            c.district.toLowerCase().includes(location.toLowerCase())
        );
        if (district && mapRef.current) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 10);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 transition-colors px-4 sm:px-6 lg:px-20 py-10">
            {/* Heading */}
            <h1 className='text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white transition-colors'>
                Coverage Area
            </h1>

            {/* Search Location */}
            <div className='w-full mx-auto text-end mb-4'>
                <form onSubmit={handleSearch} className="flex justify-end">
                    <label className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                        <svg
                            className="h-5 w-5 opacity-50 text-gray-500 dark:text-gray-200 px-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.3-4.3"></path>
                        </svg>
                        <input
                            type="search"
                            name='location'
                            required
                            placeholder="Search Area"
                            className="px-2 py-2 w-60 sm:w-80 md:w-96 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        />
                    </label>
                </form>
            </div>

            {/* Map */}
            <div className='border border-gray-300 dark:border-gray-600 w-full h-[300px] sm:h-[70vh] md:h-[80vh] rounded-lg overflow-hidden'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='w-full h-full'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {serviceCenters.map((center, index) => (
                        <Marker key={index} position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br />
                                Service area: {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </section>
    );
}
