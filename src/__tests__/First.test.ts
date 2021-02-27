
// descrevendo nosso teste:
describe("First", () => {
    // 1º parametro: descrever da melhor forma possivel nosso teste
    it("deve ser possivel somar 2 numeros", () => {
        // o que esperamos(funcao, servico, etc)
        expect(2 + 2).toBe(4);
    })
})

// descrevendo nosso teste:
describe("First", () => {
    // 1º parametro: descrever da melhor forma possivel nosso teste
    it("deve ser possivel somar 2 numeros", () => {
        // o que esperamos(funcao, servico, etc)
        expect(2 + 2).not.toBe(5);
    })
})