import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import BooksCard from '../HomePage/Bookscard';

// import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigation } from "react-router";
import Loading from '../../Components/Loading/Loading';



export default function AllBooks() {
  const axiosSecure = useAxiosSecure();

  const [AllBooks, setAllBooks] = useState([]);
  // console.log(AllBooks)
  const [filteredBooks, setFilteredBooks] = useState([]);
  // console.log(filteredBooks)

  useEffect(() => {
    const getData = async () => {
      const result = await axiosSecure('/books')
      // console.log(result.data)
      setAllBooks(result.data)
    }
    getData();
  }, [axiosSecure])


  // filter task start here 
  const navigation = useNavigation();


  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    price: "All",
    duration: "Any",
    featured: "All",
  });

  // filter change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // filter apply
  const applyFilters = () => {
    let filtered = [...AllBooks];

    // Search Filter
    if (filters.search.trim()) {
      filtered = filtered.filter((book) =>
        book.bookName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category Filter
    if (filters.category !== "All") {
      filtered = filtered.filter(
        (book) => book.category === filters.category
      );
    }

    // Price Filter
    if (filters.price && filters.price !== "All") {
      const priceStr = filters.price.trim();
      if (priceStr.endsWith("+")) {
        const min = parseInt(priceStr.replace("+", "").trim());
        filtered = filtered.filter((book) => Number(book.price) >= min);
      } else {
        const [min, max] = priceStr.split("-").map((v) => parseInt(v.trim()));
        filtered = filtered.filter((book) => {
          const price = Number(book.price);
          return price >= min && price <= max;
        });
      }
    }

    setFilteredBooks(filtered);
  };

  // Reset Filters
  const handleReset = () => {
    setFilters({
      search: "",
      category: "All",
      price: "All",
      duration: "Any",
      featured: "All",
    });
    setFilteredBooks(AllBooks);
  };
  // Sync filteredBooks with AllBooks
  useEffect(() => {
    setFilteredBooks(AllBooks);
  }, [AllBooks])
  // if filter update value will change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div>
      {navigation.state === "loading" && <Loading></Loading>}
      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Filter All Books
        </h2>

        {/* Search */}
        <div>
          <h1 className="px-3 pb-2 dark:text-black font-medium">Book Name:</h1>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder=" Search book name..."
              className="w-full border border-gray-300  dark:text-gray-500 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <h1 className="px-3 pb-2 dark:text-black font-medium">Category:</h1>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="border border-gray-300 dark:text-gray-500 rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
            >
              <option>All</option>
              <option>Fiction</option>
              <option>Fantasy</option>
              <option>Biography</option>
              <option>Romance</option>
              <option>Thriller</option>
              <option>Mystery</option>
              <option>Drama</option>
              <option>Adventure</option>
              <option>Crime</option>
              <option>Historical</option>
              <option>Science Fiction</option>
            </select>
          </div>

          <div className="flex flex-col">
            <h1 className="px-3 pb-2 dark:text-black font-medium">Price:</h1>
            <select
              name="price"
              value={filters.price}
              onChange={handleChange}
              className="border border-gray-300 dark:text-gray-500 rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
            >
              <option>All</option>
              <option>0-300</option>
              <option>300-500</option>
              <option>500-1000</option>
              <option>00+</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            // className="btn btn-primary inline-block p-2  hover:scale-105  transition"
            onClick={applyFilters}
            className="btn btn-primary inline-block px-4  hover:scale-105  transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="btn bg-blue-800 text-white inline-block px-4 rounded-xl hover:scale-105 transition"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* All book section  */}
      <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>All Books</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5'>
        {
          filteredBooks.map(book => <BooksCard key={book._id} book={book}></BooksCard>)
        }
      </div>
    </div>

  )
}
