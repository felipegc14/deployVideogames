//import { Link } from 'react-router-dom';
import React from "react";
import '../estilos/sass/home.scss';
import { TfiGame } from "react-icons/tfi";
import SearchBar from './searchBar';
import Pagination from "./pagination";
import { useDispatch, useSelector } from 'react-redux'
import Card from './card';
import { Link } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import { IoReload } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdCreate } from 'react-icons/md';
import {
    filterByCreation,
    filterByGenre,
    sortByRating,
    sortByAlpha,
    getVideogames,
    getGenres
} from '../store/actions'
import { useState, useEffect, useRef } from "react";

export default function Home() {
    const dispatch = useDispatch();

    const allGenres = useSelector((state) => state.genres);
    const allVideogames = useSelector((state) => state.videogames);
    const [page, setPage] = useState(1);
    const [order, serOrder] = useState('');
    const videogamesPerPage = 15;
    const lastVideogamePerPage = page * videogamesPerPage;
    const firstVideogamePerPage = lastVideogamePerPage - videogamesPerPage;
    const currentPageVideogames = allVideogames.slice(firstVideogamePerPage, lastVideogamePerPage)

    const wrapperRef = useRef(null);
    
    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    }, [dispatch])

    const pages = []
    for (let i = 1; i <= Math.ceil(allVideogames.length / videogamesPerPage); i++) {
        pages.push(i)
    }
    function pagination(num){
        setPage(num)
        wrapperRef.current.scrollIntoView();
    }
    function searchPage(){
        setPage(1)
        wrapperRef.current.scrollIntoView();
    }
    function paginationBef () {
        setPage(page - 1)
        wrapperRef.current.scrollIntoView();
    }
    
    function paginationAft () {
        setPage(page + 1)
        wrapperRef.current.scrollIntoView();
    }

    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    }  

    function filterByCreationHandler(e){
        dispatch(filterByCreation(e.target.value))
        setPage(1)
    }

    function filterByGenreHandler(e){
        dispatch(filterByGenre(e.target.value))
        setPage(1)
    }

    function sortByRatingHandler(e){
        e.preventDefault()
        dispatch(sortByRating(e.target.value))
        setPage(1)
        serOrder(e.target.value)
    }

    function sortByAlphaHandler(e){
        e.preventDefault()
        dispatch(sortByAlpha(e.target.value))
        setPage(1)
        serOrder(e.target.value)
    }

    return (
        <div className='app'>
        {/* { loading ? <PacmanLoader /> : */}
        { allVideogames.length === 0 ? (
            <div className="pacLoader">
            <PacmanLoader 
            className="pacman"
            color="yellow"
            margin={0}
            size={50}/>
            </div>
        ) : (
            <div className='home_container'>
            <div className="sub_container">
                <nav className="nav">
                    <h2 className='titleHome'><TfiGame className='joystick'/>VideogameApp</h2>
                    <div className="search-bar" id="searchbar">
                            <SearchBar 
                                searchPage={searchPage}
                            />
                    </div>
                    <div className="container_buttons">
                        <button className="refresh" onClick={(e) => handleClick(e)}>
                            <IoReload /> Refresh
                        </button>
                        <Link className="createLink" to="/create">
                        <button className="create">
                            <MdCreate /> Create Game
                        </button>
                        </Link>
                    </div>
                </nav>
                <div className='filters' ref={wrapperRef}>
                    <select className="selector" onChange={(e) => sortByRatingHandler(e)}>
                        <option value="rating">Sort by RATING</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                    <select className="selector" onChange={(e) => sortByAlphaHandler(e)}>
                        <option value="alpha">Sort by ALPHABET</option>
                        <option value="ascending">A-Z</option>
                        <option value="descending">Z-A</option>
                    </select>
                    <select className="selector" onChange={(e) => filterByGenreHandler(e)}>
                        <option value="genre">GENRES</option>
                        {allGenres && allGenres.map((g) => {
                            return <option value={g.name} key={g.id}>{g.name}</option>
                        })}
                    </select>
                    <select className="selector" onChange={(e) => filterByCreationHandler(e)}>
                        <option value="all">VIDEOGAMES</option>
                        <option value="db">Created</option>
                        <option value="api">Existing</option>
                    </select>
                </div>
                <div className="containerGames">
                {
                    currentPageVideogames.length ? 
                    <div className="containerCards">
                    {
                        currentPageVideogames.map(v => 
                            <Card
                                id={v.id}
                                name={v.name}
                                background_image={v.background_image}
                                genres={v.genres.map(g => g.name)}
                                rating={v.rating}
                                key={v.id}
                                /> 
                        )
                    }
                    </div> : <PacmanLoader />
                }
                    {/* {
                        currentPageVideogames && currentPageVideogames.map((v) => {
                        return (
                                <Card
                                id={v.id}
                                name={v.name}
                                background_image={v.background_image}
                                genres={v.genres.map(g => g.name)}
                                rating={v.rating}
                                key={v.id}
                                /> 
                    )})
                    } */}
                </div>
                <div className="pagination">
                    {page !== 1 ? <div onClick={() => paginationBef()}><MdOutlineKeyboardArrowLeft className='buttonLeft' /></div> : null}
                    <Pagination 
                        allVideogames={allVideogames.length}
                        videogamesPerPage={videogamesPerPage}
                        pagination={pagination}
                        page={page}
                    />
                    {page !== pages.length ? <div onClick={() => paginationAft()}><MdOutlineKeyboardArrowRight className='buttonRight' /></div> : null}
                </div>
                </div>
                </div>
        )}
        </div>
    )
}