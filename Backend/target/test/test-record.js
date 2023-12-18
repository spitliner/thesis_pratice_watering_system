import typia from 'typia';
const a = {};
a.padding = 'b';
console.log(JSON.stringify(a));
if ((input => {
    const $io0 = input => "string" === typeof input.a;
    return Array.isArray(input) && input.every(elem => "object" === typeof elem && null !== elem && $io0(elem));
})(a)) {
    console.log(a);
}
