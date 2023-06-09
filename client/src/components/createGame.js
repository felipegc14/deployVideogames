import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createVideogame, getGenres } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import '../estilos/sass/createGame.scss';
// import { TiDelete } from "react-icons/ti";
import img  from "../images/unsplash2.jpg"
import { BiCaretLeft } from "react-icons/bi";

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const history = useHistory()
    
        let allplatforms = [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "GameCube",
        "Game Boy",
        "SNES",
        "NES",
        "Commodore",
        "Atari",
        "Genesis",
        " SEGA",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
        ];
    
        const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        platforms: [],
        genres: [],
        });

        const [errors, setErrors] = useState({})


        /* function handleDeleteGenre(e) {
            setInput({
                ...input,
                genres: input.genres.filter(g => g !== e)
            })
        } */

        function handleInputChange(e) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        } 
        
        function handleSelectGenre(e) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            setErrors(validate({
                ...input,
                genres: [...input.genres, e.target.value]
            }))
        }
    
        function handleSelectPlatform(e) {
            setInput({
                ...input,
                platforms: input.platforms.includes(e.target.value) ?
                    [...input.platforms] :
                    [...input.platforms, e.target.value]
            })
            setErrors(validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }

        function handleDelete(e) {
            setInput({
                ...input,
                platforms: input.platforms.filter(p => p !== e)
            })
        }

        function handleDeleteGenre(e) {
            setInput({
                ...input,
                genres: input.genres.filter(g => g !== e)
            })
        }
    
        function handleSubmit(e) {
        e.preventDefault();
        if (!errors.name && !errors.description && !errors.rating && !errors.released && !errors.genre && !errors.platforms){ 
            console.log(input);
            dispatch(createVideogame(input));
            alert("Videogame created!");
            setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            background_image: "",
            platforms: [],
            genres: [],
            });
            document.getElementById("form").reset();
            history.push('/videogames')
        
        }
    }        
    
        useEffect(() => {
        dispatch(getGenres());
        }, [dispatch]);
    
        return (
        <div className="container_form">
                <form id="form" className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className='imgForm'>
                    {/* <img className="imgMobile" src={img} alt="" /> */}
                </div>
                <div className='SubContainers1'>
                    <div className='titleCreate'>
                        <Link className="buttonBack" to="/videogames">
                            <button className="buttonBackDetail"><BiCaretLeft size={25}/> Back</button>
                        </Link>
                        <h1 className="title">Create your game!</h1>
                    </div>
                    <div className='SubContainers2'>
                        <div className="SubContainer-Form">
                            <div className='labelInput'>
                                <label className="labelCreate">{errors.name ? <span>{errors.name}</span> : "Name" } </label>
                                <input
                                className="inputName"
                                type="text"
                                //onChange={(e) => handleChange(e)}
                                onChange={(e) => handleInputChange(e)}
                                value={input.name}
                                name="name"
                                />
                            </div>
                            {/* {errors.name && <span>{errors.name}</span> } */}
                            <div className='labelInput'>
                                <label className="labelCreate">{errors.description ? <span>{errors.description}</span> : "Description"}</label>
                                <input
                                className="InputDescription"
                                type="text"
                                onChange={(e) => handleInputChange(e)}
                                value={input.description}
                                name="description"
                                />
                                {/* {errors.description && <span>{errors.description}</span> } */}
                            </div>
                        </div>
                        <div className="SubContainer-Form">
                            <div className='labelInput'> 
                                <label className="labelCreate">{errors.released ? <span>{errors.released}</span> : "Released date"} </label>
                                <input
                                className="InputRealesed"
                                type="date"
                                onChange={(e) => handleInputChange(e)}
                                value={input.released}
                                name="released"
                                />
                            </div>
                            <div className='labelInput'> 
                                <label className="labelCreate">{errors.rating ? <span>{errors.rating}</span> : "Rating"} </label>
                                <input
                                className="InputRating"
                                type="number"
                                onChange={(e) => handleInputChange(e)}
                                value={input.rating}
                                min="1"
                                max="5"
                                name="rating"  
                                />
                                {/* {errors.rating && <span>{errors.rating}</span> } */}
                            </div>
                        </div>
                        <div className="SubContainer-Form">
                            <div className='labelInput'>
                                <label className="labelCreate">Image </label>
                                <input
                                className="InputImage"
                                type="text"
                                placeholder="Image URL... "
                                onChange={(e) => handleInputChange(e)}
                                value={input.background_image}
                                name="background_image"
                                />
                            </div>
                            <div className='selectors'>
                                <select name="platform" onChange={(e) => handleSelectPlatform(e)}>
                                <option value="">Select Platforms</option>
                                {allplatforms.map
                                ((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                                </select>
                                {errors.plarform && <span>{errors.platform}</span> }

                                <select name="genre" onChange={(e) => handleSelectGenre(e)}>
                                <option value="All">Select Genres</option>
                                {genres.map((g) => (
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                ))}
                                </select>
                                {errors.genre && <span>{errors.genre}</span> }
                            </div>

                        </div>
                        <div className="SubContainer-Form">
                            <div className="button_create">
                                <button onClick={(e) => handleSubmit(e)} className='buttonBackDetail' type="submit">
                                Create Game
                                </button>
                            </div>
                            <div className='platforms'>
                            <div className='platformsList'>
                            {/* <h3>Platforms selected: </h3> */}
                                {input.platforms && input.platforms.map((p) => {
                                            return (
                                                <div className='platforms_container' key={p}>
                                                    <h5 className='namePlatform'>{p}</h5>
                                                    <button className='buttonPlatform' value={p} onClick={() => handleDelete(p)}>✖</button>
                                                </div>
                                            )
                                        })}
                            
                            </div>
                            <div className='genresList'>
                            {/* <h3>Genres Selected: </h3> */}
                                {input.genres && input.genres.map((g) => {
                                            return (
                                                <div className='genres_container' key={g}>
                                                    <h5 className='nameGenre'>{g}</h5>
                                                    <button className='buttonGenre' value={g} onClick={() => handleDeleteGenre(g)}>✖</button>
                                                </div>
                                            )
                                        })}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </form>
            </div>    
        );
    }

    export function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = 'Name is required';
            } else if (input.name.length < 2) {
            errors.name = 'Name is invalid, should contain at least 2 characters';
            }
        if (!input.description) {
            errors.description = 'Description is required';
            } else if (input.description.length < 10) {
            errors.description = 'Description should contain more than 10 characters';
        }
        if (!input.released) {
            errors.released = 'Released date is required';
            } else if (input.released[4] === 0 ) {
            errors.released = 'Released date is not correct';
        }
        if (!input.rating) {
            errors.rating = 'Rating is required';
            } else if (input.rating < 0 || input.rating > 5) {
            errors.rating = 'Rating is invalid, should be between 0 and 5';
        }
        if (!input.genre) {
            errors.genres = 'Genre is required';
            } 
        if (!input.platforms) {
            errors.platforms = 'Platform is required';
            } 
        return errors;
    }