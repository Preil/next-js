import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from '../../components/events/event-list';
function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  // extract year and month from slug (strings)
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // convert strings into numbers
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // validation numYear and numMonth
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  // get events from dummy-data with year and month
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // check for filtered events
  if (!filteredEvents || filteredEvents.length === 0) {
    <p>No events found for the chosen filter!</p>;
  }

  // provide filtered events to EventList for output
  return (
    <div>
      <h1>Filtered Events</h1>
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
