import { range, reversed } from "./array";
export function* enumerate(seq) {
    let i = 0;
    for (const item of seq) {
        yield [item, i++];
    }
}
export function* join(seq, separator) {
    let first = true;
    for (const entry of seq) {
        if (first)
            first = false;
        else if (separator != null)
            yield separator();
        yield* entry;
    }
}
// https://docs.python.org/3.8/library/itertools.html#itertools.combinations
export function* combinations(seq, r) {
    const n = seq.length;
    if (r > n)
        return;
    const indices = range(r);
    yield indices.map((i) => seq[i]);
    while (true) {
        let k;
        for (const i of reversed(range(r))) {
            if (indices[i] != i + n - r) {
                k = i;
                break;
            }
        }
        if (k == null)
            return;
        indices[k] += 1;
        for (const j of range(k + 1, r)) {
            indices[j] = indices[j - 1] + 1;
        }
        yield indices.map((i) => seq[i]);
    }
}
export function* subsets(seq) {
    for (const k of range(seq.length + 1)) {
        yield* combinations(seq, k);
    }
}
//# sourceMappingURL=iterator.js.map