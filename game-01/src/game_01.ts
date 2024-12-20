function findPairWithSum(M: number[], N: number): number[] {
    if (M.length === 0 || M.length < 2) {
        return [];
    }

    const seen: Set<number> = new Set();

    for (let number of M) {
        let complement = N - number;
        if (seen.has(complement)) {
            return [number, complement];
        }
        seen.add(number);
    }

    return [];
}

