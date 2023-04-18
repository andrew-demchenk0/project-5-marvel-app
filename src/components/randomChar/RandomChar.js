import React, { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
// eslint-disable-next-line
    }, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);       
        getCharacter(id)
            .then(onCharLoaded);
    }

    const spinner = loading ? <Spinner/> : null,
            errorMessage = error ? <ErrorMessage/> : null,
            content = !(loading || error) ? <View char={char}/> : null;
    return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) =>{
    const {thumbnail, name, description, homepage, wiki} = char;

    let charDescription = description ? description : "this hero has no description";
        if (description && description.length > 200) {
            charDescription = description.slice(0, 200) + "...";
        }

    return(
        <div className="randomchar__block">
            <img src={thumbnail}
                 style={thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? { objectFit: 'unset' } : {}}
                 alt="Random character" 
                 className="randomchar__img"/>

            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {charDescription}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;