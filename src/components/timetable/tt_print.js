import React, { forwardRef as ForwardRef, useRef as UseRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import TT_WEEKLY from './tt_weekly2'
import { weekly_formatted } from "./tt_data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

/*Module Obtained From
https://thewebdev.info/2021/11/20/how-to-print-a-react-component-on-click-of-a-button/
*/
const ComponentToPrint = ForwardRef((props, ref) => {
    return <div ref={ref}><TT_WEEKLY raw={weekly_formatted} /></div>;
});

export default function tt_display(props) {
    const ref = UseRef();

    return (
        <div className="timetable_weekly_print">
            <ComponentToPrint ref={ref} />
            <ReactToPrint content={() => ref.current}>
                <PrintContextConsumer>
                    {({ handlePrint }) => (
                        <div className="print_button_container">
                            <button 
                                className="icon_button print_button" 
                                onClick={handlePrint}
                                title = "Print Full Timetable"
                            >
                                <FontAwesomeIcon 
                                    icon={faPrint}
                                
                                />
                            </button>
                        </div>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>
            <ComponentToPrint ref={ref} />
        </div>
    )
}