import { TextButton } from "@scientisst/react-ui/components/inputs";
import Table from "../../components/Table";
import { eventProps } from "../../utils/constants";
import { useEffect } from "react";
import { FieldArray } from "formik";

const newEvent: eventProps = {
    name: "new event",
    color: "rgb(255, 255, 0)",
    key: "n",
    toggle: false
}

const systemSettings = () => {

    return (
        <>
            <FieldArray name="eventsLabel">
            {
                ({ form, push, remove }) => {
                    const { values } = form;
                    const { eventsLabel } = values;

                    return (
                        <>
                            <div className="mb-5">
                            {eventsLabel.map((event, index) => (
                                <div key={index}>
                                    {/* Edit the event, and make it editable */}
                                    {event.name}
                                    {event.color}
                                    {event.toggle}
                                    {event.key}
                                    <button type="button" onClick={() => remove(index)}>Delete</button>
                                </div>
                            ))}
                            </div>

                            <TextButton size={"base"} onClick={() => push(newEvent)}>Create event</TextButton>
                        </>
                    );
                }
            }
            </FieldArray>
        </>
    )

}

export default systemSettings;