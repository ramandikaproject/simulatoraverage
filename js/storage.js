/*
=========================================
SAVE
=========================================
*/

export function saveState(state) {

    localStorage.setItem(
        "averageSimulator",
        JSON.stringify(state)
    );

}


/*
=========================================
LOAD
=========================================
*/

export function loadState() {

    const saved =
        localStorage.getItem(
            "averageSimulator"
        );

    return saved
        ? JSON.parse(saved)
        : null;

}
