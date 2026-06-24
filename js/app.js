/*
=========================================
IMPORT
=========================================
*/

import { state } from "./state.js";
import { calculate } from "./calculator.js";
import { render } from "./ui.js";
import { saveState, loadState } from "./storage.js";


/*
=========================================
HELPER
=========================================
*/

function sanitizeInteger(value) {

    // hanya angka
    value = value.replace(/\D/g, "");

    return value;
}

/*
=========================================
PARSE FLEXIBLE DECIMAL
=========================================
*/

function parseDecimal(value) {

    if (!value) return 0;

    // User boleh ketik:
    // 1000.5
    // 1000,5

    return Number(
        value.replace(",", ".")
    ) || 0;

}

/*
=========================================
SANITIZE DECIMAL INPUT
=========================================
*/

function sanitizeDecimal(value) {

    // Ubah koma menjadi titik
    value = value.replace(/,/g, ".");

    // Ambil hanya angka dan titik
    value = value.replace(/[^0-9.]/g, "");

    // Pecah berdasarkan titik
    const parts = value.split(".");

    // Jika tidak ada titik
    if (parts.length <= 1) {

        return value;

    }

    // Gabungkan kembali:
    // hanya titik pertama yang dipertahankan
    return (
        parts[0]
        + "."
        + parts.slice(1).join("")
    );

}

/*
=========================================
AUTO SELECT ALL INPUT
=========================================
*/

function selectAllText(input) {

    // Delay kecil supaya mobile browser tidak override selection
    setTimeout(() => {

        input.select();

    }, 0);
}


/*
=========================================
LOAD STATE
=========================================
*/

function loadInitialState() {

    const saved = loadState();

    if (!saved) return;

    Object.assign(state, saved);

    // =========================
    // SET UI VALUES (FIX)
    // =========================

    document.getElementById("ticker").value =
        state.ticker || "";

    document.getElementById("x0").value =
        state.x0 || "";

    document.getElementById("n1").value =
        state.n1 || 0;

    document.getElementById("x1").value =
        state.x1 || "";

    document.getElementById("n2").value =
        state.n2 || 0;

    document.getElementById("x2").value =
        state.x2 || "";
}


/*
=========================================
INPUT -> STATE
=========================================
*/

function updateState() {

    state.ticker =
    document.getElementById("ticker").value;

    state.x0 =
        parseDecimal(
            document.getElementById("x0").value
        );

    state.n1 =
        parseInt(
            document.getElementById("n1").value
        ) || 0;

    state.x1 =
        parseDecimal(
            document.getElementById("x1").value
        );

    state.n2 =
        parseInt(
            document.getElementById("n2").value
        ) || 0;

    state.x2 =
        parseDecimal(
            document.getElementById("x2").value
        );
}


/*
=========================================
MAIN REFRESH
=========================================
*/

function refresh() {

    updateState();

    const result =
        calculate(state);

    render(result);

    saveState(state);
}


/*
=========================================
LOT BUTTONS
=========================================
*/

function registerLotButtons() {

    const n1 =
        document.getElementById("n1");

    const n2 =
        document.getElementById("n2");



    document
        .getElementById("n1-plus")
        .addEventListener("click", () => {

            n1.value =
                (parseInt(n1.value) || 0) + 1;

            refresh();
        });



    document
        .getElementById("n1-minus")
        .addEventListener("click", () => {

            n1.value =
                Math.max(
                    0,
                    (parseInt(n1.value) || 0) - 1
                );

            refresh();
        });



    document
        .getElementById("n2-plus")
        .addEventListener("click", () => {

            n2.value =
                (parseInt(n2.value) || 0) + 1;

            refresh();
        });



    document
        .getElementById("n2-minus")
        .addEventListener("click", () => {

            n2.value =
                Math.max(
                    0,
                    (parseInt(n2.value) || 0) - 1
                );

            refresh();
        });

}


/*
=========================================
VALIDATE LOT
=========================================
*/

function registerLotValidation() {

    ["n1", "n2"].forEach(id => {

        const input =
            document.getElementById(id);

        input.addEventListener(
            "input",
            () => {

                input.value =
                    sanitizeInteger(
                        input.value
                    );

                refresh();
            }
        );

    });

}



/*
=========================================
NORMAL INPUTS
=========================================
*/

function registerInputs() {

    const numericInputs = [
        "n1",
        "n2",
        "x0",
        "x1",
        "x2"
    ];

    const textInputs = [
        "ticker"
    ];

    // =========================
    // NUMERIC INPUT BEHAVIOR
    // =========================

    numericInputs.forEach(id => {

        const el =
            document.getElementById(id);

        el.addEventListener("input", refresh);

        // SELECT ALL ON FOCUS
        el.addEventListener("focus", () => {

            setTimeout(() => {
                el.select();
            }, 0);

        });

    });


    // =========================
    // TEXT INPUT BEHAVIOR
    // =========================

    textInputs.forEach(id => {

        const el =
            document.getElementById(id);

        el.addEventListener("input", (e) => {

            e.target.value = e.target.value.toUpperCase();

            refresh();

        });

        el.addEventListener("focus", () => {

            setTimeout(() => {
                el.select();
            }, 0);

        });

    });

    /*
    =========================================
    PRICE INPUT VALIDATION
    =========================================
    */

    ["x0", "x1", "x2"].forEach(id => {

        const el =
            document.getElementById(id);

        el.addEventListener("input", () => {

            el.value =
                sanitizeDecimal(
                    el.value
                );

            refresh();

        });

    });

}

/*
=========================================
RESET ALL DATA
=========================================
*/

function resetAll() {

    // 1. RESET STATE
    state.ticker = "";

    state.x0 = 0;

    state.n1 = 0;
    state.x1 = 0;

    state.n2 = 0;
    state.x2 = 0;


    // 2. RESET INPUT UI
    document.getElementById("ticker").value = "";

    document.getElementById("x0").value = "";

    document.getElementById("n1").value = 0;

    document.getElementById("x1").value = "";

    document.getElementById("n2").value = 0;

    document.getElementById("x2").value = "";


    // 3. CLEAR STORAGE
    localStorage.removeItem("averageSimulator");


    // 4. REFRESH UI
    refresh();
}


/*
=========================================
BOOT
=========================================
*/

loadInitialState();

registerInputs();

registerLotButtons();

registerLotValidation();

refresh();

document
    .getElementById("reset-btn")
    .addEventListener(
        "click",
        resetAll
    );
