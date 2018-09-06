import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
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

const Continue = (props) => {
    return (
        <div>

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


const App = ({turnData, highlight, onAnswerSelected}) => {
    return (
        <div className={"container-fluid"}>
            <Hero />
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
            <Continue />
            <Footer />
        </div>
    );

};

export default App;
