const Utils = require("./Utils");

describe("Utils:userHasPermission", () => {

  test('deve retornar verdadeiro se o usuario tiver role admin', () => {
    expect(Utils.userHasPermission({ role: "admin" })).toBe(true);
  });

  test('deve retornar falso se o usuario tiver role user', () => {
    expect(Utils.userHasPermission({ role: "user" })).toBe(true);
  });
});