import { ResponseWidgetStyle } from "../styles/components/ResponseWidget.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ResponseWidget = () => {

    const [onView, setOnView] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setOnView(false);
        }, 5000);
    })

    return (
        <>
            {onView && 
            <ResponseWidgetStyle>
                <FontAwesomeIcon className="success-icon" icon={faCheck} />
                <p>Operação realizada com sucesso.</p>
            </ResponseWidgetStyle>}
        </>
    )
}

export default ResponseWidget;