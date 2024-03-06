import { Children } from "react";
import "./CardScroller.css"

export interface CardScrollerProps {
    children?: React.ReactNode;
    title: string;
}

export default function CardScroller(props: CardScrollerProps){
    return(
        <div className="scroller-container">
            <h3 className="scroller-title">{props.title}</h3>
            <div className="scroller">
                {Children.map(props.children, child =>
                (
                    <div className="scroller-item">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}