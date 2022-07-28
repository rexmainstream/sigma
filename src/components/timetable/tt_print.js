import React, { forwardRef as ForwardRef, useRef as UseRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import TT_WEEKLY from './tt_weekly'
import { weekly_formatted } from "./tt_data"

/*Module Obtained From
https://thewebdev.info/2021/11/20/how-to-print-a-react-component-on-click-of-a-button/
*/
const ComponentToPrint = ForwardRef((props, ref) => {
    return <div ref={ref}><TT_WEEKLY raw={weekly_formatted} /></div>;
});

export default function tt_display(props) {
    const ref = UseRef();

    return (
        <div>
            <ComponentToPrint ref={ref} />
            <ReactToPrint content={() => ref.current}>
                <PrintContextConsumer>
                    {({ handlePrint }) => (
                        <button className="print_button" onClick={handlePrint}>Print Weekly Timetable!</button>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>
        </div>
    )
}