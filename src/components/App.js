import React from 'react';
import Card from './Card';
import Menu from './Menu';
import axios from 'axios';
import { endpoints, getImageUrl } from '../config';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      filmai: [],
      zanrai: [],
    };
  }

  componentDidMount() {
    this.takeGenres();
    this.takePopularMovies();
  }

  takeGenres = () => {
    axios
        .get(endpoints.genres())
        .then((response) => {
          this.setState({
            zanrai: response.data.genres,
          });
        })
  };

  takePopularMovies = () => {
    axios
        .get(endpoints.mostPopularMovies())
        .then((response) => {
          this.setState({
            filmai: response.data.results,
          });
        })
  };

  updateFilmus(genre_id) {
    this.takeMoviesByGenre(genre_id);
  }

  takeMoviesByGenre = (genre_id) => {
    axios
        .get(endpoints.genreMovies(genre_id))
        .then((response) => {
          this.setState({
            filmai: response.data.results,
          });
        })
  };
  
  render() {
    const { filmai, zanrai } = this.state;
    return (
        <React.Fragment>
          <div>
          {zanrai.map((genre) => (
              <Menu
                  key={genre.id}
                  data={genre}
                  updateFilmus={this.updateFilmus.bind(this)}
              />
          ))}
          </div>
        {filmai.map((card) => (
          <Card
            getTitle={this.getTitle}
            key={card.original_title}
            backgroundImage={getImageUrl(card.backdrop_path)}
            date={card.release_date}
            rating={card.vote_average}
            votes={card.vote_count}
            description={card.overview}
            title={card.original_title}
          />
        ))}

        </React.Fragment>
    );
  }
}

export default App;
