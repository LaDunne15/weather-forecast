import "./Loading.css";
const loadingGif = require("../../static/loading.gif");
function Loading() {
    return (
        <div className="loading">
            <img className="loading-gif" src={loadingGif} alt="Loading" />
            <span className="loading-message">Обробка запиту...</span>
        </div>
    )
}

export default Loading;