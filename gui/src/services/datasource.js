
const infoBox = alert;

const errorCatcher = () => {
  infoBox('Error connecting to the server');
};

const URL = 'http://localhost:5555';

exports.images = () => {
  return fetch(`${URL}/images`)
    .then((res) => res.json())
    .then((res) => (res && res.data ? res.data : []))
    .catch(errorCatcher);
};

exports.image = (image) => {
  return fetch(`${URL}/images/${image}`)
    .then((res) => res.json())
    .then((res) => (res && res.data ? res.data : []))
    .catch(errorCatcher);
};
