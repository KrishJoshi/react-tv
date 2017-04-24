import React, {Component} from 'react';
import {CardHeader, Card, CardMedia} from 'material-ui';
import {Link} from 'react-router-dom';
import './App.css';

const styles = {
  item: {},
  card: {
    'width': '40%',
    'padding': '10px',
    'margin': '10px',
    'float': 'left'
  }
};

class TvShowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    };
  }

  componentDidMount() {
    this.setState({logo: ''})

    if (this.props.show.fanart) {
      if (this.props.show.fanart.clearart) 
        this.setState({logo: this.props.show.fanart.clearart[0].url})
      if (this.props.show.fanart.hdtvlogo) 
        this.setState({logo: this.props.show.fanart.hdtvlogo[0].url})
      if (this.props.show.fanart.tvthumb) 
        this.setState({logo: this.props.show.fanart.tvthumb[0].url})
      if (this.props.show.fanart.clearlogo) 
        this.setState({logo: this.props.show.fanart.clearlogo[0].url})

    } else {
      this.setState({logo: 'https://pbs.twimg.com/profile_images/549808982244601856/_g2w72Ea.png'})
    }
  }

  render() {
    const linkTo = '/torrent/' + this.props.show.ids.trakt;

    return (
      <Link to={linkTo}>
        <Card style={styles.card}>
          <CardHeader
            key={Math.random()}
            title={this.props.show.title}
            subtitle={< span > <b>{this.props.show.year}</b> </span>}/>

          <CardMedia style={styles.item}>
            <img alt={this.props.show.title} src={this.state.logo}/>
          </CardMedia>

        </Card>
      </Link>
    );
  }
}

export default TvShowCard;
