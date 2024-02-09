import { TextButton } from "@scientisst/react-ui/components/inputs";
import Table from "../../components/Table";
import { eventProps } from "../../utils/constants";
import { useEffect } from "react";


const createEvent = (events, updateSettings) => {

    const newEvent: eventProps = {
        name: "New Event",
        color: "rgb(0, 0, 0)",
        key: "c",
        toggle: false
    }
    
    const aux = [...events, newEvent];
    updateSettings(aux)
}

const deleteEvent = (updateSettings, index, events) => {

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const aux = events.filter((_, i) => i !== index);
    updateSettings(aux)
};

const changeToggle = (updateSettings, index, events) => {
    const aux = [...events];
    aux[index].toggle = !aux[index].toggle;
    updateSettings(aux)
}

const changeName = (updateSettings, index, events) => {

    //create a modal to change the name
    const value = window.prompt("Enter the new name");

    const aux = [...events];
    aux[index].name = value;
    updateSettings(aux)
}

const changeKey = (updateSettings, index, events) => {
    // Create a modal to change the name, allow only the first valid letter
    let value = window.prompt("Enter the new key");
  
    // If a value is provided and it's a valid letter, update the key
    if (!(value && /^[a-zA-Z]$/.test(value))) {
        alert("Please enter a valid single letter.");
        return 
    }

    value = value.toLowerCase();

    const aux = [...events];
    aux[index].key = value;
    updateSettings(aux);
};

const changeColor = (updateSettings, index, events, color) => {

    const aux = [...events];
    aux[index].color = color;
    updateSettings(aux);
};

const systemSettings = ({events, updateSettings}) => {

    return (
        <>
            <Table 
                values={events} 
                deleteRow={(index, events) => deleteEvent(updateSettings, index, events)} 
                changeName={(index, events) => changeName(updateSettings, index, events)}
                changeKey={(index, events) => changeKey(updateSettings, index, events)}
                changeToggle={(index, events) => changeToggle(updateSettings, index, events)}
                changeColor={(index, events, color) => changeColor(updateSettings, index, events, color)}
            />

            <TextButton size="base" className="flex-grow" style={{marginTop: 25}} onClick={() => createEvent(events, updateSettings)} >
                Add new event
            </TextButton>

        </>
    )

}

export default systemSettings;