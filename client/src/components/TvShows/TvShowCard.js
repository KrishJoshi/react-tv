import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, Rate} from 'antd';

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

  truncateOnWord(str, limit) {
    const trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
    const reg = new RegExp('(?=[' + trimmable + '])');
    const words = str.split(reg);
    let count = 0;
    return words.filter(function(word) {
      count += word.length;
      return count <= limit;
    }).join('');
  }

  render() {
    const linkTo = '/show/' + this.props.show.ids.trakt;

    const overview = this.props.show.overview ? this.truncateOnWord(this.props.show.overview, 200) : '';

    return (
      <Link to={linkTo}>
        <Card bodyStyle={{padding: '10px', color: '#000'}} title={this.props.show.title}
              extra={<Rate defaultValue={this.props.show.rating ? this.props.show.rating / 2 : 5}/>}>
          <div className="custom-image">
            <img width="100%" alt={this.props.show.title} src={this.state.logo}/>
          </div>
          <div className="custom-card">
            <h3>{this.props.show.year}</h3>
            <p>{overview}</p>
          </div>
        </Card>
      </Link>
    );
  }
}

export default TvShowCard;
