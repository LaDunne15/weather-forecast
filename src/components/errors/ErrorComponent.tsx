import { useEffect, useState } from "react";
import "./errorComponent.css";

function ErrorComponent(errorData: any) {

    const [error,setError] = useState({
        code:0,
        message:""
    });
    const [messageLocated,setMessageLocated] = useState("");

    useEffect(()=>{
        setError(errorData.error.error);
    },[errorData]);

    useEffect(()=>{
        switch (error.code) {
            case 1002:
                setMessageLocated("Ключ API не надано");
                break;
            case 1003:
                setMessageLocated("Місцезнаходження не надано");
                break;
            case 1005:
                setMessageLocated("URL запиту до API недійсний");
                break;
            case 1006:
                setMessageLocated("Місцезнаходження не знайдено");
                break;
            case 2006:
                setMessageLocated("Наданий недійсний ключ API");
                break;
            case 2007:
                setMessageLocated("Ключ API перевищив кількість викликів за місяць");
                break;
            case 2008:
                setMessageLocated("Ключ API відключено");
                break;
            case 2009:
                setMessageLocated("Ключ API не має доступу до ресурсу. Будь ласка, перевірте сторінку тарифів для дозволених дій у вашому плані підписки на API");
                break;
            case 9000:
                setMessageLocated("Недійсне тіло запиту JSON у масовому запиті. Переконайтеся, що воно має правильний JSON-формат і кодування utf-8");
                break;
            case 9001:
                setMessageLocated("Тіло запиту JSON містить забагато місць для масового запиту. Будь ласка, зберігайте кількість менше 50 за один запит");
                break;
            case 9999:
                setMessageLocated("Внутрішня помилка програми");
                break;
            default:
                break;
        }
    },[error]);

    return (
        <div className="error">
            <span className="error-label">Помилка</span>
            <div>
                <h1 className="error-code">{error.code}</h1>
                <h3 className="error-message">{messageLocated}</h3>
            </div>
        </div>
    )
}

export default ErrorComponent