import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './AuthorQuiz.css';
import './bootstrap.min.css';

const Hero = (props) => {
    return (
        <div className={"row"}>
            <div className={"jumbotron col-10 offset-1"}>
                <h1>The Author Quiz</h1>
                <p>Select book written by the author shown</p>
            </div>
        </div>
    );
};

const Book = ({title, onClick}) => {
    return (<div className="answer" onClick={() => {onClick(title);}}>
            <h4>{title}</h4>
        </div>
    );
};

const Turn = ({author, books, highlight, onAnswerSelected}) => {
        const highlightToBgColor = () => {
            const mapping =  {
                'none': '',
                'correct': 'green',
                'wrong': 'red',
            };
            return mapping[highlight]
    };

    return (
        <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
            <div className="col-4 offset-1">
                <img src={author.imageUrl} className="author-image" alt="Author" />
            </div>
            <div className="col-6">
                {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
            </div>
        </div>
    );
};
Turn.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        imageSource: PropTypes.string.isRequired,
        books: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    highlight: PropTypes.string.isRequired,
};

const Continue = ({show, onContinue}) => {
    return (
        <div className="row continue">
            { show
                ? <div className="col-11">
                    <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
                </div>
                : null }
        </div>
    );
};

const Footer = (props) => {
    return (
        <div id="footer" className="row">
            <div className="col-12">
                <p className="text-muted credit">All images are from
                <a href="http://commons.wikimedia.org/wiki/Main_Page"> Wikemedia Commons</a></p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAnswerSelected: (answer) => {
            dispatch({ type: 'ANSWER_SELECTED', answer });
        },
        onContinue: () => {
            dispatch({ type: 'CONTINUE' });
        }
    };
};


const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
    ({turnData, highlight, onAnswerSelected, onContinue}) => {
    return (
        <div className={"container-fluid"}>
            <Hero />
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
            <Continue show={highlight === 'correct'} onContinue={onContinue}/>
            <p><Link to="/add">Add an author</Link></p>
            <Footer />
        </div>
    );
});

export default AuthorQuiz;
