export const resetUserSession = () => {
    sessionStorage.removeItem('isUserAuthenticated');
    sessionStorage.removeItem('loggedInUserRole');
    sessionStorage.removeItem('loggedInUserId');
}
