import { useRouter } from "next/router";
import { Fragment } from "react";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

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
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // get events from dummy-data with year and month
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // check for filtered events
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <div className="center">
          <p>No events found for the chosen filter!</p>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  // provide filtered events to EventList for output
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
