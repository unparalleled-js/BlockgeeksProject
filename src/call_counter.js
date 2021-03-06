import { contract } from "./counter.js";
import $ from "jquery";

export function isRinkeby() {
    return contract !== null;
}

export async function loadCurrentCount(valComp) {
    if (contract) {
        const methods = contract.methods;
        if (methods) {
            const result = await methods.getCounter().call();
            if (valComp) {
                valComp.innerHTML = `current value: ${result}`;
            } else {
                console.log("Error with init contract");
            }
        }
    }
}

export function addCounter(i) {
    let comp = $('#valcomp');
    if (comp) {
        let v = parseInt(comp.html(), 10);
        comp.empty();
        comp.html(`current value: ${v + i}`);
    } else {
        console.log("error with comp");
        console.log(comp);
    }
}

export async function incrementCounter() {
    if (contract) {
        const methods = contract.methods;
        const acct = web3.eth.defaultAccount;
        try {
            const tx = await methods.increment().send({from: acct});
            console.log(tx);
            addCounter(1);
        } catch (err) {
            console.log(err);
        }
    }
}

export async function decrementCounter() {
    if (contract) {
        const methods = contract.methods;
        const acct = web3.eth.defaultAccount;
        try {
            const tx = await methods.decrement().send({from: acct});
            console.log(tx);
            addCounter(1);
        } catch (err) {
            console.log(err);
        }
    }
}

export async function reset() {
    if (contract) {
        const methods = contract.methods;
        const acct = web3.eth.defaultAccount;
        try {
            const tx = await methods.reset().send({from: acct});
            console.log(tx);
            const comp = $('#valcomp');
            if (comp) {
                comp.empty();
                comp.html(0);
            } else {
                console.log("error with comp");
                console.log(comp);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
