import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(0),
          [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }
    
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9){
            ended = true;
        }
        setCharList([...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const ref = useRef(null);

    function renderItems(arr){
            
        const items = arr.map((item) => {
            const onClickHandler = (event) => {
                if (
                event.type === "click" ||
                (event.type === "keydown" && event.which === 13)
                ) {
                // Add the selected class to the clicked item
                event.currentTarget.classList.add("char__item_selected");
        
                // Remove the selected class from the other items
                const otherItems = document.querySelectorAll(".char__item");
                otherItems.forEach((otherItem) => {
                    if (otherItem !== event.currentTarget) {
                    otherItem.classList.remove("char__item_selected");
                    }
                });
        
                // Set focus on the clicked item
                event.currentTarget.focus();
        
                props.onCharSelected(item.id);
                }
            };
              
    
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li 
                        className="char__item alert"
                        ref={ref}
                        key={item.id}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        tabIndex={0}>
                            <img src={item.thumbnail}
                                style={item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? { objectFit: 'unset' } : {}}
                                alt={item.name}
                            />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;