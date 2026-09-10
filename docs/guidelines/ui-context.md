# UI Context: Vampire Diaries × Edgar Allan Poe

## Design System: Dark Romanticism & Immortal Memory

### 1. Paleta de Cores & Tokens

| Token | Código HEX | Nome Conceitual | Função na UI |
| :--- | :--- | :--- | :--- |
| `primary` | `#7A0C1E` / `#A1122B` | *Vampiric Crimson* | Selos de cera, botões primários de consagração, botões de pulso |
| `secondary` | `#C9A86A` / `#E5C384` | *Antique Manor Gold* | Molduras, filigranas, bordas de pergaminho, ícones dourados |
| `background` | `#08070A` | *Abyssal Obsidian* | Fundo principal da aplicação (profundidade com leve viés violeta) |
| `surface` | `#120F17` / `#191422` | *Crypt Velvet* | Cards, painéis sobrepostos com efeito glassmorphism fosco sombrio |
| `parchment` | `#E9E2D5` / `#FAF6EE` | *Vintage Parchment* | Cartas de memórias, diários, caligrafia, contraste nobre |
| `accent-mystic` | `#2B3B4E` / `#3D5470` | *Midnight Moonstone* | Toques do anel da luz do dia, halos espectrais da Guardiã |
| `text-muted` | `#9B94A6` | *Ashen Silver* | Metadados, datas, contadores secundários e descrições sutis |

### 2. Tipografia
- **Títulos & Citações Nobres (Display):** `Cinzel Decorative` ou `Playfair Display SC`
- **Crônicas & Memórias (Readable Book Serif):** `EB Garamond` ou `Cormorant Garamond`
- **Manuscritos & Assinaturas:** `Pinyon Script`
- **Labels, Ícones & Sistema:** `Cinzel` (all-caps com letter-spacing generoso)

### 3. Paradigmas de UX

#### A. O Selo de Cera 3D Interativo (Wax Seal Gesture)
- O usuário não clica em um botão comum: para desvelar uma memória selada ou selar o pedido de namoro, o usuário **pressiona e segura o dedo por 3 segundos**.
- Efeito sonoro suave de cera derretendo e quebrando, acompanhado de pulsações de vibração no celular (`navigator.vibrate([40, 60, 80, 120])`).

#### B. Iluminação por Vela & Névoa Viva
- Fundo responsivo com iluminação quente sutil simulando lareiras e castiçais de Mystic Falls em repouso.

#### C. Microinterações Sonoras Opcionais
- Sons orgânicos e delicados: estalar de lareira distante, arranhar suave de pena no pergaminho, som de cera quebrando.
