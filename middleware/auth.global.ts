export default defineNuxtRouteMiddleware((to, from) => {
    const userRoleCookie = useCookie('userRoleCookie');
    const userRole = userRoleCookie.value;

    // якщо незалогований користувач переходить до 'savedActivitiesPage' || 'logOutPage'
    if(to.path == '/savedActivitiesPage' && !userRole || to.path == '/logOutPage' && !userRole) {
        return navigateTo('/userComponent');
    }

    // якщо не artist переходить до 'admin/addActivity' || admin/myActivities'
    if(to.path == '/admin/addActivity' && userRole !== 'artist' || to.path == '/admin/myActivities' && userRole !== 'artist'){
        return navigateTo('/userComponent');
    }
});
