import React from "react";
import { Hover_table_secondary, Time_out_secondary } from "../../res/scripts/hover";


export default function Secondary_line() {
    return (
        <tr className="secondary_line"
            onMouseEnter={(e) => Hover_table_secondary(e)}
            onMouseLeave={(e) => Time_out_secondary(e)}>
            
            <td className="teacher"><span>with Someone</span></td>
            <td></td>
        </tr>
    );
}