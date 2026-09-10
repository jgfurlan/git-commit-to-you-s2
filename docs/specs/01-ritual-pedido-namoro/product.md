# Product Spec: 01 - O Ritual do Pedido de Namoro (The Mystic Falls Covenant)

**Issue / Task:** FEAT-01-PROPOSAL-ONBOARDING
**Design / Referência:** [pesquisa_tvd_reliquias_e_efeitos.md](file:///Users/jgfurlan/.gemini/antigravity-cli/brain/83550d14-7199-4a26-94eb-5195d8db0876/pesquisa_tvd_reliquias_e_efeitos.md)

---

## 1. Resumo da Experiência
O Ritual do Pedido de Namoro é a experiência inaugural e cinematográfica da namorada ao abrir o aplicativo pela primeira vez em seu celular. Inspirado nas relíquias e na mitologia passional de **The Vampire Diaries** e no gótico literário de **Edgar Allan Poe**, o fluxo conduz a namorada por uma jornada interativa em 5 atos:
1. **A Névoa de Mystic Falls & A Pena do Corvo**: A penumbra inicial da tela se dissipa com a passagem do corvo de Damon, cuja pena dourada acende a primeira vela e desperta A Guardiã.
2. **O Relicário de Verbena (Elena's Vervain Locket)**: Um medalhão de prata vitoriana e rubi surge no centro da tela; ela toca na fivela e ele se abre com clique metálico, revelando a primeira foto do casal e a promessa de amor genuíno e imune a qualquer compulsão.
3. **O Ascendente dos Gêmeos (The Gemini Mechanism)**: Engrenagens astronômicas de latão giram alinhando a data em que se conheceram com a data de hoje, congelando o tempo para a eternidade.
4. **O Diário dos Salvatore (A Carta do Namorado)**: Ao som suave de violoncelos inspirados na valsa de *Miss Mystic Falls*, a declaração pessoal se desdobra em pergaminho antigo com assinatura dourada.
5. **A Pergunta Solene & O Selo da Luz do Dia (Daylight Seal)**: A pergunta de namoro surge acompanhada de um Selo de Cera Carmesim engastado com pedra de Lápis-Lazúli. Ela pressiona e segura o selo por 3 segundos com vibração háptica contínua no celular, consagrando o namoro e desbloqueando o Grimório Eterno.

---

## 2. Invariantes & Regras de Negócio (PT-BR)

1. **Idioma Estrito:** Todo o texto, interface, falas da Guardiã e microcópias devem ser 100% em **Português do Brasil (PT-BR)** elegante e poético.
2. **Invariante de Estado Único (One-Time Lifecycle):**
   - Se `pact_sealed == false`: Acesso redireciona compulsoriamente para a rota `/ritual`.
   - Se `pact_sealed == true`: Acesso redireciona diretamente para o Santuário Principal (`/`), preservando o histórico do pacto e a data do selamento.
3. **Interação Tátil Háptica:**
   - O selo exige 3 segundos ininterruptos de *press-and-hold*.
   - Acionamento de vibração crescente via `navigator.vibrate` simulando batimento cardíaco acelerando.
   - Soltar o dedo antes dos 3 segundos reseta o progresso suavemente sem erro.
4. **Interação do Relicário:**
   - O medalhão abre com rotação 3D (`rotateY`) e efeito sonoro de clique mecânico suave.

---

## 3. Critérios de Sucesso (Verificáveis)
- Fluidez total em telas mobile (iOS Safari e Android Chrome) sem travamentos.
- Efeito sonoro e feedback háptico respeitam as permissões do navegador móvel.
- Gravação persistente do timestamp exato do aceite do namoro.
- Ao término do Ato 5, transição cinematográfica para a Home do Grimório com o contador de "Dias Juntos" iniciado no dia 1.
