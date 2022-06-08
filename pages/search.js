import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import MapBox from '../components/Map';

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  console.log(startDate);
  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className='flex  pb-5'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays -{' '}
            <span className='bg-red-400 text-white py-2 px-3 text-sm rounded-lg shadow-lg'>
              {formattedStartDate}
            </span>{' '}
            -{' '}
            <span className='bg-red-400 text-white py-2 px-3 text-sm rounded-lg shadow-lg'>
              {formattedEndDate}
            </span>{' '}
            - for {noOfGuests} guest
            {noOfGuests > 1 ? 's' : ''}
          </p>

          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-grey-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>
          <div className='flex flex-col'>
            {searchResults?.map(
              ({ img, title, description, price, star, total, location }) => (
                <InfoCard
                  key={img}
                  title={title}
                  description={description}
                  img={img}
                  price={price}
                  star={star}
                  total={total}
                  location={location}
                />
              )
            )}
          </div>
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <MapBox searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
