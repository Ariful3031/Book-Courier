import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useNavigation } from "react-router";
import Loading from '../../Components/Loading/Loading';
import BooksCard from '../HomePage/BooksCard';

export default function AllBooks() {
  const axiosSecure = useAxiosSecure();
  const [AllBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigation = useNavigation();

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    price: "All",
  });

  // Fetch all books
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axiosSecure('/books');
        setAllBooks(result.data || []);
      } catch (error) {
        console.error("AllBooks fetch error:", error);
      }
    };
    getData();
  }, [axiosSecure]);

  // Sync filteredBooks with AllBooks
  useEffect(() => {
    setFilteredBooks(AllBooks);
  }, [AllBooks]);

  // Filter change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
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
      filtered = filtered.filter((book) => book.category === filters.category);
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

  // Reset filters
  const handleReset = () => {
    setFilters({
      search: "",
      category: "All",
      price: "All",
    });
    setFilteredBooks(AllBooks);
  };

  // Auto apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {navigation.state === "loading" && <Loading />}

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Filter All Books
        </h2>

        {/* Search */}
        <div className="mb-6">
          <h1 className="px-3 pb-2 text-gray-700 dark:text-gray-200 font-medium">
            Book Name:
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search book name..."
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Category */}
          <div className="flex flex-col">
            <h1 className="px-3 pb-2 text-gray-700 dark:text-gray-200 font-medium">
              Category:
            </h1>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 transition-colors"
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

          {/* Price */}
          <div className="flex flex-col">
            <h1 className="px-3 pb-2 text-gray-700 dark:text-gray-200 font-medium">
              Price:
            </h1>
            <select
              name="price"
              value={filters.price}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              <option>All</option>
              <option>0-300</option>
              <option>300-500</option>
              <option>500-1000</option>
              <option>1000+</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-xl transition-transform transform hover:scale-105"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-xl transition-transform transform hover:scale-105"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* All Books Section */}
      <h1 className="text-4xl font-bold mt-5 mb-10 text-center text-gray-900 dark:text-white">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-5">
        {filteredBooks.map((book) => (
          <BooksCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
