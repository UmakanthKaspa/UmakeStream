import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './ItemCard.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

const ItemCard = props => {
  const {moviesList} = props

  return (
    <ul className="slider_list">
      <Slider {...settings}>
        {moviesList.map(a => (
          <Link to={`/movies/${a.id}`} key={a.id}>
            <li key={a.id}>
              <img className="slider_image" src={`https://image.tmdb.org/t/p/w500${a.backdrop_path}`} alt={a.title} />
            </li>
          </Link>
        ))}
      </Slider>
    </ul>
  )
}

export default ItemCard

