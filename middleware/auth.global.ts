import { doc, getDoc } from "firebase/firestore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const router = useRouter();
    const { $firestore } = useNuxtApp();
    const userUidCookie = useCookie('userUidCookie');
    const userRole = ref<string | null>();

    async function getUserRole(userUid) {
        if (!userUid) {
            return router.push('/userComponent');
        }
        const docRef = doc($firestore, "users", userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            userRole.value = docSnap.data().role;
        } else {
            userRole.value = null;
            return navigateTo('/userComponent');
        }
    }

    async function myMiddleware() {
        const userUid = userUidCookie.value;

        if (to.path == '/savedActivitiesPage' || to.path == '/logOutPage') {
            await getUserRole(userUid);
            if (userRole.value == null) {
                return navigateTo('/userComponent');
            }
        }

        if (to.path.startsWith('/admin')) {
            await getUserRole(userUid);
            if (userRole.value != 'artist') {
                return navigateTo('/userComponent');
            }
        }
    }

    await myMiddleware();
});




