import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaPlay} from 'react-icons/fa'
import {BiInfoCircle} from 'react-icons/bi'


const status = {
  failure: 'failure',
  success: 'success',
  inProgress: 'inProgress',
}

class Home extends Component {
  state = {posterObject: [], posterObjectStatus: ''}

  componentDidMount() {
    this.getPosterObject()
  }

  reloadPosterCard = () => {
    this.getPosterObject()
  }

  getPosterObject = async () => {
    this.setState({ posterObjectStatus: status.inProgress })
  
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
      }
    };
  
    try {
      const response = await fetch(url, options)
      const data = await response.json()
  
      if (response.ok) {
        const randomPosterObject =
          data.results[Math.floor(Math.random() * (data.results.length - 1))]
  
        const updatedPosterObject = {
          id: randomPosterObject.id,
          backdropPath: randomPosterObject.backdrop_path,
          title: randomPosterObject.title,
          overview: randomPosterObject.overview,
        }
  
        this.setState({
          posterObjectStatus: status.success,
          posterObject: updatedPosterObject,
        })
      } else {
        this.setState({
          posterObjectStatus: status.failure,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      this.setState({ posterObjectStatus: status.failure })
    }
  }
  

  getPoster = () => {
    const {posterObject, posterObjectStatus} = this.state
    const {title, backdropPath, overview, id} = posterObject

    switch (posterObjectStatus) {
      case status.success:
        return (
          <div
            className="Home_poster"
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${backdropPath})`,

              width: '100vw',
            }}
          >
            <div className="vertical">
              <div className="horizontal">
                <div className="Home_poster_title">{title}</div>
                <div className="Home_poster_overview">{overview}</div>
                <div className="buttons_card">
                  <button type="button" className="watch_button">
                    <FaPlay size={13} /> PLAY
                  </button>
                  <Link to={`/movies/${id}`} className="infoButton">
                    <BiInfoCircle size={18} /> More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
     
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home_container">
        {this.getPoster()}
   
      </div>
    )
  }
}

export default Home