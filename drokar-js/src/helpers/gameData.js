// Python 
// SKILL_XPDIFF_PER_LEVEL = [int(100 * 1.104**x) for x in range(0, 99)]
const xpDiffs = [...Array(100).keys()].map(i => Math.round(5 * 1.104**i))
const cumulativeSum = (sum => value => sum += value)(0)
export const xpToLevel = [0, ...xpDiffs.map(cumulativeSum)]