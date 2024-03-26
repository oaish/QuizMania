export function generateUniqueNumbers(min, max, count) {
    // if (count > (max - min + 1) || max < min) {
    //     throw new Error("Invalid input parameters");
    // }

    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (uniqueNumbers.has(randomNumber)) {
            continue;
        }
        uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
}

export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function splitPath(path) {
    const segments = path.split('/').filter(segment => segment !== '');
    let currentPath = '/';

    const paths = segments.map(segment => {
        currentPath += `${segment}/`;
        const seg = getSegmentName(segment)

        return {
            path: currentPath,
            name: seg,
        };
    });

    return [
        {
            path: "/",
            name: "Home",
        },
        ...paths
    ];
}

function getSegmentName(seg) {
    switch (seg) {
        case 'eti':
            return 'ETI - MCQs';
        case 'man':
            return 'MAN - MCQs';
        case 'results':
            return 'Results';
        case 'quick_test':
            return 'Quick MCQ Test';
        case 'unit_test':
            return 'Unit Test';
        case 'ese':
            return 'End Semester Exam';
        case 'all':
            return 'All MCQs';
        case 'history':
            return 'Results History';
        case '1':
            return 'I';
        case '2':
            return 'II';
        default:
            return seg;
    }
}