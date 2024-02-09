import { ButtonCheckboxGroupField, ButtonRadioGroupField, NumberField } from "@scientisst/react-ui/components/inputs"
import { SCIENTISST_COMUNICATION_MODE } from "@scientisst/sense/future"
import Image from "next/image"
import clsx from "clsx"

import CoreBottom from "../../assets/boards/core-bottom.svg"
import CoreTop from "../../assets/boards/core-top.svg"

const senseSettings = () => {
	
    const options = [
        {
            name: "AI1",
            value: "AI1"
        },
        {
            name: "AI2",
            value: "AI2"
        },
        {
            name: "AI3",
            value: "AI3"
        },
        {
            name: "AI4",
            value: "AI4"
        },
        {
            name: "AI5",
            value: "AI5"
        },
        {
            name: "AI6",
            value: "AI6"
        },
        {
            name: "AX1",
            value: "AX1"
        },
        {
            name: "AX2",
            value: "AX2"
        }
    ]

    const image = hovered => (
        <div className="hidden gap-8 sm:flex">
            <div className="relative flex flex-col items-center">
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AI1"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "0.25rem",
                        left: "0"
                    }}
                />
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AI2"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "calc(4.75rem - 3px)",
                        left: "0"
                    }}
                />
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AI3"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "calc(4.75rem - 3px)",
                        right: "0"
                    }}
                />
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AX1"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "0.25rem",
                        right: "0"
                    }}
                />
                <Image
                    src={CoreTop}
                    alt=""
                    className="m-2"
                    style={{
                        maxWidth: "16rem",
                        height: "auto"
                    }}
                />
                <span className="font-secondary text-2xl">
                    Top
                </span>
            </div>
            <div className="relative flex flex-col items-center">
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AI4"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "0.25rem",
                        right: "0"
                    }}
                />
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AI5"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "calc(4.75rem - 3px)",
                        left: "0"
                    }}
                />
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AI6"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "calc(4.75rem - 3px)",
                        right: "0"
                    }}
                />
                <div
                    className={clsx(
                        "border-primary absolute rounded-lg border-[3px]",
                        {
                            hidden:
                                hovered !==
                                "AX2"
                        }
                    )}
                    style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        top: "0.25rem",
                        left: "0"
                    }}
                />
                <Image
                    src={CoreBottom}
                    alt=""
                    className="m-2"
                    style={{
                        maxWidth: "16rem",
                        height: "auto"
                    }}
                />
                <span className="font-secondary text-2xl">
                    Bottom
                </span>
            </div>
        </div>
    )

    return (
        <>
            <ButtonRadioGroupField
                label="Communication"
                id="communication"
                name="communication"
                center
                options={[
                    {
                        name: "Bluetooth",
                        value: SCIENTISST_COMUNICATION_MODE.WEBSERIAL
                    },
                    {
                        name: "WiFi",
                        value: SCIENTISST_COMUNICATION_MODE.WEBSOCKET
                    }
                ]}
                className="w-full max-w-[29.25rem]"
            />
            <NumberField
                label="Sampling Rate"
                name="samplingRate"
                id="samplingRate"
                min={1}
                max={16000}
                center
                className="w-full max-w-[29.25rem]"
            />
            <ButtonCheckboxGroupField
                label="Channels"
                id="channels"
                name="channels"
                center
                options={options}
                image={image}
            />
        </>)
}

export default senseSettings