import { Typography } from '@material-ui/core';
import React from 'react';
import DS from '../services/datasource';
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
  }

  fetch() {
    const { image } = this.props;

    DS.image(image).then((data) => {
      console.log('data', data);
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
