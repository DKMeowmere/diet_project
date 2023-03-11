export default function useReduce() {
  function calculateSum(arr: number[]) {
    const sum = arr.reduce(
      (accumulator, currentValue) => (accumulator += currentValue),
      0
    )
    return sum.toFixed(2)
  }

  return { calculateSum }
}
