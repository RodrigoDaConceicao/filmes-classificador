import { Children, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "./CardScroller.css"

export interface CardScrollerProps {
    children?: React.ReactNode;
    title: string;
}

export default function CardScroller(props: CardScrollerProps){
    function handleClick(e:any, direction:number){
        var scrollElement = e.target.parentElement.parentElement;
        scrollElement.scrollBy({
            top: 0,
            left: 400 * direction,
            behavior: "smooth",
          });
    }
    return(
        <div className="scroller-container border-0">
            <h3 className="scroller-title d-inline-block">{props.title}</h3>
            <div className="scroller">
                <div className="scroller-arrow d-flex justify-content-between position-absolute w-100 h-100">
                    <button className="px-4 scroller-arrow-left" onClick={(e)=>{handleClick(e,-1)}}><FaAngleLeft size={32} /></button>
                    <button className="px-4 scroller-arrow-right" onClick={(e)=>{handleClick(e,1)}}><FaAngleRight size={32} /></button>
                </div>
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