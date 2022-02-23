import React from "react";
import { Hover } from "../../res/scripts/hover";
import { Time_out } from "../../res/scripts/hover";



export default function Main_line() {
    return (        
        <tr className="main_line"
            onMouseOver={(e) => Hover(e)}
            onMouseLeave={(e) => Time_out(e)}
            >
            <td className="period">Period</td>
            <td className="room">69</td>                                  
        </tr>
    );
}
