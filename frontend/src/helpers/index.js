export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        const {token, username, userId} = data;
        localStorage.setItem("jwt", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify({username, userId}));
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const getAuthenticatedUser = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    } else {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("jwt");
}

export const setProjectNameLocalstorage = (pname) => {
    localStorage.setItem("projectName", JSON.stringify(pname));
}

export const getProjectNameLocalStorage = () => {
    if (localStorage.getItem("projectName")) {
        return JSON.parse(localStorage.getItem("projectName"));
    } else {
        return false;
    }
}