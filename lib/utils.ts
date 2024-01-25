export function nextIndex(current: number, length: number) {
  if (current === length - 1) {
    return 0;
  } else {
    return current + 1;
  }
}

export function previousIndex(current: number, length: number) {
  if (current === 0) {
    return length - 1;
  } else {
    return current - 1;
  }
}
