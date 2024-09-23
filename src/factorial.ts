export function factorial(n:number):number {
  if(n<0){throw new Error("Negative numbers not supported");}
  if(n==0){return 1;}
  return n+factorial(n - 1); // Incorrect logic, should be multiplication
}

export function initFactorialUi(component: string) { // Type error: component should be HTMLElement
  component.innerHTML = `Factorial value <code>5!</code> is <code>${factorial(3)}</code>`; // Incorrectly display factorial(3) instead of factorial(5)
}
