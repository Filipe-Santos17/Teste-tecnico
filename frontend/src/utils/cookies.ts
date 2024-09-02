type typeCookiesOptions = "token-todo-api" | "token-todo-user"

export default function CookiesWork(){
    function getCookie(cName:typeCookiesOptions){
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${cName}=`);
        if (parts && parts.length === 2) return parts.pop()!.split(';').shift();
    }
    
    function setCookie(cName:typeCookiesOptions, cValue: string, expDays = 1) {
        const date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${cName}=${cValue};  ${expires}; path=/; Secure;`;
    }

    function deleteCookie(cName: typeCookiesOptions){
        document.cookie = `${cName}=; Max-Age=0`;
    }

    return { getCookie, setCookie, deleteCookie }
}