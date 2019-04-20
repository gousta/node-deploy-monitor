
import Typography from '@material-ui/core/Typography';
import React from 'react';
import DS from '../services/datasource';
import SOCKET from '../services/socket';
import Container from './Container';

class ImageDataSource extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containers: [],
    };
  }

  componentDidMount() {
    this.fetch();

    SOCKET.on('message-to-client', (data) => {
      console.log('', data);
    });

    setInterval(() => this.fetch(), 10000);
  }

  fetch() {
    const { image } = this.props;

    DS.image(image).then((data) => {
      this.setState({ containers: data });
    });
  }

  render() {
    const { containers } = this.state;

    if (containers.length === 0) return <Empty />;

    return containers.map((c) => <Container key={c['container id']} data={c} />);
  }
}

const Empty = () => (
  <Typography>No containers found for this image</Typography>
);


export default ImageDataSource;
