import typia from 'typia';

const a: Record<string, unknown> = {};

a.padding = 'b';

console.log(JSON.stringify(a));

if (typia.is<Array<{a: string}>>(a)) {
    console.log(a);
}
