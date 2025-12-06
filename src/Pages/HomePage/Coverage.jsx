import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Coverage() {
    const [serviceCenters, setServiceCenters] = useState([]);
        console.log(serviceCenters)
    
        useEffect(() => {
            fetch("/services-Center.json")
                .then(res => res.json())
                .then(data => setServiceCenters(data))
        }, [])

    
    const mapRef = useRef(null)
    // console.log(serviceCenters)
    const position = [23.6850, 90.3563]
    const handeSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
        if (district) {
            const coord = [district.latitude, district.longitude]
            console.log(coord)
            mapRef.current.flyTo(coord, 10)
        }
    }
    return (
        <div>
            <h1 className='text-4xl font-bold my-5 dark:text-white text-black text-center'>Coverage Area</h1>
            {/* search Loaction */}
            <div className='w-full mx-auto text-end p-2 '>
                <form onSubmit={handeSearch}>
                    <label className="input dark:bg-white text-black">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name='location'required placeholder="Search Area" />
                    </label>
                </form>
            </div>
            {/*  */}
            <div className='border w-full h-[300px] sm:h-[400px] md:h-[800px]'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[300px] sm:h-[400px] md:h-[800px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map((center, index) =>
                            <Marker key={index} position={[center.latitude, center.longitude]}>
                                <Popup>
                                    <strong>{center.district}</strong> <br /> service area: {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>)
                    }
                </MapContainer>

            </div>
        </div>
    )
}
