import { Typography } from '@material-ui/core';
import React from 'react';
import DS from '../services/datasource';
import Image from './Image';

class ImagesDataSource extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { images } = this.state;
    DS.images().then((data) => {
      if (data !== images) {
        this.setState({ images: data });
      }
    });
  }

  render() {
    const { images } = this.state;

    return (images && images.length > 0) ? <Images images={images} /> : <Empty />;
  }
}

const Empty = () => (
  <Typography>No images found</Typography>
);

const Images = ({ images }) => (
  <div>
    {images.map((image) => (
      <div key={image}>
        <Typography variant="headline" color="primary" style={{ marginLeft: 24, marginBottom: 16 }}>Img: <strong>{image}</strong></Typography>
        <Image image={image} />
      </div>
    ))}
  </div>
);

export default ImagesDataSource;
