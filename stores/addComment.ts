import { defineStore } from 'pinia';

export const useAddCommentStore = defineStore('addComment', () => {
    const logInDuringAddingComment = ref<boolean>();
    const showFirebaseAuthComponent = ref<boolean>(false);
    const showAddCommentComponent = ref<boolean>(false);

    return { logInDuringAddingComment, showFirebaseAuthComponent, showAddCommentComponent };
});
