const EventsLabel = ({eventsLabel}) => {

    return (
        <div>
          {eventsLabel && Array.isArray(eventsLabel) && eventsLabel.map(event => event.name)}
        </div>
      );

}

export default EventsLabel;