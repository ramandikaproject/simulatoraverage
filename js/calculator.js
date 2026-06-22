/*
=========================================
KONSTANTA
=========================================
*/

const S0 = 100;
const BUY_FEE = 1.0015;


/*
=========================================
MAIN CALCULATION ENGINE
=========================================
*/

export function calculate(state) {

    const I1 =
        state.n1 * S0 * state.x1;

    const p1 =
    state.x1 === 0
        ? 0
        :
        (
            (state.x0 - state.x1)
            / state.x1
        );

    const PL1 =
        I1 * p1;

    const M1 =
        I1 + PL1;



    const I2 =
        state.n2 *
        S0 *
        state.x2 *
        BUY_FEE;



    const n_total =
        state.n1 +
        state.n2;



    const I_total =
        I1 +
        I2;



    const x_avg =
        n_total === 0
            ? 0
            :
            (
                (state.n1 * state.x1)
                +
                (state.n2 * state.x2)
            ) / n_total;



    const p_total =
        x_avg === 0
            ? 0
            :
            (
                (state.x0 - x_avg)
                / x_avg
            );



    const PL_total =
        I_total * p_total;



    return {

        I1,
        M1,
        p1,
        PL1,

        I2,

        n_total,
        I_total,
        x_avg,
        p_total,
        PL_total

    };

}