import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

const Search = () => {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  console.log(startDate);
  const formattedStartDate = format(new Date(startDate), 'dd MMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays - {range} - for {noOfGuests} number of guest
            {noOfGuests > 1 ? 's' : ''}
          </p>

          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in Mars</h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-grey-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
