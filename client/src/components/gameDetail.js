import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clearDetail } from '../store/actions'
import { useEffect } from "react";
import '../estilos/sass/detail.scss';
import PacmanLoader from "react-spinners/PacmanLoader";
import { BiCaretLeft } from "react-icons/bi";
import { MdStar } from "react-icons/md";

export default function GameDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const detail = useSelector((state) => state.videogameDetail)

    useEffect(() => {
        dispatch(getDetails(id))
    },[dispatch, id])

    function handleClick() {
        dispatch(clearDetail())
    }

    return (
        <div className="detailContainer">
            {detail.length === 0 ? (
                <div className="pacLoader">
                <PacmanLoader 
                className="pacman"
                color="yellow"
                margin={0}
                size={50}/>
                </div>
            ) : (
                <div className="VideogameDetail">
                <div className="backdrop-container"> 
                <img className="imgHero" src={detail.img} alt="imagen" />
                <div id="backdrop" className="backdrop-wrapper -loaded" data-backdrop="https://a.ltrbxd.com/resized/sm/upload/4w/w0/y2/8e/paris-texas-1200-1200-675-675-crop-000000.jpg?v=fc51a0a182" data-backdrop2x="https://a.ltrbxd.com/resized/sm/upload/4w/w0/y2/8e/paris-texas-1920-1920-1080-1080-crop-000000.jpg?v=fc51a0a182" data-backdropmobile="https://a.ltrbxd.com/resized/sm/upload/4w/w0/y2/8e/paris-texas-960-960-540-540-crop-000000.jpg?v=fc51a0a182" data-offset="64"> 
                    <Link to="/videogames" className="link">
                        <button className="buttonBackDetail" onClick={(e) => handleClick(e)}><BiCaretLeft size={25}/>Back</button>
                    </Link>
                    <div className="backdropplaceholder js-backdrop-placeholder" ></div> 
                    <div className="backdropimage js-backdrop-image" ></div> 
                    <div className="backdropmask js-backdrop-fade"></div> 
                </div> 
            </div>
            <div className="infoDetail">
                <img className="imgDetail" src={detail.img} alt="imagen" />
                <div className="textDetail">
                <div className="titleDetail">
                    <h1>{detail.name}</h1>
                    <h5>Release: {detail.released}</h5>
                    <h5 className="rating">
                        <MdStar className="mdStar"/> 
                        {detail.rating}
                    </h5>
                </div>
                    <h5>{detail.genres}</h5>
                    <h5>{detail.platforms}</h5>
                    <p>Description: {detail.description.replace(/<[^>]*>?/g, "")}</p>
                </div>
            </div>
                </div>
            )}
        </div>
    )
}