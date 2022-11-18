import { CarregamentoWidgetStyle } from "../styles/components/CarregamentoWidget.style";

const CarregamentoWidget = () => {
    return (
        <CarregamentoWidgetStyle>
            <div className="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </CarregamentoWidgetStyle>
    )
}

export default CarregamentoWidget;