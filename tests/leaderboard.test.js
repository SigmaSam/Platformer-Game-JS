import loader from '../src/loaders/loader';

describe("saves an input's value to localStorage", () => {
  const input = document.createElement('input');

  it("saves the given input's value attribute as the value for the localStorage 'username' key", () => {
    input.value = 'Test123';
    loader.submitNameForm(input);
    expect(localStorage.getItem('username') === 'Test123').toBe(true);
  });

  it("saves the string 'No name' as the value for the localStorage 'username' key if input.value is empty", () => {
    input.value = '';
    loader.submitNameForm(input);
    expect(localStorage.getItem('username') === 'No name').toBe(true);
  });
});

describe('fetches leaderboard data from the leaderboard API', () => {
  it("returns a JSON object with a key of 'result'", () => loader.fetchScores().then((jsonObject) => {
    expect(
      Object.prototype.hasOwnProperty.call(jsonObject, 'result'),
    ).toBeTruthy();
  }));

  it('does not return a JSON object when given an empty string.', () => loader.fetchScores().then((jsonObject) => {
    expect(
      Object.prototype.hasOwnProperty.call(jsonObject, ' '),
    ).not.toBeTruthy();
  }));

  it("returns a JSON object with an array object as the value of 'result'", () => loader.fetchScores().then((jsonObject) => {
    expect(Array.isArray(jsonObject.result)).toBeTruthy();
  }));

  it("When not input given it doest not return a JSON object with an array object as the value of 'result'", () => loader.fetchScores().then((jsonObject) => {
    expect(Array.isArray(jsonObject)).not.toBeTruthy();
  }));

  it("has objects stored within the 'result' array, each with a name and score", () => loader.fetchScores().then((jsonObject) => {
    if (jsonObject.result.length === 0) return true;

    return jsonObject.result.forEach((element) => {
      expect(
        Object.prototype.hasOwnProperty.call(element, 'user'),
      ).toBeTruthy();
      expect(
        Object.prototype.hasOwnProperty.call(element, 'score'),
      ).toBeTruthy();
    });
  }));
});

it("has doest not have objects stored within the 'result' array, each with names other than score and user", () => loader.fetchScores().then((jsonObject) => {
  if (jsonObject.result.length === 0) return true;

  return jsonObject.result.forEach((element) => {
    expect(
      Object.prototype.hasOwnProperty.call(element, 'superUser'),
    ).not.toBeTruthy();
    expect(
      Object.prototype.hasOwnProperty.call(element, 'maxScore'),
    ).not.toBeTruthy();
  });
}));