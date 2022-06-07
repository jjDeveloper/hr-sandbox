const constructContainer = (props: {
  elm: string;
  text: string;
  class?: string;
  id?: string;
}): HTMLElement => {
  const container = document.createElement('div');
  if (props.class) container.classList.add(props.class);
  if (props.id) container.id = props.id;
  const titleElm = document.createElement(props.elm);
  titleElm.innerHTML = props.text;
  container.appendChild(titleElm);
  return container;
};

const joinData = (data: any, element: HTMLElement) => {
  const dataElm = document.createElement('code');
  dataElm.innerHTML = typeof data === 'string' ? data : JSON.stringify(data);
  element.appendChild(dataElm);
};

export class JJTestRunner extends HTMLElement {
  testData = [];
  title = 'none';

  constructor(props: { testData: any[]; title: string }) {
    super();
    this.classList.add('test-runner');
    this.testData = props.testData;
    this.title = props.title;
    this._mountContainer();
    this._printTestData();
  }
  connectedCallback(): void {}

  _mountContainer(): void {
    const container = constructContainer({
      elm: 'h3',
      text: this.title,
      class: 'test-container',
    });
    this.appendChild(container);
  }

  _printTestData(): void {
    const container = constructContainer({
      elm: 'h3',
      text: 'Test Data',
      class: 'test-data',
    });
    joinData(this.testData, container);
    this.appendChild(container);
  }

  mountTest(props: { title: string; callback: Function }): void {
    this.testData.forEach((data, i) => {
      const resultData = props.callback(data);
      const container = constructContainer({
        elm: 'h3',
        text: props.title + ` #${i + 1}`,
        class: 'test-result',
      });
      joinData(resultData, container);
      this.appendChild(container);
    });
  }
}

export class LonelyInt extends JJTestRunner {
  constructor() {
    const testData: number[][] = [
      [1, 2, 3, 4, 3, 2, 1],
      [2, 5, 2, 6, 5, 4, 1, 4, 1],
    ];
    super({ title: 'Lonely Int', testData: testData });
    this.mountTest({ title: 'lonely test', callback: this._runLonely });
  }

  _runLonely(a: number[]): any {
    return a
      .map((item) => (a.indexOf(item) === a.lastIndexOf(item) ? item : null))
      .filter((a) => a)[0];
  }
}

export class DiagDifference extends JJTestRunner {
  constructor() {
    const testData = [
      [
        [1, 2, 3],
        [4, 5, 6],
        [9, 8, 9],
      ],
      [
        [11, 2, 4],
        [4, 5, 6],
        [10, 8, -12],
      ],
    ];
    super({ title: 'Diagnol Difference', testData: testData });
    this.mountTest({
      title: 'diagnol difference test',
      callback: this._runDiagDifference,
    });
  }

  _runDiagDifference(arr: [][]): number {
    const calcPrimary = () => {
      let sum = 0;
      for (let i = 0; i < arr[0].length; i++) {
        sum = sum + arr[i][i];
      }
      return sum;
    };
    const calcSecondary = () => {
      let sum = 0;
      let tick = 0;
      let ct = arr[0].length - 1;
      for (let i = ct; i >= 0; i--) {
        sum = sum + arr[tick][i];
        tick++;
      }
      return sum;
    };
    const prim = calcPrimary();
    const sec = calcSecondary();
    const result = Math.abs(prim - sec);
    return result;
  }
}

export class CountingSort extends JJTestRunner {
  constructor() {
    const testData = [
      [
        63, 25, 73, 1, 98, 73, 56, 84, 86, 57, 16, 83, 8, 25, 81, 56, 9, 53, 98,
        67, 99, 12, 83, 89, 80, 91, 39, 86, 76, 85, 74, 39, 25, 90, 59, 10, 94,
        32, 44, 3, 89, 30, 27, 79, 46, 96, 27, 32, 18, 21, 92, 69, 81, 40, 40,
        34, 68, 78, 24, 87, 42, 69, 23, 41, 78, 22, 6, 90, 99, 89, 50, 30, 20,
        1, 43, 3, 70, 95, 33, 46, 44, 9, 69, 48, 33, 60, 65, 16, 82, 67, 61, 32,
        21, 79, 75, 75, 13, 87, 70, 33,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 99,
      ],
    ];
    super({ title: 'Counting Sort 1', testData: testData });
    this.mountTest({ title: 'Sort test', callback: this._countingSort });
  }
  _countingSort(arr: number[]): number[] {
    const result = new Array(100).fill(0);
    arr.forEach((item) => result[item]++);
    return result;
  }
}

export class TowerBreaker extends JJTestRunner {
  constructor() {
    const testData = [
      [2, 2],
      [1, 4],
      [1, 7],
      [3, 7],
    ];
    super({ title: 'Tower Breakers', testData: testData });
    this.mountTest({ title: 'Breaker round', callback: this._towerBreakers });
  }
  _towerBreakers(props: number[]): number {
    console.log('###');
    let player = 1;
    let over = false;
    const togglePlayer = () => (player = player === 1 ? 2 : 1);
    let towers = new Array(props[0]).fill(props[1]);
    const takeTurn = () => {
      while (!over) {
        for (let i = 0; i < towers.length; i++) {
          if (towers[i] !== 1) {
            towers[i] = 1;
            togglePlayer();
            i = towers.length;
          }
          if (i === towers.length - 1 && towers[i] === 1) {
            over = true;
          }
        }
      }
    };
    console.log('TOWERS: ', towers);
    console.log('###');
    togglePlayer();
    takeTurn();
    return player;
  }
}
