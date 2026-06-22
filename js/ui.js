/*
=========================================
FORMAT HELPER
=========================================
*/

export function formatCurrency(value) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(value);

}


export function formatPercent(value) {

    return (value * 100).toFixed(2) + "%";

}

function applyProfitColor(
    element,
    value
) {

    element.classList.remove(
        "profit",
        "loss"
    );

    if (value > 0) {

        element.classList.add(
            "profit"
        );

    } else if (value < 0) {

        element.classList.add(
            "loss"
        );

    }

}


/*
=========================================
RENDER RESULT
=========================================
*/

export function render(result) {

    document.getElementById("I1").textContent =
        formatCurrency(result.I1);

    document.getElementById("M1").textContent =
        formatCurrency(result.M1);

    document.getElementById("p1").textContent =
        formatPercent(result.p1);

    document.getElementById("PL1").textContent =
        formatCurrency(result.PL1);



    document.getElementById("I2").textContent =
        formatCurrency(result.I2);



    document.getElementById("n_total").textContent =
        result.n_total;

    document.getElementById("x_avg").textContent =
        result.x_avg.toFixed(2);

    document.getElementById("I_total").textContent =
        formatCurrency(result.I_total);

    document.getElementById("p_total").textContent =
        formatPercent(result.p_total);

    document.getElementById("PL_total").textContent =
        formatCurrency(result.PL_total);

    const p1El =
        document.getElementById("p1");

    p1El.textContent =
        formatPercent(result.p1);

    applyProfitColor(
        p1El,
        result.p1
    );

    const pl1El =
        document.getElementById("PL1");

    pl1El.textContent =
        formatCurrency(result.PL1);

    applyProfitColor(
        pl1El,
        result.PL1
    );

    const pTotalEl =
        document.getElementById("p_total");

    pTotalEl.textContent =
        formatPercent(
            result.p_total
        );

    applyProfitColor(
        pTotalEl,
        result.p_total
    );

    const plTotalEl =
        document.getElementById(
            "PL_total"
        );

    plTotalEl.textContent =
        formatCurrency(
            result.PL_total
        );

    applyProfitColor(
        plTotalEl,
        result.PL_total
    );
}