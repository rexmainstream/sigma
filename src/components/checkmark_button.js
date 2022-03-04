import React from "react";
import { Hide_checkmark, Show_checkmark } from "../res/scripts/hover";

export default function Checkmark_button() {
    return (
        <div className="root_checkmark"
            title="Complete Event"
            onMouseOver={(e) => Show_checkmark(e)}
            onMouseLeave={(e) => Hide_checkmark(e)}>
            <div className="checkmark"></div>
        </div>
    );
}