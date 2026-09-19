import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductIteam from '../components/ProductIteam';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  // Filtered products
  const [filterProducts, setFilterProducts] = useState([]);

  // Selected categories
  const [category, setCategory] = useState([]);

  // Selected types
  const [subCategory, setSubCategory] = useState([]);

  // Sorting
  const [sortType, setSortType] = useState('relavent');


  // Add / Remove Category
  const toggleCategory = (e) => {

    const value = e.target.value;
    const newCategory = category.includes(value)
      ? category.filter(item => item !== value)
      : [...category, value];

    setCategory(newCategory);
    console.log('Selected category:', newCategory);
  };


  // Add / Remove Type
  const toggleSubCategory = (e) => {

    const value = e.target.value;
    const newSubCategory = subCategory.includes(value)
      ? subCategory.filter(item => item !== value)
      : [...subCategory, value];

    setSubCategory(newSubCategory);
    console.log('Selected type:', newSubCategory);
  };


  // Apply Filters
  useEffect(() => {

    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Category Filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    // Type Filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

  useState


    // Sorting
    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => a.price - b.price);
    }

    if (sortType === 'high-low') {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    console.log('Filtered products:', productsCopy);
    setFilterProducts(productsCopy);

  }, [products, search, showSearch, category, subCategory, sortType]);


  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t'>

      {/* LEFT SIDE FILTER */}

      <div className='w-full sm:w-[260px]'>

        <div className='min-w-60'>
          <p
            onClick={() => setShowFilter(!showFilter)}
            className='my-2 text-xl flex items-center cursor-pointer gap-2'
          >
            FILTERS

            <img
              className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>
        </div>


        {/* CATEGORY FILTER */}

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block mt-2`}>

          <div className='border border-gray-300 p-4 w-full'>

            <p className='text-sm font-medium uppercase tracking-wide mb-3'>
              Categories
            </p>

            <div className='space-y-3 text-sm text-gray-700'>

              <label className='flex items-center gap-3 cursor-pointer'>

                <input
                  type='checkbox'
                  value='Men'
                  onChange={toggleCategory}
                  className='w-4 h-4 accent-black border-gray-400'
                />

                <span>Men</span>

              </label>


              <label className='flex items-center gap-3 cursor-pointer'>

                <input
                  type='checkbox'
                  value='Women'
                  onChange={toggleCategory}
                  className='w-4 h-4 accent-black border-gray-400'
                />

                <span>Women</span>

              </label>


              <label className='flex items-center gap-3 cursor-pointer'>

                <input
                  type='checkbox'
                  value='Kids'
                  onChange={toggleCategory}
                  className='w-4 h-4 accent-black border-gray-400'
                />

                <span>Kids</span>

              </label>

            </div>

          </div>

        </div>


        {/* TYPE FILTER */}

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block mt-2`}>

          <div className='border border-gray-300 p-4 w-full'>

            <p className='text-sm font-medium uppercase tracking-wide mb-3'>
              TYPE
            </p>


            <div className='space-y-3 text-sm text-gray-700'>

              <label className='flex items-center gap-3 cursor-pointer'>

                <input
                  type='checkbox'
                  value='Topwear'
                  onChange={toggleSubCategory}
                  className='w-4 h-4 accent-black border-gray-400'
                />

                <span>Topwear</span>

              </label>


              <label className='flex items-center gap-3 cursor-pointer'>

                <input
                  type='checkbox'
                  value='Bottomwear'
                  onChange={toggleSubCategory}
                  className='w-4 h-4 accent-black border-gray-400'
                />

                <span>Bottomwear</span>

              </label>


              <label className='flex items-center gap-3 cursor-pointer'>

                <input
                  type='checkbox'
                  value='Dress'
                  onChange={toggleSubCategory}
                  className='w-4 h-4 accent-black border-gray-400'
                />

                <span>Dress</span>

              </label>

            </div>

          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className='flex-1'>

        <div className='flex items-center justify-between gap-4 text-base sm:text-2xl mb-4'>

          <Title text1={'ALL'} text2={'COLLECTION'} />


          {/* SORT */}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 text-sm px-2 py-1.5 bg-white outline-none'
          >

            <option value="relavent">
              Sort by: Relevant
            </option>

            <option value="low-high">
              Sort by: Low to High
            </option>

            <option value="high-low">
              Sort by: High to Low
            </option>

          </select>

        </div>


        {/* PRODUCTS */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>

          {filterProducts.map((item, index) => (

            <ProductIteam
              key={item._id || index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />

          ))}

        </div>

      </div>

    </div>
  )
}

export default Collection