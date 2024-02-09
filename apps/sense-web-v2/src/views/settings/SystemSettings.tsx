import { TextButton } from "@scientisst/react-ui/components/inputs";
import Table from "../../components/Table";
import { eventProps } from "../../utils/constants";
import { useEffect } from "react";


const createEvent = (events, updateSettings) => {

    const newEvent: eventProps = {
        name: "New Event",
        color: "#000000",
        key: "c",
        toggle: false
    }
    
    const aux = [...events, newEvent];
    updateSettings(aux)
}

const deleteEvent = (events, updateSettings, index) => {

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const aux = events.filter((_, i) => i !== index);
    updateSettings(aux)
};

const toggleToggle = (events, updateSettings, index) => {
    const aux = [...events];
    aux[index].toggle = !aux[index].toggle;
    updateSettings(aux)
}

const systemSettings = ({events, updateSettings}) => {

    return (
        <>
            <Table 
                values={events} 
                deleteRow={(index, events) => deleteEvent(events, updateSettings, index)} 
                toggleToggle={(index, events) => toggleToggle(events, updateSettings, index)}/>

            <TextButton size="base" className="flex-grow" style={{marginTop: 25}} onClick={() => createEvent(events, updateSettings)} >
                Add new event
            </TextButton>

        </>
    )

}

export default systemSettings;