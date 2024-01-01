import { proxy } from 'valtio';

export const store = proxy({
    username: "oaish",
    results: {
        marks: 0,
        hour: 0,
        type: "",
        timeTaken: 0,
        total: 0,
        attempted: 0,
        correct: 0,
        percentage: 0,
        image: "",
        history: []
    },
});
