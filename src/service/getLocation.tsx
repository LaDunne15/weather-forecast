

const getLocation = () :any => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            return position.coords.latitude;
          },
          (error) => {
            console.error('Помилка взяття локації користувача:', error);
          }
        );
    } else {
        console.error('Геолокація не підтримуться цим браузером.');
    }
}

export default getLocation;